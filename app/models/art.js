const { Sentence, Music, Movie } = require('./classic.js')
const { Like } = require('./like.js')
const { Flow } = require('./flow')
const { notExsitsException } = require('@core/HttpException.js')
 
// 这个类主要是为了编写这个静态方法来提取每一个art实例
class Art {
    static async getArt(uid, type, artId, flowIndex, useScope = true) {
        const finder = {
            where: {
                id: artId //为什么不是art_id 因为在music/sentence表里id就是他们的artId
            }
        }
        let art;
        const scope = useScope? "bh" : null
        switch (type) {
            case 0: art = await Sentence.scope(scope).findOne(finder); break
            case 1: art = await Music.scope(scope).findOne(finder); break
            case 2: art = await Movie.scope(scope).findOne(finder); break
            default: 
                art = await Sentence.scope(scope).findOne(finder)
        }      
       
        if (!art) throw new notExsitsException()
        const ifUserLiked = await Like.getIfLike(uid, artId, type) 
        if (ifUserLiked) {
            art.setDataValue("index", flowIndex)
            art.setDataValue("liked", ifUserLiked == 1? true : false)
        } else {
            art.setDataValue("index", flowIndex)
            art.setDataValue("liked", false)
        }
        // 给art新增属性
        return art
    }

    static async getAllLikedArt(uid) {
        const likes = await Like.findAll({
            where: { uid }
        })
        let arr = []
        for (let i = 0; i < likes.length; i++) {
            const flow = await Flow.findOne({
                where: {
                    art_id: likes[i].art_id,
                    type: likes[i].type
                }
            })
            console.log( uid, 
                likes[i].type, 
                likes[i].art_id, 
                flow.index)
            const art = await this.getArt(
                uid, 
                likes[i].type, 
                likes[i].art_id, 
                flow.index, 
                true)

            arr.push(art)
        }
        return arr
    }
}

module.exports = { Art }