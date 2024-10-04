import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

const createUserToken = async (user:any, req:Request, res: Response) => {
    const token = jwt.sign(
        {
            nome: user.nome,
            id: user.user_id
        },
        "SENH4HYPERMEGASAFEST"
    )

    res.status(200).json({
        message: `Usuario: ${user.nome} logado com sucesso!`,
        token,
        usuarioId: user.user_id
    })
}

export default createUserToken;