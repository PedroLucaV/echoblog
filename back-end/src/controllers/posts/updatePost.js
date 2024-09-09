import {getSchema, updateSchema} from '../../helpers/zodSchemas.js';
import formatZodError from '../../helpers/formatZodError.js'
import Posts from '../../model/posts.js'

const updatePost = async (req, res) => {
    const idValidation = getSchema.safeParse(req.params.id)
    const updateValidation = updateSchema.safeParse(req.body)
    if(!idValidation.success){
        return res.status(400).json({message: "Os dados recebidos no corpo da aplicação são invalidos", detalhes: formatZodError(idValidation.error)})
    }

    if(!updateValidation.success){
        return res.status(400).json({message: "Os dados recebidos no corpo da aplicação são invalidos", detalhes: formatZodError(updateValidation.error)})
    }
    const id = idValidation.data
    const { title, content, image } = updateValidation.data;
    
    const postUpdated = {
        title,
        content,
        image,
    }

    try {
        const [linhasAfetadas] = await Posts.update(postUpdated, { where: { post_id: id } })

        if (linhasAfetadas < 1) {
        return res.status(404).json({
            message: "Postagem não atualizada."
        })
        }

        res.status(200).json({message: "Postagem atualizada com sucesso."})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao atualizar postagem" });
    }
}

export default updatePost;