// imports
import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import postRoutes from './routes/postRoutes.js';
import userRoutes from './routes/userRoutes.js';
import commentRoutes from './routes/commentRoutes.js'
import { fileURLToPath } from "node:url";
import path from 'node:path';

//dotenv
dotenv.config();

const app = express();
const PORT = process.env.PORT;

//body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//image support configs
const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);

app.use('/public', express.static(path.join(__dirName, 'public')));

app.use('/posts', postRoutes);
app.use('/users', userRoutes);
app.use('/comments', commentRoutes);

app.use((req: Request, res: Response) => {
    res.status(404).json({message: "Page Not Found"})
})

app.listen(PORT, () => {
    console.log("SERVE IN PORT ", PORT);
})