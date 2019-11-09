const Router = require('koa-router')
const router = new Router()
const { TokenValidator }  = require('../../validators/validators.js')
const { Success } = require('../../../core/HttpException')
const { LoginType } = require('./../../helpers/enum.js')
const { generateToken } = require('./../../../core/util.js')
const { User } = require('./../../models/user.js')
const { WxManager } = require('./../../services/wx.js')

router.post('/v1/token', async(ctx) => {
        // 先写地址+请求方式
        // 再校验参数 
        // 如果是新增数据 就把数据收集起来用model搞一哈生成一个新实例放进数据库
        // 都没问题了就throw success
        const v = await new TokenValidator().validate(ctx)
        
        // 参数校验完毕
        // 需要根据类型 去再次获取这个用户实例 再生成token返回给他
        const data = v.get('body')
        const type = data.type
        const token = await getUserReturnToken(type, data)
     
        ctx.body = {
            token: token
        }   
    }
)

// 根据不同登录方式获取不同的token
async function getUserReturnToken(type, data) {
    switch (type) {
        case LoginType.ACCPWD_LOGIN:
            break
        case LoginType.WECHAT_LOGIN:
            // 用微信接口返回
            console.log("传递code: " + data.code)
            const openId = await getTokenWechatLogIn(data.code)
            return openId
            break
        case LoginType.MOBILE_LOGIN:
            // 因为在Validator里已经判断过mobile+openid是否正确匹配了
            // 能过validator就说明肯定没问题 所以只用mobile去获取该user就够了
            const user = await User.findOne({ // 所有sequelize的操作都是异步的
                where: {
                    mobile: data.mobile // 看数据库里是否存在
                }
            })
            return getTokenMobileLogIn(user)     
        }
}

// 手机号登录方式
async function getTokenMobileLogIn(user) {
    console.log("user.id: " + user.id)
    const token = await generateToken(user.id, 2)
    console.log("generated: " + token)
    await user.update({
        token: token
    })
    return token
}

async function getTokenWechatLogIn(code) {
    return await WxManager.code2Session(code) // code是前端传来的
}

module.exports = router // 一定不要忘记导出！！