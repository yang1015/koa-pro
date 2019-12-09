const Router = require('koa-router')
const router = new Router({
    prefix: '/v1/classic'
})
const { Auth } = require('@middlewares/auth.js')
const { 
    LikeValidator, 
    PositiveIntValidator,
    ClassicValidator
} = require('@validators/validators.js')
const { 
    ParameterException,
    notExsitsException 
} = require('@core/HttpException')
const { Flow } = require('@models/flow.js')
const { Art } = require('@models/art.js')
const { Like } = require('@models/like.js')

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
        const uid = ctx.auth.uid
        const art = await Art.getArt(uid, flow.type, flow.art_id, flow.index) // 返回的是类 而不是直接能.新属性的那种简单obj 
      
        ctx.body = art
    // 在flow中找index最大的 取他的artId 和 type
    // 然后再对应的type表里取回数据 那music表里本来也没写id 是如何对应artid的
})

// 点赞
router.post('/:index/likeArt', new Auth().m, async(ctx, next) => {
    // 先token校验
    // 需要userId, artId, type
    const v = await new PositiveIntValidator().validate(ctx, {id: 'index'})  // 如果没问题 这里开始组合一条Like数据 并插入Like表

    // 传入flow index 用flow index去找art 并点赞
    const uid = ctx.auth.uid // 在执行Auth().m的时候已经把uid放在了ctx上下文里了 所以可以直接获取
    const index = v.get('path.index')

    const flow = await Flow.findOne({
        where: {
            index
        }
    })
   
    console.log(flow.art_id, " ",flow.type)
    await Like.like(uid, flow.art_id, flow.type, index)
    ctx.body = {
        data: '更新完毕'
    }
})

// 取消赞
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

// 获取当前一期的前一期
router.get('/:index/getPrevious', new Auth().m, async (ctx, next) => {
    // 当前的index - 1
    const v = await new PositiveIntValidator().validate(ctx, { id: 'index' })
    const index = v.get('path.index')
    const flow = await Flow.findOne({
        where: { index }
    })

    if (!flow) throw new notExsitsException()
    const uid = ctx.auth.uid
    const art = await Art.getArt(uid, flow.type, flow.art_id, flow.index, useScope = true)
   
    // const ifUserLiked = await Like.getIfLike(uid, flow.art_id, flow.type) 
    // // 给art新增属性
    // art.setDataValue("index", index)
    // art.setDataValue("liked", ifUserLiked == 1? true : false)
    ctx.body = art
    // 返回内容 
})

// 获取当前一期的下一期
router.get('/:index/getNext', new Auth().m, async (ctx, next) => {
    const v = await new PositiveIntValidator().validate(ctx, { id: 'index' })
    const index = v.get('path.index')
    const flow = await Flow.findOne({
        where: {
            index
        }
    })
    if (!flow) throw new notExsitsException()
    const uid = ctx.auth.uid
    const art = await Art.getArt(uid, flow.type, flow.art_id, flow.index, useScope = true)
    ctx.body = art
})

// 获取点赞期刊的具体内容
// 是在点击渲染出的所有点赞的内容的页面， 每个期刊都自带了flow_index和type，
// 所以直接用这两个即可
router.get('/:type/:art_id/like', new Auth().m, async (ctx, next) => {
    const v = await new ClassicValidator().validate(ctx,{id: 'art_id'})
    const art_id = v.get('path.art_id')
    const type = v.get('path.type')
    const uid = ctx.auth.uid
 
    const flow = await Flow.findOne({
        where: {
            type,
            art_id
        }
    })
    
    if (!flow) throw new notExsitsException()
    const art = await Art.getArt(uid, type, art_id, flow.index, true)

    ctx.body = {
        data: art
    }  
})

// 获取我喜欢的期刊
router.get('/getAllLikes', new Auth().m, async (ctx, next) => {
    const uid = ctx.auth.uid
    const likedArtArr = await Art.getAllLikedArt(uid)
    ctx.body = {
        data: likedArtArr
    }
})
 
module.exports = router