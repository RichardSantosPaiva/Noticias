const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');
const fs = require('fs').promises; // Usando versão assíncrona de fs

// Verificando se o ambiente é Vercel (ou outro ambiente de deploy)
const isVercel = process.env.VERCEL === 'true';

// Usando caminho relativo para SQLite
const databasePath = isVercel 
  ? '/tmp/database.sqlite' // Diretório temporário no Vercel (não persistente)
  : path.resolve(__dirname, '../../data', 'database.sqlite'); // Banco de dados local no desenvolvimento

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: databasePath, // Usando caminho correto para SQLite
});

const Noticia = sequelize.define('Noticia', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  noticia: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imagem: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  link: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// Função para carregar as notícias a partir do JSON
const loadNoticias = async () => {
  const filePath = path.resolve(__dirname, '../../data/noticias.json');
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const noticiasData = JSON.parse(data).noticias;

    // Cria as notícias no banco de dados
    for (const noticia of noticiasData) {
      await Noticia.create(noticia);
    }
    console.log('Notícias carregadas com sucesso.');
  } catch (error) {
    console.error('Erro ao carregar notícias do JSON:', error);
  }
};

// Função para inicializar o banco de dados
const initDB = async () => {
  try {
    await sequelize.sync({ force: true }); // Sincroniza o banco de dados (reseta tudo)
    console.log('Banco de dados sincronizado');

    await loadNoticias(); // Carrega as notícias após sincronizar o banco
  } catch (error) {
    console.error('Erro ao sincronizar o banco de dados:', error);
  }
};

initDB(); // Chama a função de inicialização

module.exports = Noticia;
