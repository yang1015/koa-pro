const { db } = require('../../core/db.js') // 实例
const { Sequelize, Model }  = require('sequelize') //
const { Sentence, Music, Movie } = require('./classic.js')

class Art {
   static async getArt(type, artId) {
        const finder = {
            where: {
                id: artId //为什么不是art_id
            }
        }
        switch (type) {
            case 0: return await Sentence.findAll(finder); break
            case 1: return await Music.findAll(finder); break
            case 2: return await Movie.findAll(finder); break
            default: return await Sentence.findAll(finder)
        }       
    }
}

module.exports = { Art }