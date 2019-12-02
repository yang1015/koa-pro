const Router = require('koa-router')
const router = new Router({
    prefix: '/v1/classic'
})
const { Auth } = require('../../../middlewares/auth.js')
const { LikeValidator } = require('../../validators/validators.js')
const { ParameterException } = require('../../../core/HttpException')
const { Flow } = require('../../models/flow.js')
const { Art } = require('../../models/art.js')
const { Like } = require('../../models/like.js')

router.get('/latest', new Auth().m, async(ctx, next) => {
    // 先写使用中间件看是否传了token
    // 如果token正确，就进行validator的检验(无参数不需要校验)
    // 如果都过了 就返回ctx
    // 需要category+artId
        // if (!ctx.query.uid) throw new ParameterException('uid必填') 用ctx.auth.uid获取即可
        const flow = await Flow.findOne({
            order: [
                ['index', 'DESC'] // 按照index的大小 倒叙排列 拿到index最大的那个
            ]
        })
         
         // flow和art返回的东西都要 两个表的结果合并 
        const art = await Art.getArt(flow.type, flow.art_id) // 返回的是类 而不是直接能.新属性的那种简单obj 
        const uid = ctx.auth.uid
        const ifUserLiked = await Like.getIfLike(uid, flow.art_id, flow.type) 
        // 给art新增属性
        art.setDataValue("index", flow.index)
        art.setDataValue("liked", ifUserLiked == 1? true : false)
        ctx.body = art
   
    // 在flow中找index最大的 取他的artId 和 type
    // 然后再对应的type表里取回数据 那music表里本来也没写id 是如何对应artid的
})

// 新增点赞uid+artId+type
router.post('/likeArt', new Auth().m, async(ctx, next) => {
    // 先token校验
    // 需要userId, artId, type
    const v = await new LikeValidator().validate(ctx)  // 如果没问题 这里开始组合一条Like数据 并插入Like表
    const data = v.get('body')
    const uid = ctx.auth.uid // 在执行Auth().m的时候已经把uid放在了ctx上下文里了 所以可以直接获取
    await Like.like(uid, data.art_id, data.type)
    ctx.body = {
        data: '更新完毕'
    }
})

router.post('/dislikeArt', new Auth().m, async(ctx, next) => {
    // 先token校验
    // 需要userId, artId, type
    console.log("dislike")
    const v = await new LikeValidator().validate(ctx)  // 如果没问题 这里开始组合一条Like数据 并插入Like表
    const data = v.get('body')
    const uid = 1 // 在执行Auth().m的时候已经把uid放在了ctx上下文里了 所以可以直接获取
    const v2 = await Like.dislike(uid, data.art_id, data.type)
    console.log(v2)
    ctx.body = {
        data: '已删除'
    }
})

module.exports = router