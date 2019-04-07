const db = require('./db')

const Post = db.sequelize.define('usuarios',{
 nome: {
   type: db.Sequelize.STRING
 },
 email: {
   type: db.Sequelize.STRING
 }
})

module.exports = Post

// criar tabela
// Post.sync({force: true})
