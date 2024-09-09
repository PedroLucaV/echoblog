import Users from '../../model/users.js'
import {loginUserSchema} from '../../helpers/zodSchemas.js'
import bcrypt from 'bcrypt'
import formatZodError from '../../helpers/formatZodError.js';
import createUserToken from '../../helpers/createToken.js';

const loginController = async (req, res) => {
    const bodyValidation = loginUserSchema.safeParse(req.body);

    if(!bodyValidation.success){
        return res.status(400).json({message: "Os dados recebidos no corpo da aplicação são invalidos", detalhes: formatZodError(bodyValidation.error)})
    }

    const {email, senha} = bodyValidation.data;

    const loginData = {email, senha}

    try{
        const user = await Users.findOne({where: {email}});
        if(!user){
            return res.status(404).json({message: "Não foi encontrado nenhum usuario com este email"});
        }

        const usuario = user.dataValues;

        const compararSenha = await bcrypt.compare(senha, usuario.senha);

        if(!compararSenha){
            return res.status(403).json({message: "A senha não condiz!"})
        }

        await createUserToken(usuario, req, res);
    }catch(err){
        console.error(err);
        res.status(500).json({message: "Erro ao logar com o usuario"});
    }
}

export default loginController;