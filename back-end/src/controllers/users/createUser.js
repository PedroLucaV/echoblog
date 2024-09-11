import Users from '../../model/users.js'

import { createUser } from "../../helpers/zodSchemas.js";
import bcrypt from 'bcrypt';
import formatZodError from '../../helpers/formatZodError.js';

const createUserRoute = async (req, res) => {
    const bodyValidation = createUser.safeParse(req.body);

    if(!bodyValidation.success){
        return res.status(400).json({message: "Os dados recebidos no corpo da aplicação são invalidos", detalhes: formatZodError(bodyValidation.error)})
    }

    const {nome, email, senha, papel} = bodyValidation.data;

    let image = req.file;
    if(!image){
        image = '/public/users/default-user.webp'
    }
    if(image !== '/public/users/default-user.webp'){
        image = image.path.split('\\public')[1].replace('\\', '/').replace('\\', '/')
    }

    //password encrypt
    const salt = await bcrypt.genSalt(12);
    const senhaHash = await bcrypt.hash(senha, salt);

    const user = {nome, email, senha: senhaHash, papel, image};

    try {
        const sameEmail = await Users.findOne({where: {email}});

        if(sameEmail){
            return res.status(403).json({message: "Já existe um usuario com este email"});
        }

        const userCreated = await Users.create(user)
        res.status(201).json({message: "Usuario criado!", user});
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Erro ao criar usuario" });
    }
}

export default createUserRoute;