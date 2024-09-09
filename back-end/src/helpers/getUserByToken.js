import jwt from 'jsonwebtoken';
import Users from '../model/users.js';

const getUserByToken = async (token) => {
    return new Promise(async (resolve, reject) => {
        if(!token){
            return res.status(401),json({err: "Acesso Negado!"})
        }
        const decode = jwt.decode(token, 'SENH4HYPERMEGASAFEST')
        const user_id = decode.id;

        try {
            const user = await Users.findByPk(user_id);
            if(!user){
                reject({status: 404, message: "Usuario não encontrado"});
            }
            resolve(user)
        } catch (error) {
            reject({status: 500, message: "erro ao buscar usuario"});
        }
    })
}

export default getUserByToken;