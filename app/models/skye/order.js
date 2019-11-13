const { db } = require('../../core/db.js') // 实例
const { Sequelize, Model }  = require('sequelize') //

class Order extends Model {
    constructor() {
        super()
    }
}

Order.init({ // 两个参数 obj obj
    orderId:  {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }, 
    orderNo: { 
        type: Sequelize.STRING(64),
        unique: true,
        primaryKey: true
    },
    orderType: Sequelize.INTEGER, // 0单笔 1买卡 
    orderStore: Sequelize.STRING, // 下单分店 
    paymentAmount: Sequelize.DOUBLE, // 实付金额
    paymentMethod: Sequelize.INTEGER, // 卡支付 扣钱支付 学点支付(混合扣钱)
    orderTime: Sequelize.DATE,
    paymentTime: Sequelize.DATE,
    paymentState: Sequelize.INTEGER // 0未支付 1支付成功 2支付失败 3支付超时
    
}, { 
    sequelize: db, // 指定sequelize
    tableName: 'order' // 要小写。设置表的名字
})

module.exports = { Order }
// 数据迁移