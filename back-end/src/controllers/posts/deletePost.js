import { getSchema } from '../../helpers/zodSchemas.js';
import Posts from '../../model/posts.js'

const deletePost = async (req, res) => {
    const idValidation = getSchema.safeParse(req.params.id)
    if(!idValidation.success){
        return res.status(400).json({message: "Os dados recebidos no corpo da aplicação são invalidos", detalhes: formatZodError(idValidation.error)})
    }
    const id = idValidation.data;
    try {
        const post = await Posts.findByPk(id);
        if(!post){
            return res.status(404).json({message: "Esta postagem não foi encontrada!"});
        }
        Posts.destroy({where: {post_id: id}});
        res.status(204).end();
    } catch (error) {
        console.error(error)
        res.status(400).json({ message: "Erro ao deletar a postagem" });
    }
}

export default deletePost;