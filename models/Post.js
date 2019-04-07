const db = require('./db')

const Post = db.sequelize.define('usuario',{
 nome: {
   type: db.Sequelize.STRING
 },
 email: {
   type: db.Sequelize.STRING
 }
})

module.exports = Post
