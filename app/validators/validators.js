const { LinValidator, Rule} = require('../../core/lin-validator')

class PositiveIntValidator extends LinValidator{
    constructor() {
        super()
        this.id = [
            new Rule('isInt', '传入的不是正整数喔', { min: 1} )
        ]

    }
}

class RegisterValidator extends LinValidator {
    constructor() {
        super()
        // this.mobile = [
        //     new Rule("isMobilePhone", "手机号不正确") //locale如何添加
        // ]
        // this.openid = [
        //     new Rule("isLength", "openid过短", {min: 10})
        // ]
    }

    validateXXX(vals) {
        // vals.body.xxx参数
        // 必须以validate开头 vals是用户传过来的所有参数
        // 这里抛出普通error即可 不需要抛出httpException
    }
}

module.exports = { PositiveIntValidator, RegisterValidator }