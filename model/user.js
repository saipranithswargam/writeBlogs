const { Sequelize } = require('sequelize');

const sequlise = require("../util/database");

const User = sequlise.define('user',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    email:Sequelize.STRING,
    password:Sequelize.STRING,
})

module.exports = User;