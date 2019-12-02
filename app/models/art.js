const { Sentence, Music, Movie } = require('./classic.js')
const { Like } = require('./like.js')
 
class Art {
    constructor() {

    }
    static async getArt(type, artId) {
        const finder = {
            where: {
                id: artId //为什么不是art_id 因为在music/sentence表里id就是他们的artId
            }
        }
        let art;
        switch (type) {
            case 0: art = await Sentence.findOne(finder); break
            case 1: art = await Music.findOne(finder); break
            case 2: art = await Movie.findOne(finder); break
            default: 
                art = await Sentence.findOne(finder)
        }       
        return art
    }

    
}

module.exports = { Art }