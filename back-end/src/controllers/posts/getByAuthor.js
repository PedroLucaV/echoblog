import { getSchema } from "../../helpers/zodSchemas.js";

const getByAuthor = async (req, res) => {
    const idValidation = getSchema.safeParse(req.query.author)
    if(!idValidation.success){
        return res.status(400).json({message: "Os dados recebidos no corpo da aplicação são invalidos", detalhes: formatZodError(idValidation.error)})
    }
    const id = idValidation.data

    try {
        const postByAuthor = await Posts.findByPk(id)
        if(!postByAuthor){
            return res.status(404).json({message: "Não foi encontrado a postagem pelo ID do autor!"})
        }
        res.status(200).json({post: postByAuthor})
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Erro ao buscar a postagem" });
    }
}

export default getByAuthor;