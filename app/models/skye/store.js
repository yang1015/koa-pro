const { db } = require('../../core/db.js') // 实例
const { Sequelize, Model }  = require('sequelize') //

class Store extends Model {
    constructor() {
        super()
    }
}

Store.init({ // 两个参数 obj obj
    storeId:  {
        type: Sequelize.STRING,
        primaryKey: true,
        autoIncrement: true
    }, 
    storeCode: { // 作为展示的
        type: Sequelize.STRING,
        primaryKey: true,
        autoIncrement: true
    },
    province: Sequelize.STRING, 
    city: Sequelize.STRING,
    area: Sequelize.STRING,
    street: Sequelize.STRING,
    detailedAdress: Sequelize.STRING,
    storeLongitude: Sequelize.DOUBLE,
    storeLatitude: Sequelize.DOUBLE,
    storeName: Sequelize.STRING, // 分店名
}, { 
    sequelize: db, // 指定sequelize
    tableName: 'store' // 要小写。设置表的名字
})

module.exports = { Store }
// 数据迁移