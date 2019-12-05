
const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')
const { ForbiddenException } = require('../core/HttpException.js')

class Auth {
    constructor() {
    
        Auth.USER = 8
        Auth.ADMIN = 16
        Auth.SUPER_ADMIN = 32
    }

    // 放在header里就需要调用m来获取header auth中的token.name
    get m() {
       return async (ctx, next) => {
           // 检测用户传过来的token 获取请求时候附带的token
           const token = basicAuth(ctx.req)
           let decode;

           if (!token || !token.name) throw new ForbiddenException("token为必填项")
           try {    
               decode = jwt.verify(token.name, global.config.security.secretKey) // 校验令牌
               console.log(decode)
           } catch(error) {
                if (error.name == "TokenExpiredError") throw new ForbiddenException("令牌过期")
                else throw new ForbiddenException("token不合法")
           }

           ctx.auth = {
               uid: decode.uid,
               scope: decode.scope
           }
           await next() // 因为这只是中间件，还有需要继续下去的api请求部分
       }
    }

    static async verifyToken(token) {
        try {
             jwt.verify(token, global.config.security.secretKey)
             return true
        } catch(err) {
             return false 
        } 
    }
}

module.exports = {
    Auth
}