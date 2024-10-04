import {getService, createService, checkEmail} from '../services/userServices';
import { createUser, loginUserSchema } from "../helpers/zodSchemas";
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import createUserToken from '../helpers/createToken';
import formatZodError from '../helpers/formatZodError';

export const getUsers = async (req: Request, res: Response) => {
    const users = await getService();
    res.status(200).json(users);
}

export const createNewUser = async (req: Request, res: Response) => {
    const bodyValidation = createUser.safeParse(req.body);

    if(!bodyValidation.success){
        return res.status(400).json({message: "Os dados recebidos no corpo da aplicação são invalidos", detalhes: formatZodError(bodyValidation.error)})
    }

    const {nome, email, senha, papel} = bodyValidation.data;

    let image = req.body.image;
    
    if(!image){
        if(req.file){
            image = req.file.path.split('\\public')[1].replace('\\', '/').replace('\\', '/');
        }else{
            image = '/public/users/default-user.webp'
        }
    }
    
    const salt = await bcrypt.genSalt(12);
    const senhaHash = await bcrypt.hash(senha, salt);

    const user = {nome, email, senha: senhaHash, papel, image};

    try{
        const criarUsuario = await createService(user);
        if(!criarUsuario){
            return res.status(403).json({message:"Não foi possivel criar o usuario, já existe um usuario com este email!"});
        }
        res.status(201).json({message: "Usuario criado!"});
    }catch(err){
        throw new Error("Erro ao criar usuario!");
    }
}

export const loginController = async (req: Request, res: Response) => {
    const bodyValidation = loginUserSchema.safeParse(req.body);

    if(!bodyValidation.success){
        return res.status(400).json({message: "Os dados recebidos no corpo da aplicação são invalidos", detalhes: formatZodError(bodyValidation.error)})
    }

    const {email, senha} = bodyValidation.data;

    try{
        const usuario = await checkEmail(email);
        if(!usuario){
            return res.status(404).json({message: "Usuario não encontrado!"});
        }

        const compararSenha = await bcrypt.compare(senha, usuario.password);

        if(!compararSenha){
            return res.status(403).json({message: "A senha não condiz!"})
        }

        await createUserToken(usuario, req, res);
    }catch(err){
        throw new Error("Erro ao logar no usuario!")
    }
}