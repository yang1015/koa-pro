const Router = require('koa-router')
const router = new Router({
    prefix: '/v1/classic'
})
const { Auth } = require('../../../middlewares/auth.js')
const { ClassicValidator } = require('../../validators/validators.js')
const { Flow } = require('../../models/flow.js')

const { Art } = require('../../models/art.js')

router.get('/latest', new Auth().m, async(ctx, next) => {
    // 先写使用中间件看是否传了token
    // 如果token正确，就进行validator的检验
    // 如果都过了 就返回ctx
    // 需要category+artId
  
    const v = await new ClassicValidator().validate(ctx)
    // 查询
    try {
        const flow = await Flow.findOne({
            order: [
                ['index', 'DESC'] // 按照index的大小 倒叙排列 拿到index最大的那个
            ]
        })
    
        const art = await Art.getArt(flow.type, flow.art_id)

        // flow和art返回的东西都要 两个表的结果合并
    
        art.index = flow.index
        ctx.body = art
      
    } catch(err) {
        throw new Error(err)
    }
   
    // 在flow中找index最大的 取他的artId 和 type
    // 然后再对应的type表里取回数据 那music表里本来也没写id 是如何对应artid的

})

module.exports = router