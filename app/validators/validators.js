const { LinValidator, Rule} = require('../../core/lin-validator2.js')
const { User } = require('../models/user.js')

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
        this.age = [
            new Rule("isLength", "太长", {max: 3})
        ]
        this.mobile = [
            new Rule("isMobilePhone", "手机号不正确", 'en-CA') //locale如何添加
        ]
    }

    // validateXXX(vals) {
    //     // vals.body.xxx参数
    //     // 必须以validate开头 vals是用户传过来的所有参数
    //     // 这里抛出普通error即可 不需要抛出httpException
    // }

    // 手机号不能重复
    async validateMobile(vals) {
        // 先查数据库
        const user = await User.findOne({ // 所有sequelize的操作都是异步的
            // 可以传入一组条件
            where: {
                mobile: vals.body.mobile // 看数据库里是否存在
            }
        })

        if (user) throw new Error('该手机号已存在') 
    }

    async validateOpenId(vals) {
        const user = await User.findOne({ // 所有sequelize的操作都是异步的
            // 可以传入一组条件
            where: {
                openid: vals.body.openid // 看数据库里是否存在
            }
        })

        if (user) throw new Error('openid重复') 
    }

}

module.exports = { PositiveIntValidator, RegisterValidator }