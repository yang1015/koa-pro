const { db } = require('../../core/db.js') // 实例
const { Sequelize, Model }  = require('sequelize') 
const { 
    DuplicatedDataException, 
    notExsitsException 
} = require('./../../core/HttpException.js')

 
// 业务表
// 老师讲的是这个模型是用来建立某一个用户是否对某一个art点赞的记录
class Like extends Model {
    static async getIfLike(userId, artId, type) {
        const data = await Like.findOne({
            where: {
                uid: userId,
                art_id: artId,
                type: type
            }
        })
    
        if (data) return 1
        else return 0
    }   

    static async like(uid, art_id, type) {
        const { Art } = require('./art')
        const like = await Like.findOne({ 
            where: {
                uid,
                art_id,
                type
            }
        }) 
       
        if (like) throw new DuplicatedDataException()     
        // transaction的结果一定要点赞  
        return db.transaction(async t => {
            await Like.create({
                uid,
                art_id,
                type
            }, { 
                transaction: t
            })
    
            const art = await Art.getArt(type, art_id)
            await art.increment(
                'fav_nums', { 
                    by: 1, 
                    transaction: t
            })  // 这个art的fav_nums上更新
        })      
    }

    static async dislike(uid, art_id, type) {
        const { Art } = require('./art')
        const data = await Like.findOne({ 
            where: {
                uid: uid,
                art_id: art_id, 
                type: type
            }
        })
        
        if (!data)  throw new notExsitsException()
        
         // 删掉找到的那一条
        return db.transaction(async t => {
            await data.destroy({
               force: true, // true是物理删除 false是软删除 不会真的删除 但是有了deleted_at
               transaction: t
            })
            const art = await Art.getArt(type, art_id)
            await art.decrement(
                'fav_nums', { 
                    by: 1, 
                    transaction: t
                })  
                // 这个art的fav_nums上更新
            })      
    } 
}

Like.init({
    uid: Sequelize.INTEGER,
    art_id: Sequelize.INTEGER,
    type: Sequelize.INTEGER
}, {
    sequelize: db,
    tableName: 'like'
})

module.exports = { Like }