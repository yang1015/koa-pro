const { db } = require('../../core/db.js') // 实例
const { Sequelize, Model }  = require('sequelize') //
const { Art } = require('./art.js')
console.log(Art) // 这里打印是undefined
class Flow extends Model {
       
}

Flow.init({
    index: Sequelize.INTEGER,
    art_id: Sequelize.INTEGER,
    type: Sequelize.INTEGER
}, {
    sequelize: db, // 指定sequelize
    tableName: 'flow' // 要小写。设置表的名字
})

module.exports = {
    Flow
}