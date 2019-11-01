class HttpException extends Error {
    constructor(code = 400, errorCode = 10000, msg = "服务器异常") { // 参数默认值
        super() // 先call super constructor才能在子类里继承并定义
        this.code = code
        this.errorCode = errorCode
        this.msg = msg
    }
}

class ParameterException extends HttpException {
    constructor(code, errorCode, msg) {
        super()
        this.code = 400
        this.errorCode = errorCode || 20000
        this.msg = msg || "参数错误"
    }
}

module.exports = {HttpException, ParameterException}