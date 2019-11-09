class HttpException extends Error {
    constructor(msg = "服务器异常", errorCode = 10000, code=400) { // 参数默认值
        super() // 先call super constructor才能在子类里继承并定义
        this.code = code
        this.errorCode = errorCode
        this.msg = msg
    }
}

class ParameterException extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.code = 400
        this.errorCode = errorCode || 20000
        this.msg = msg || "自定义ParameterException异常"
    }
}

class ForbiddenException extends HttpException {
    constructor(msg, errorCode, code) {
        super()
        this.code = code || 403
        this.errorCode = errorCode || 10006
        this.msg = msg || "没有权限访问"

    }
}

class Success extends HttpException {
    constructor(msg, errorCode, code) {
        super()
        // 200是查询成功 201是操作成功
        this.code = code || 201
        this.errorCode = errorCode || 0
        this.msg = msg || "成功"
    }
}

class AuthFailedException extends HttpException {
    constructor(msg, errorCode, code) {
        super()
        this.code = code || 202
        this.errorCode = errorCode || 10007
        this.msg = msg || "token验权失败"
    }
}

module.exports = {
    HttpException, 
    ParameterException, 
    ForbiddenException,
    Success,
    AuthFailedException
    
}