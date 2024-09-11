import getToken from "./getToken.js"
import getUserByToken from "./getUserByToken.js";
import Users from "../model/users.js";

const verifyAdmin = async (req, res, next) => {
    try {
    const token = getToken(req);
    const user = await getUserByToken(token);
    const user_id = user.dataValues.user_id 
    const papelCheck = await Users.findOne({where: {user_id}});
    
    if(papelCheck.dataValues.papel !== 'administrador' && papelCheck.dataValues.papel !== 'autor'){
        return res.status(403).json({message: "Você precisa ser um administrador ou um autor para realizar esta função"})
    }

    } catch (error) {
        res.status(500).json({message: "Erro ao validar papel"})
    }
    next()
}

export default verifyAdmin;