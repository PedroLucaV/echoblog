import jwt from 'jsonwebtoken';

const createUserToken = async (user, req, res) => {
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