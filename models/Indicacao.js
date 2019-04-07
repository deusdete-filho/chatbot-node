const db = require('./db')

const Indicacao = db.sequelize.define('indicacao_filme',{
 id_filme: {
   type: db.Sequelize.STRING
 },
 id_usuario: {
   type: db.Sequelize.STRING
 },
 nota: {
   type: db.Sequelize.STRING
 }
})

module.exports = Indicacao
Indicacao.sync({force: true})
