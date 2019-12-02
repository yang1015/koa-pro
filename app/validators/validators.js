// const bcrypt = require('bcryptjs')

const { LinValidator, Rule} = require('../../core/lin-validator2.js')
const { User } = require('../models/user.js')
const { LoginType } = require('./../helpers/enum.js')
const { generateToken } = require('../../config/config.js')
const { Sentence, Music, Movie } = require('../models/classic')


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

    // 必须以validate开头 vals是用户传过来的所有参数
    // 这里抛出普通error即可 不需要抛出httpException
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

class TokenValidator extends LinValidator{
    // 登录方式 1. 小程序/微信端 (acc) 2. web端 (acc+pwd)
    // 登录方式使用枚举 必须在规定的方式之内
    constructor() {
        super() // 务必要先super!!!!
        this.account = [
            new Rule('isLength', 'account是必传项', {min: 1})
        ]
    }

    async validateLoginType(vals) {
        const type = vals.body.type
        if (!type) throw new Error('type是必传项')
        if (!LoginType.checkLoginType(type)) throw new Error('类型不符')
       
        // 判断特定登陆类型下提交的参数是否正确
        switch (type) {
            case LoginType.ACCPWD_LOGIN:
                break
            case LoginType.WECHAT_LOGIN:
                // 传入code和登录类型type
               
                break
            case LoginType.MOBILE_LOGIN:
                // 微信登录 openid + mobile
                // 去数据库里查找这两项是否匹配
                const user = await User.findOne({ // 所有sequelize的操作都是异步的
                    where: {
                        mobile: vals.body.mobile // 看数据库里是否存在
                    }
                })

                if (!user) throw new Error('找不到该手机号')
                if (vals.body.openid !== user.openid) throw new Error('openid和mobile不匹配')
                break
            default :
        }
    }
}

class TokenVerifyValidator extends LinValidator {
    constructor() {
        super()
        this.token = [
            new Rule('isLength', 'token必填', {mix: 1})
        ]
    }
}

class ReservationValidator extends LinValidator{
    constructor() {
        super()
        // 查看我的所有预约
        // openid必填 token必填 
    } 
}

class LikeValidator extends LinValidator {
    constructor() {
        super()
        // uid, artId, type
        this.type = [
            new Rule("isLength", "type必填", {min:1}),
            new Rule('isInt', 'type传入有误', {min:0, max:2})
        ] 

        this.art_id = [
            new Rule("isLength", "art_id必填", {min:1})
        ]
    }
    
    // async validateUserId(vals) {
    //     // check userId是否在数据库里
    //     const u = await User.findOne({
    //         where: {
    //             id: vals.body.uid
    //         }
    //     })    
    //     if (!u) throw new Error("该用户不存在")   
    // }

    async validateArtId(vals) {
        const artId = vals.body.art_id
        const type = vals.body.type

        
        const findArtId = {
            where: {
                id: artId
            }
        }
        let ifFind = false;
        switch (type) {
            case 0: ifFind = await Sentence.findOne(findArtId); break
            case 1: ifFind = await Music.findOne(findArtId); break
            case 2: ifFind = await Movie.findOne(findArtId); break
            default: 
            return ifFind = Sentence.findOne(findArtId)
        }
         
        if (!ifFind) throw new Error("找不到该artId")
        // 是否在数据库里
    }
}


module.exports = { 
    PositiveIntValidator, 
    RegisterValidator, 
    TokenValidator, 
    TokenVerifyValidator,
    ReservationValidator,
    LikeValidator
}