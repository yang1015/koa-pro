const { db } = require('../../core/db.js') // 实例
const { Sequelize, Model }  = require('sequelize') //
const { DuplicatedDataException, notExsitsException } = require('./../../core/HttpException.js')
const { Art } = require('./art.js')


// 业务表
// 老师讲的是这个模型是用来建立某一个用户是否对某一个art点赞的记录
class Like extends Model {
    static async getLikes(artId) {
        const data = await Like.findOne({
            where: {
                id: artId
            }
        })

        const fav_numes = data.fav_nums
        return fav_numes
    }

    static async like(uid, artId, type) {
        const v = await Art.getArt(type, artId)
        const data = await Like.findOne({ where: {
                uid: uid,
                art_id: artId, 
                type: type
            }
        })
        
        if (data) {
            throw new DuplicatedDataException()
        } else {
          
            console.log(v)
            await Like.create({
                uid: uid,
                art_id: artId, 
                type: type
            })
           
            // 而且还需要在这个art的fav_nums上更新
        } 
    }

    static async dislike(uid, artId, type) {
        const data = await Like.findOne({ 
            where: {
                uid: uid,
                art_id: artId, 
                type: type
            }
        })

        if (!data)  throw new notExsitsException()
    
        return await Like.destroy({
            where: {
                uid: uid,
                art_id: artId, 
                type: type  
              }
        })
    }
     
}

Like.init({
    uid: Sequelize.INTEGER,
    art_id: Sequelize.INTEGER,
    type: Sequelize.INTEGER
}, {
    sequelize:db,
    tableName: 'like'
})

module.exports = {
    Like
}