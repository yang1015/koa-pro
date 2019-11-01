const { HttpException } = require('../core/HttpException.js')

const handleException = async function(ctx, next) {
    try {
        await next()
    } catch(error) {
        if (error instanceof HttpException) { // 只要是这个类型的 说明就是已知错误
            ctx.body = {
                errorCode: error.errorCode,
                message: error.msg,
                requestUrl: `${ctx.method} ${ctx.path}`
            
            }
            ctx.status = error.code
        } else {
            ctx.body = "222全局监听报错啦报错啦"
        }  
    }
}

module.exports = handleException