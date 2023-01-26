const Sequlise = require('sequelize');

const sequlise = new Sequlise(process.env.DB_NAME,process.env.USER,process.env.DB_PASSWORD,{dialect:'mysql',host:process.env.DB_HOST});

// const sequlise = new Sequlise('writeblogs','root','123456789',{dialect:'mysql',host:'localhost'})

module.exports = sequlise;