const { db } = require('../../core/db.js') // 实例
const { Sequelize, Model }  = require('sequelize') //

class Card extends Model {
    constructor() {
        super()
    }
}

Card.init({ // 两个参数 obj obj
    cardId:  {
        type: Sequelize.STRING,
        primaryKey: true,
        autoIncrement: true
    }, 
    cardCode: {
        type: Sequelize.STRING,
        primaryKey: true,
        autoIncrement: true
    },
    cardType: Sequelize.INTEGER, // 卡的种类
    price: Sequelize.DOUBLE, // 标价
    availableStore: Sequelize.ENUM,
    startTime: Sequelize.DATE,
    endTime: Sequelize.DATE,

    
}, { 
    sequelize: db, // 指定sequelize
    tableName: 'card' // 要小写。设置表的名字
})

module.exports = { Card }
// 数据迁移