import Posts from "../model/posts.js";
import {unlink} from 'node:fs';
import { getSchema } from "../helpers/zodSchemas.js"

const uploadImage = async (req, res) => {
    const idValidation = getSchema.safeParse(req.params.id)
    if(!idValidation.success){
        return res.status(400).json({message: "Os dados recebidos no corpo da aplicação são invalidos", detalhes: formatZodError(idValidation.error)})
    }
    const id = idValidation.data;
    const image = req.file.path;

    if(!image){
        return res.status(400).json({message: "Não foi recebida nenhuma imagem"});
    }
    try {
        const post = await Posts.findByPk(id);
        console.log(post.dataValues.image)
        if(post.dataValues.image){
            unlink(`${post.dataValues.image}`,(err) => {
                if (err){
                    return console.error(err)
                };
                console.log(`imagem anterior deletada`);
            });
        }
        await Posts.update({image}, {where: {post_id: id}})
        res.status(200).json({message: "Imagem adicionada a Postagem: "+post.title, path: image})
    } catch (error){
        console.error(error)
        res.status(500).json({ message: "Erro ao adicionar imagem" });
    }
}

export default uploadImage;