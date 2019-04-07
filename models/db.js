const Sequelize = require('sequelize')
const sequelize = new Sequelize('TTByOs9dqB','TTByOs9dqB','tbZxoW5a55', {
  host: "remotemysql.com",
  dialect: "mysql"
})
sequelize.authenticate().then(function(){
  console.log("Conectado com sucesso")
}).catch(function(erro){
  console.log("Falhao ao se conectar" +erro)
})

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize
}
