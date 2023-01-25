const Sequlise = require('sequelize');

const sequlise = new Sequlise('writeblogs','root',process.env.DB_PASSWORD,{dialect:'mysql',host:'localhost'});

module.exports = sequlise;