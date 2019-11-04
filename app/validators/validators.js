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
        console.log(this)
        this.mobile = [
            new Rule("isMobilePhone", "手机号不正确") //locale如何添加
        ]
    }
}

module.exports = { PositiveIntValidator, RegisterValidator }