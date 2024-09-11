import multer from "multer";
import path from 'node:path';
import { fileURLToPath } from "node:url";

//configs of Path destination
const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);

const imageStore = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = "";

        if(req.baseUrl.includes('posts')){
            folder = 'posts';
        }
        else if(req.baseUrl.includes('users')){
            folder = 'users';
        }
        cb(null, path.join(__dirName, `../public/${folder}`));
    },
    filename: (req, file, cb) => {
        cb(
            null, 
            Date.now()+ String(Math.floor(Math.random() * 100000)) +
            path.extname(file.originalname))
    }
})

const imageUpload = multer({
    storage: imageStore,
    limits: {fileSize: '500000'},
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(png||jpg||webp)$/)){
            return cb(new Error("Por favor, envie apenas arquivos: JPG, PNG ou WEBP"))
        }
        cb(null, true)
    }
})

export default imageUpload;