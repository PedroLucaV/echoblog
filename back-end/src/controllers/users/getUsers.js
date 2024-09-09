import Users from "../../model/users.js";

const getUsers = async (req, res) => {
    try{
        const users = await Users.findAll();

        res.status(200).json(users)
    }catch(err){
        console.error(err);
        res.status(500).json({message: "Erro ao buscar os usuarios!"})
    }
}

export default getUsers;