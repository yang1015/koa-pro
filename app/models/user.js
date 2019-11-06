const { db } = require('../../core/db.js') // 实例
const { Sequelize, Model }  = require('sequelize') //

class User extends Model {
}

User.init({ // 两个参数 obj obj
    // 主键 关系型数据库
    // id编号最好是数字的 查询性能最好，不要使用随机字符串(GUID,数据量大的话查询很慢)
    // 要考虑并发 同时注册的问题
    // 账号暴露问题
    // 哪怕账号暴露 也无法获取信息（接口访问验权 token）
    id:  {
        // 根据需要是否要建立自己的账号生成体系(生成的时候需要先查询上一个是什么，比较麻烦)
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true, // 自动增长+1
    }, 
    openid: { // 最好是unionid（如果要公众号+小程序） 不然只有小程序里是唯一的
        type: Sequelize.STRING,
        unique: true,
        primaryKey: true // 主键 不能重复 不能为空
    },
    mobile: {
        type: Sequelize.INTEGER,
        unique: true
    },
    nickname: Sequelize.STRING,
    age: Sequelize.INTEGER,
    city: Sequelize.STRING,
    avatarurl: Sequelize.STRING
}, { 
    sequelize: db, // 指定sequelize
    tableName: 'user' // 要小写。设置表的名字
})

module.exports = { User }
// 数据迁移