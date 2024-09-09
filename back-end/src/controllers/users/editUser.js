import { getSchema, updateUser } from "../../helpers/zodSchemas.js";
import formatZodError from "../../helpers/formatZodError.js";
import bcrypt from 'bcrypt';
import getToken from "../../helpers/getToken.js";
import getUserByToken from "../../helpers/getUserByToken.js";
import Users from "../../model/users.js";

const editUser = async (req, res) => {
    const idValidation = getSchema.safeParse(req.params.id)
    if(!idValidation.success){
        return res.status(400).json({message: "Os dados recebidos no corpo da aplicação são invalidos", detalhes: formatZodError(idValidation.error)})
    }
    const id = idValidation.data;

    const bodyValidation = updateUser.safeParse(req.body);

    if(!bodyValidation.success){
        return res.status(400).json({message: "Os dados recebidos no corpo da aplicação são invalidos", detalhes: formatZodError(bodyValidation.error)})
    }

    const {nome, email, senha, papel} = bodyValidation.data;
    const salt = await bcrypt.genSalt(12);
    const senhaHash = await bcrypt.hash(senha, salt);

    const userData = {nome, email, senha: senhaHash};

    try{
        const token = getToken(req);
        const user = await getUserByToken(token);
        const user_id = user.dataValues.user_id

        const emailCheck = await Users.findOne({where: {email}});
        if(emailCheck){
            if(emailCheck.user_id !== user_id){
                return res.status(403).json({message: "Já existe um usuario com este email!"});
            }
        }

        await Users.update(userData, {where: {user_id}});

        res.status(200).json({message: "Usuario atualizado com sucesso!"})
    }catch(err){
        console.error(err);
        res.status(500).json({message: "Erro ao atualizar os dados do usuario!"})
    }
}

export default editUser;