const { HttpException } = require('../core/HttpException.js')
const { env } = require('../config/config.js')

const handleException = async function(ctx, next) {
    try {
        await next()
    } catch(error) {
        console.log(global.config.env)
        console.log(error)
        if (global.config.env === "dev" && !error instanceof HttpException) throw error // 不需要else 因为只要throw了后面就都不会继续执行了
        if (error instanceof HttpException) { // 只要是这个类型的 说明就是已知错误
            ctx.body = {
                errorCode: error.errorCode,
                message: error.msg,
                requestUrl: `${ctx.method} ${ctx.path}`
            }
            ctx.status = error.code
        } else {
            // 未知错误
            ctx.body = {
                errorCode: 999,
                message: error.msg,
                requestUrl: `${ctx.method} ${ctx.path}`
            }
            ctx.status = 500;
        }  
    }
}

module.exports = handleException