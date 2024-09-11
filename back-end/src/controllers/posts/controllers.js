import createPost from "./createPost.js";
import getTasksByPage from "./getPostByPage.js";
import getById from "./getById.js";
import updatePost from "./updatePost.js";
import deletePost from "./deletePost.js";
import uploadImage from './uploadImage.js'
import getByAuthor from './getByAuthor.js'

const controllers = {
    createPost,
    getTasksByPage,
    getById,
    updatePost,
    deletePost,
    uploadImage,
    getByAuthor
}

export default controllers;