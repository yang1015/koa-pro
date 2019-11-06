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

 

module.exports = {HttpException, ParameterException}