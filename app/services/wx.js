const axios = require('axios')
const { AuthFailedException } = require('../../core/HttpException.js')

class WxManager {
    constructor() { }

    static async code2Session(code) {
        const url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' +global.config.wechatSettings.appId + '&secret='
        + global.config.wechatSettings.appSecret + '&js_code=' + code + '&grant_type=authorization_code'
        let openId;
        // await axios.get(url)
        // .then(res => {
        //     console.log(res.status)
        //     openId = res.data.openid
        // })
        // .catch(err => {
        //     console.log(err.errcode)
        //     throw new AuthFailedException('验权失败', err.errcode,)
        // })
        const res = await axios.get(url)
        if (res.status !== 200) throw new AuthFailedException("openid获取失败")
        // 如果code过期或者有任何问题 status依然是200 所以还得再判断errcode
        const data = res.data
        console.log(data)
        console.log("openid api: " + data.openId)
        if (!data.errcode || data.errcode == -1) return data.openid
        else throw new AuthFailedException(data.errmsg, data.errcode)
       
        // return openId
    }
}

module.exports = { WxManager }