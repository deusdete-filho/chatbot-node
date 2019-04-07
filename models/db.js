const Sequelize = require('sequelize')
const sequelize = new Sequelize(process.env.MYSQL_DB,process.env.MYSQL_USER,process.env.MYSQL_PASS, {
  host: process.env.MYSQL_HOST,
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
 
