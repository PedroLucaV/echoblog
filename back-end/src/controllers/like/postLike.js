import Likes from '../../model/likes.js'
import getToken from "../../helpers/getToken.js"
import { getSchema } from '../../helpers/zodSchemas.js';
import formatZodError from '../../helpers/formatZodError.js';

const postLike = async (req, res) => {
    const idValidation = getSchema.safeParse(req.params.id)
    if(!idValidation.success){
        return res.status(400).json({message: "Os dados recebidos no corpo da aplicação são invalidos", detalhes: formatZodError(idValidation.error)})
    }
    const id = idValidation.data
    try{
        const token = getToken(req);
        const user = await getUserByToken(token);
        const UserUserId = user.dataValues.user_id;
        const PostPostId = id;

        const [like, isNew] = await Likes.findOrCreate({
            where: {UserUserId,
            PostPostId}
        })

        if(!isNew){
            await Likes.destroy({where: {like_id: like.like_id}});
            return res.statu(200).json({message: "Curtida removida!"});
        }

        res.status(201).json({message: "Curtida adicionada com sucesso"})
    }catch(err){
        console.error(err);
    }
}