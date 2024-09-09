import Users from "../../model/users.js";
import { getSchema } from "../../helpers/zodSchemas.js";

const deleteUser = async (req, res) => {
    const idValidation = getSchema.safeParse(req.params.id)
    if(!idValidation.success){
        return res.status(400).json({message: "Os dados recebidos no corpo da aplicação são invalidos", detalhes: formatZodError(idValidation.error)})
    }
    const user_id = idValidation.data;

    try {
        const user = await Users.findByPk(user_id);

        if(!user){
            return res.status(404).json({message: "Este usuario não foi encontrado!"});
        }
        
        await Users.destroy({where: {user_id}});
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Erro ao deletar usuario!"})
    }
}

export default deleteUser;