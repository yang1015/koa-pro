const Router = require('koa-router')
const router = new Router();

router.get('/order1', (ctx, next) => {
    ctx.body = {
        key: 'orderrrr'
    }
})

router.get('/order2', (ctx, next) => {
    ctx.body = {
        key: 'order2'
    }
})

module.exports = router
