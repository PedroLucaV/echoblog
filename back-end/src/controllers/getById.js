import { getSchema } from "../helpers/zodSchemas.js"

const getById = async (req, res) => {
    const idValidation = getSchema.safeParse(req.params.id)
    if(!idValidation.success){
        return res.status(400).json({message: "Os dados recebidos no corpo da aplicação são invalidos", detalhes: formatZodError(idValidation.error)})
    }
    const id = idValidation.data
    try{
        const taskById = await Tasks.findByPk(id)
        if(!taskById){
            return res.status(404).json({message: "Não foi encontrado a postagem pelo ID!"})
        }
        res.status(200).json({tarefa: taskById})
    }
    catch (error){
        console.error(error)
        res.status(400).json({ message: "Erro ao buscar a postagem" });
    }
}

export default getById;