import Users from "../../model/users.js";
import { getSchema } from "../../helpers/zodSchemas.js";

const changePaper = async (req, res) => {
    const idValidation = getSchema.safeParse(req.params.id)
    if(!idValidation.success){
        return res.status(400).json({message: "Os dados recebidos no corpo da aplicação são invalidos", detalhes: formatZodError(idValidation.error)})
    }
    const user_id = idValidation.data;
    try {
        const usuario = await Users.findByPk(user_id);
        if(!usuario){
            return res.status(404).json({message: "Não foi encontrado o usuario pelo ID fornecido!"});
        }

        if(usuario.dataValues.papel == "leitor"){
            await Users.update({papel: 'autor'}, {where: {user_id}});
        } else if (usuario.dataValues.papel == "autor") {
            await Users.update({papel: 'leitor'}, {where: {user_id}});
        }
        const updatedUser = await Users.findOne({raw: true,where: {user_id}});
        res.status(200).json({usuario: updatedUser});

    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Erro ao mudar o papel do usuario"})
    }
}

export default changePaper;