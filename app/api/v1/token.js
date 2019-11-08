const Router = require('koa-router')
const router = new Router()
const { TokenValidator }  = require('../../validators/validators.js')
const { Success } = require('../../../core/HttpException')
const { LoginType } = require('./../../helpers/enum.js')
const { generateToken } = require('./../../../core/util.js')
const { User } = require('./../../models/user.js')

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

async function getTokenMobileLogIn(user) {
    return generateToken(user.id, 2)
}

async function getUserReturnToken(type, data) {
    console.log(data)
    switch (type) {
        case LoginType.ACCPWD_LOGIN:
            break
        case LoginType.WECHAT_LOGIN:
            break
        case LoginType.MOBILE_LOGIN:
            // 微信登录 openid + mobile
            // 去数据库里查找这两项是否匹配
            const user = await User.findOne({ // 所有sequelize的操作都是异步的
                where: {
                    mobile: data.mobile // 看数据库里是否存在
                }
            })
            return getTokenMobileLogIn(user)
              
        }

}

module.exports = router // 一定不要忘记导出！！