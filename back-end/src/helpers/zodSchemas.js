import {z} from 'zod'

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

export const createSchema = z.object({
    title: z.string().max(255, {message: "O titulo deve conter no máximo 255 caracteres"}).min(5, {message: "O titulo conter pelo menos 5 caracteres"}),
    content: z.string().max(2000, {message: "A descrição deve conter no máximo 2000 caracteres"}).min(10, {message: "A descrição deve conter pelo menos 10 caracteres"}),
    author: z.string().min(3, {message: "O nome do autor deve conter pelo menos 3 caracteres"}).max(255, {message: "O nome do autor deve conter no máximo 2000 caracteres"})
})

export const commentSchema = z.object({
    comment: z.string().max(255, {message: "O titulo deve conter no máximo 255 caracteres"})
})

export const createUser = z.object({
    nome: z.string().max(255, {message: "O titulo deve conter no máximo 255 caracteres"}).min(5, {message: "O nome conter pelo menos 5 caracteres"}),
    email: z.string().max(255, {message: "O email deve conter no máximo 255 caracteres"}).min(5, {message: "O email conter pelo menos 5 caracteres"}).regex(emailRegex),
    senha: z.string().max(100, {message: "A senha deve conter no máximo 255 caracteres"}).min(8, {message: "A senha conter pelo menos 8 caracteres"}).regex(passwordRegex, {message: "A senha deve conter ao menos 1 letra maiuscula, 1 letra minuscula, 1 número e 1 Caracter Especial"}),
    papel: z.optional(z.enum(["administrador", "autor", "leitor"]))
})

export const updateUser = z.object({
    nome: z.string().max(255, {message: "O titulo deve conter no máximo 255 caracteres"}).min(5, {message: "O nome conter pelo menos 5 caracteres"}),
    email: z.string().max(255, {message: "O email deve conter no máximo 255 caracteres"}).min(5, {message: "O email conter pelo menos 5 caracteres"}).regex(emailRegex),
    senha: z.string().max(100, {message: "A senha deve conter no máximo 255 caracteres"}).min(8, {message: "A senha conter pelo menos 8 caracteres"}).regex(passwordRegex, {message: "A senha deve conter ao menos 1 letra maiuscula, 1 letra minuscula, 1 número e 1 Caracter Especial"})
})

export const loginUserSchema = z.object({
    email: z.string(),
    senha: z.string()
})

export const getSchema = z.string().uuid({message: "UUID invalido!"});

export const updateSchema = z.object({
    title: z.string().max(255, {message: "O titulo deve conter no máximo 255 caracteres"}).min(5, {message: "O titulo conter pelo menos 5 caracteres"}),
    content: z.string().max(2000, {message: "A descrição deve conter no máximo 2000 caracteres"}).min(10, {message: "A descrição deve conter pelo menos 10 caracteres"}),
    image: z.optional(z.string())
})