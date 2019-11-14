const { db } = require('../../core/db.js') // 实例
const { Sequelize, Model }  = require('sequelize') //
const { Sentence, Music, Movie } = require('./classic.js')
const { Like } = require('./like.js')

class Art {
   static async getArt(type, artId) {
        const finder = {
            where: {
                id: artId //为什么不是art_id 因为在music/sentence表里id就是他们的artId
            }
        }
        switch (type) {
            case 0: return await Sentence.findOne(finder); break
            case 1: return await Music.findOne(finder); break
            case 2: return await Movie.findOne(finder); break
            default: return await Sentence.findOne(finder)
        }       
    }

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

     
}

module.exports = { Art }