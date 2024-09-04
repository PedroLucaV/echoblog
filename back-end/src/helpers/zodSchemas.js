import {z} from 'zod'

export const createSchema = z.object({
    title: z.string().max(255, {message: "O titulo deve conter no máximo 255 caracteres"}).min(5, {message: "O titulo conter pelo menos 5 caracteres"}),
    content: z.string().max(2000, {message: "A descrição deve conter no máximo 2000 caracteres"}).min(10, {message: "A descrição deve conter pelo menos 10 caracteres"}),
    author: z.string().min(3, {message: "O nome do autor deve conter pelo menos 3 caracteres"}).max(255, {message: "O nome do autor deve conter no máximo 2000 caracteres"})
})

export const getSchema = z.string().uuid({message: "UUID invalido!"});

export const updateSchema = z.object({
    title: z.string().max(255, {message: "O titulo deve conter no máximo 255 caracteres"}).min(5, {message: "O titulo conter pelo menos 5 caracteres"}),
    content: z.string().max(2000, {message: "A descrição deve conter no máximo 2000 caracteres"}).min(10, {message: "A descrição deve conter pelo menos 10 caracteres"}),
    image: z.optional(z.string())
})