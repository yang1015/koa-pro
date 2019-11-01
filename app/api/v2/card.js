const Router = require('koa-router')
const router = new Router();

router.get('/card1', (ctx, next) => {
    ctx.body = {
        key: 'card1'
    }
})

router.get('/card2', (ctx, next) => {
    ctx.body = {
        key: 'card2'
    }
})

router.get('/card3', (ctx, next) => {
    ctx.body = {
        key: 'card3'
    }
})

module.exports = router
