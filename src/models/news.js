const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:'); // Banco em memória, pode ser alterado para persistência
const path = require('path');
const fs = require('fs');

// Definindo o modelo de Noticia
const Noticia = sequelize.define('Noticia', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  noticia: {
    type: DataTypes.STRING,
    allowNull: false
  },
  imagem: {
    type: DataTypes.STRING,
    allowNull: true
  },
  link: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

// Função para carregar as notícias a partir do JSON
const loadNoticias = () => {
  const filePath = path.resolve(__dirname, '../../data/noticias.json');
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    const noticiasData = JSON.parse(data).noticias;

    noticiasData.forEach(async noticia => {
      await Noticia.create(noticia);
    });

  } catch (error) {
    console.error("Erro ao carregar notícias do JSON:", error);
  }
};

// Função para inicializar o banco de dados
const initDB = async () => {
  try {
    await sequelize.sync({ force: true }); // Use force: true apenas em desenvolvimento para redefinir o banco
    console.log("Banco de dados sincronizado");

    loadNoticias(); // Carrega as notícias após a sincronização

  } catch (error) {
    console.error("Erro ao sincronizar o banco de dados:", error);
  }
};

initDB(); // Chama a função de inicialização

module.exports = Noticia;
