// imports
import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/dbconfig.js';
import bodyParser from 'body-parser';
import postRoutes from './routes/postRoutes.js';
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

app.use('/posts', postRoutes)

app.use((req, res) => {
    res.status(404).json({message: "Page Not Found"})
})

sequelize.sync().then(() => {
    console.log('Database connected!');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(error => {
    console.error('Unable to connect to the database:', error);
});