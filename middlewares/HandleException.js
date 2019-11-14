const { HttpException } = require('../core/HttpException.js')
const { env } = require('../config/config.js')

const handleException = async function(ctx, next) {
    try {
        await next()
    } catch(error) {
        const env = global.config.env
        const isHttpException = error instanceof HttpException
        // 生产环境 且不是自定义error的话 要释放程序的报错
        if (env === "dev" && !isHttpException) throw error  // 不需要else 因为只要throw了后面就都不会继续执行了

        // 自定义error 
        if (isHttpException) { 
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