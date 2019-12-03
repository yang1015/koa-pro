const axios = require('axios')
const { AuthFailedException } = require('../../core/HttpException.js')
const { User } = require('../models/user.js')

class WxManager {
    constructor() { }

    static async code2OpenId(code) {
        const url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + global.config.wechatSettings.appId + '&secret='+ global.config.wechatSettings.appSecret + '&js_code=' + code + '&grant_type=authorization_code'
        const res = await axios.get(url)
        if (res.status !== 200) throw new AuthFailedException("openid获取失败")
      
        const data = res.data
        let openId
         // 如果code过期或者有任何问题 status依然是200 所以还得再判断errcode
        if (!data.errcode || data.errcode == -1) openId = data.openid
        else throw new AuthFailedException(data.errmsg, data.errcode)

        // 判断openId这个User是否存在 不存在就新增
        const user = User.getUserByOpenId(openId)

        // 如果这个openId没有过用户 就注册
        if (!user) await User.registerNewUserByOpenId(openId) // 不加await 返回的是一个promise 加await是对表达式求值
     
        return openId
    }

    // static async getAccessToken() {
    //     let url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + global.config.wechatSettings.appId
    //     + '&secret=' + global.config.wechatSettings.appSecret
        
    //     const res = await axios.get(url)
    //     if (res.status !== 200) throw new AuthFailedException("token获取失败")
    //     const data = res.data
    //     console.log(data)
    //     if (!data.errcode || data.errcode == 0) return data.access_token
    //     else throw new AuthFailedException(data.errmsg, data.errcode)
    // }
}

module.exports = { WxManager }