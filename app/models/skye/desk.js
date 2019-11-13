const { db } = require('../../core/db.js') // 实例
const { Sequelize, Model }  = require('sequelize') //

class Desk extends Model {
    constructor() {
        super()
    }
}

Desk.init({ // 两个参数 obj obj
    deskId:  {
        type: Sequelize.STRING,
        primaryKey: true,
        autoIncrement: true
    }, 
    deskCode: {
        type: Sequelize.STRING,
        primaryKey: true,
        autoIncrement: true
    },
    deskAtStore: { // 分店
        type: Sequelize.STRING,
        primaryKey: true,
        autoIncrement: true
    },
    deaskName: Sequelize.STRING, // 桌号


    
}, { 
    sequelize: db, // 指定sequelize
    tableName: 'desk' // 要小写。设置表的名字
})

module.exports = { Desk }
// 数据迁移