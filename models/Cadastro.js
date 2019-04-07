const db = require('./db')

const Cadastro = db.sequelize.define('usuarios',{
 nome: {
   type: db.Sequelize.STRING
 },
 email: {
   type: db.Sequelize.STRING
 }
})

module.exports = Cadastro
