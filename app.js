const express = require('express');
const path = require('path');
const app = express();

// Serve arquivos estáticos (CSS, JS, imagens) da pasta 'public'
// Definir o diretório de views
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

const noticiasRoutes = require('./src/routes/news.js');
app.use('/noticias', noticiasRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
