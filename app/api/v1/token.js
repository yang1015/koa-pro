const Router = require('koa-router')
const router = new Router({
    prefix: '/v1/token'
})
const { TokenValidator, TokenVerifyValidator }  = require('../../validators/validators.js')
const { Success } = require('../../../core/HttpException')
const { LoginType } = require('./../../helpers/enum.js')
const { generateToken } = require('./../../../core/util.js')
const { User } = require('./../../models/user.js')
const { WxManager } = require('./../../services/wx.js')
const { Auth } = require('../../../middlewares/auth.js')

router.post('/', async(ctx) => {
        // 先写地址+请求方式
        // 再校验参数 
        // 如果是新增数据 就把数据收集起来用model搞一哈生成一个新实例放进数据库
        // 都没问题了就throw success
        const v = await new TokenValidator().validate(ctx)
        
        // 参数校验完毕
        // 需要根据类型 去再次获取这个用户实例 再生成token返回给他
        const data = v.get('body')
        const type = data.type
        const token = await getToken(type, data)
     
        ctx.body = {
            token: token
        }   
    }
)

router.post('/verify', async(ctx) => {
    const v = await new TokenVerifyValidator().validate(ctx)
    // 如果这个是get方法的话 参数不能用body.xx这种
    const token = v.get('body.token')
    const res = await Auth.verifyToken(token)
    ctx.body = {
        isValid: res
    }
})

// 根据不同登录方式获取不同的token
async function getToken(type, data) {
    switch (type) {
        case LoginType.ACCPWD_LOGIN:
            break
        case LoginType.WECHAT_LOGIN: // 用微信接口返回
            console.log(Auth.USER)
            const openId = await WxManager.code2OpenId(data.code) // 前端发来的code去获取openId

            // 用获取的openId来新建openId和token的匹配或是更新
            let user = await User.getUserByOpenId(openId) // 拿到openId所以应的这个用户
              // 这里存在这个user不存在的情况
            if (!user) user = await User.registerNewUserByOpenId(openId)
            return await generateToken(user.id, Auth.USER) // 给这个用户当前登陆生成token令牌(id, )
            break
        case LoginType.MOBILE_LOGIN:
            // 因为在Validator里已经判断过mobile+openid是否正确匹配了
            // 能过validator就说明肯定没问题 所以只用mobile去获取该user就够了
            const mobileUser = await User.getUserByMobile(mobile)
            return await generateToken(mobileUser.id, 2)
        }
}

module.exports = router // 一定不要忘记导出！！