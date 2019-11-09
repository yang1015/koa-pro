const Router = require('koa-router')
const router =  new Router({
    prefix: '/v1/reservation'
})

const { ReservationValidator } = require('./../../validators/validators.js')
const { Success } = require('../../../core/HttpException')
const { Auth } = require('../../../middlewares/auth.js')

router.get('/', new Auth().m, async (ctx, next) => {

    // 先判断参数是否正确 (是否携带token等)
    // 是否需要插入数据(post类/put类)
    // 返回ctx

    const v = await new ReservationValidator().validate(ctx)

    ctx.body = ctx.auth.uid
    // throw new Success("查询成功", 200)
    
})

module.exports = router