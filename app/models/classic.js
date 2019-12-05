const { db } = require('../../core/db.js') // 实例
const { Sequelize, Model }  = require('sequelize') //

const commonFields = {
    type: Sequelize.INTEGER, // 0句子 1音乐 2电影
    image: Sequelize.STRING, // 图片地址
    title: Sequelize.STRING,
    content: Sequelize.STRING,
    fav_nums: Sequelize.INTEGER,
    pubdate: Sequelize.DATEONLY
}

class Sentence extends Model {
   
}

Sentence.init(commonFields, {
    sequelize: db, // 指定sequelize
    tableName: 'sentence' // 要小写。设置表的名字
})

class Music extends Model {
   
}

Music.init({...commonFields, url: Sequelize.STRING}, {
    sequelize: db, // 指定sequelize
    tableName: 'music' // 要小写。设置表的名字

})

class Movie extends Model {
   
}

Movie.init(commonFields, {
    sequelize: db, // 指定sequelize
    tableName: 'movie' // 要小写。设置表的名字
})

module.exports = { 
    Sentence, 
    Music, 
    Movie 
}
// 数据迁移
