import Posts from "../model/posts.js";

const getTasksByPage = async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const offset = (page - 1) * limit

    try {
        const postagens = await Posts.findAndCountAll({limit, offset})
        const totalPaginas = Math.ceil(postagens.count / limit)
        
        res.status(200).json({
        totalPostagens: postagens.count,
        totalPaginas,
        paginaAtual: page,
        itemsPorPagina: limit,
        proximaPagina: totalPaginas === 0 
            ? null 
            : `localhost:8080/posts?page=${page + 1}&limit=${limit}`,
        postagens: postagens.rows
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Erro ao buscar postagens" });
    }
}

export default getTasksByPage;