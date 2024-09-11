import Posts from '../../model/posts.js'

import { createSchema } from '../../helpers/zodSchemas.js';
import formatZodError from '../../helpers/formatZodError.js';

const createPost = async (req, res) => {
    const bodyValidation = createSchema.safeParse(req.body);

    if(!bodyValidation.success){
        return res.status(400).json({message: "Os dados recebidos no corpo da aplicação são invalidos", detalhes: formatZodError(bodyValidation.error)})
    }

    const {title, content, author} = bodyValidation.data;
    let image = req.file;
    if(!image){
        image = '/public/posts/default-post.jpg'
    }
    if(image !== '/public/posts/default-post.jpg'){
        image = image.path.split('\\public')[1].replace('\\', '/').replace('\\', '/')
    }
    
    try{
        const newPost = await Posts.create({
            title,
            content,
            author,
            image
        })
        res.status(201).json({message: "Postagem Criada!", data: newPost});
    }
    catch (error){
        console.error(error)
        res.status(500).json({ message: "Erro ao criar postagem" });
    }
}

export default createPost;