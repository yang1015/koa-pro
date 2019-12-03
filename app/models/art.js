const { Sentence, Music, Movie } = require('./classic.js')
const { Like } = require('./like.js')
 
// 这个类主要是为了编写这个静态方法来提取每一个art实例
class Art {
    static async getArt(type, artId) {
        const finder = {
            where: {
                id: artId 
                //为什么不是art_id 因为在music/sentence表里id就是他们的artId
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