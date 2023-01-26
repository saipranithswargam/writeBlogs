const Sequlise = require('sequelize');

const sequlise = new Sequlise(process.env.DB_NAME,process.env.USER,process.env.DB_PASSWORD,{dialect:'mysql',host:process.env.DB_HOST});

module.exports = sequlise;