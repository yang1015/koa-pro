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
        expiresIn: 60*60*24*30 // 1小时后过期
    },
    wechatSettings: {
        appId:'wx2ab0fb1b297e0995',
        appSecret:'008ce2abedbfa37b249b6e64e3a9c80c' // 不可以明文
    }
}