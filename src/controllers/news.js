const Noticia = require('../models/news.js');

// Função para listar notícias
async function listarNoticias(req, res) {
  try {
    const noticias = await Noticia.findAll();
    res.render('news/index', { noticias }); // Renderiza a view 'news/index' com os dados
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar notícias.', error });
  }
}

// Função para criar uma nova notícia
async function criarNoticia(req, res) {
  try {
    const { titulo, noticia } = req.body; // Recebe os dados da requisição
    const novaNoticia = await Noticia.create({ titulo, noticia }); // Cria a nova notícia
    res.status(201).json(novaNoticia); // Retorna a notícia criada
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar notícia.', error });
  }
}

module.exports = { listarNoticias, criarNoticia };
