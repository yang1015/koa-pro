const { 
    dbName, 
    user, 
    password,
    host,
    port 
 } = require( '../config/config.js').database

const Sequelize = require('sequelize')

// dbName
// user 数据库账号
// pwd 密码
// js对象
const sequelize = new Sequelize(dbName, user, password, {
   dialect: 'mysql',
   host,
   port,
//    logging: true, // 默认是true 显示Sql操作
   timezone: '+08:00',
   define: {
        // create_time update_time delete_time
        timestamps: true, // 表里的createdAt和updatedAt的自动生成来源 不控制delete_time建议存在 
        paranoid: true, // 生成delete_time
        createdAt: 'created_at', // 重命名 更符合数据库命名规范
        underscored: true// 驼峰转成下划线
   }
}) 

sequelize.sync({
    force: false // true = 自动新增参数并刷新数据库 =重新删除表再建一次新的 不推荐这么做
})

module.exports = {
    db: sequelize
}