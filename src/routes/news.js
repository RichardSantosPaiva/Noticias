const express = require('express');
const router = express.Router();
const noticiasController = require('../controllers/news.js');

// Rota GET para listar as notícias
router.get('/', noticiasController.listarNoticias);

module.exports = router;
