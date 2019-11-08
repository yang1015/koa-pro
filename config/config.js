module.exports = {
    env: 'dev', // or pro
    database: {
        dbName: 'skyedb',
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '123456'
    },
    security: {
        secretKey: 'littledesk',
        expiresIn: 60*60 // 1小时后过期
    }
}