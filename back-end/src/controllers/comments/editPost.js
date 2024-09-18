import Comments from "../../model/comments.js";
import { commentSchema } from '../../helpers/zodSchemas.js';
import { getSchema } from '../../helpers/zodSchemas.js';
import getToken from "../../helpers/getToken.js"
import getUserByToken from "../../helpers/getUserByToken.js";
import Users from "../../model/users.js";
import formatZodError from '../../helpers/formatZodError.js';

const editComment = async (req, res) => {
    const bodyValidation = commentSchema.safeParse(req.body);

    if(!bodyValidation.success){
        return res.status(400).json({message: "Os dados recebidos no corpo da aplicação são invalidos", detalhes: formatZodError(bodyValidation.error)})
    }

    const {comment} = bodyValidation.data;

    const idValidation = getSchema.safeParse(req.params.id)
    if(!idValidation.success){
        return res.status(400).json({message: "Os dados recebidos no corpo da aplicação são invalidos", detalhes: formatZodError(idValidation.error)})
    }
    const id = idValidation.data
    try{
        const token = getToken(req);
        const user = await getUserByToken(token);
        const userId = user.dataValues.user_id;

        const commentario = await Comments.findByPk(id);
        const userD = await Users.findByPk(userId)
        
        if(commentario.UserUserId !== userId && userD.papel !== 'administrador'){
            return res.status(403).json("Não autorizado!")
        }

        await Comments.update({comment}, {where: {comment_id: id}})
        res.status(200).json({message: "Comentario atualizado!"})
    }catch(error){
        console.error(error);
        res.status(500).json({erro: "Erro ao criar o comentario!"})
    }
}

export default editComment;