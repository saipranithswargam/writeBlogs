const { Sequelize } = require('sequelize');

const sequlise = require("../util/database");

const Blog = sequlise.define('blogs',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    blogTitle:{
        type : Sequelize.STRING,
        allowNull:false,
    },
    blogContent:{
        type:Sequelize.STRING,
        allowNull:false,
    }
})

module.exports = Blog;