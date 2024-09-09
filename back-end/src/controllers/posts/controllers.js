import createPost from "./createPost.js";
import getTasksByPage from "./getPostByPage.js";
import getById from "./getById.js";
import updatePost from "./updatePost.js";
import deletePost from "./deletePost.js";
import uploadImage from './uploadImage.js'

const controllers = {
    createPost,
    getTasksByPage,
    getById,
    updatePost,
    deletePost,
    uploadImage
}

export default controllers;