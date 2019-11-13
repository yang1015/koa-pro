const { db } = require('../../core/db.js') // 实例
const { Sequelize, Model }  = require('sequelize') //

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