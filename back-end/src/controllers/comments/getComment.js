import Comments from "../../model/comments.js";
import { getSchema } from '../../helpers/zodSchemas.js';
import formatZodError from '../../helpers/formatZodError.js';


const GetComment = async (req, res) => {
    const idValidation = getSchema.safeParse(req.params.id)
    if(!idValidation.success){
        return res.status(400).json({message: "Os dados recebidos no corpo da aplicação são invalidos", detalhes: formatZodError(idValidation.error)})
    }
    const id = idValidation.data;
    try{
        const comments = await Comments.findAll({where: {PostPostId: id}});

        res.status(200).json(comments)
    }catch(error){
        console.error(error);
        res.status(500).json({erro: "Erro ao criar o comentario!"})
    }
}

export default GetComment;