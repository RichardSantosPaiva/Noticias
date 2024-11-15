const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory');

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
    type: DataTypes.STRING, // URL da imagem
    allowNull: true
  },
  link: {
    type: DataTypes.STRING, // URL do link
    allowNull: true
  }
});

// Sincronizar e criar algumas notícias iniciais
(async () => {
  await sequelize.sync();
  // Dados iniciais a partir do JSON
  const noticiasData = require('../../data/noticias.json').noticias;
  noticiasData.forEach(async noticia => {
    await Noticia.create(noticia);
  });
})();

module.exports = Noticia;
