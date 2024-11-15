const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

// Configuração para SQLite local no desenvolvimento
const isVercel = process.env.VERCEL === 'true';

let sequelize;

if (isVercel) {
  // Configuração para banco remoto PostgreSQL no Vercel
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  });
} else {
  // Configuração para SQLite local no desenvolvimento
  const databasePath = path.resolve(__dirname, '../../data', 'database.sqlite');
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: databasePath,
  });
}

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

// Sincronizar o banco de dados
sequelize.sync({ force: true })
  .then(() => console.log("Banco de dados sincronizado"))
  .catch(error => console.error("Erro ao sincronizar o banco:", error));

module.exports = Noticia;
