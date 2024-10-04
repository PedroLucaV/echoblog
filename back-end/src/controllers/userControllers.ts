import {getService} from '../services/userServices';

const getUsers = async (req: any, res: any) => {
    const users = await getService();
    res.status(200).json(users);
}