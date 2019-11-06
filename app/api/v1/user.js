const { 
    HttpException,
    ParameterException
 } = require('../../../core/HttpException.js') 


const {
    PositiveIntValidator,
    RegisterValidator
} = require('../../validators/validators.js')

const Router = require('koa-router')
const router = new Router({
    prefix: '/v1/user'
});

const { User } = require('../../models/user.js')


router.post('/register', async (ctx) => {
    // 路径
    // 校验参数是否正确
    // { nickname, openid, mobile, avatarUrl, }
   
    // RegisterValidator相当于守门员 如果上面没有收住 企图将重复数据插入数据库 那么数据库就会报错
    // 在使用自定义validator的时候 里面也可能会自定义异步的操作 所以这里要await
    const res = await new RegisterValidator().validate(ctx) 

    // 如果上面报错 直接就throw了 不要担心
  

    const newUser = {
        openid: res.get('body.openid'),
        nickname: res.get('body.nickname'),
        mobile: res.get('body.mobile'),
        age: res.get('body.age'),
        city: res.get('body.city'),
        avatarurl: res.get('body.avatarurl')
    } 
    let u = await User.create(newUser) // 不加await 返回的是一个promise 加await是对表达式求值
    ctx.body = '没毛病'
    // 返回ctx.body
})

module.exports = router 





// router.post('/v1/:id/user', (ctx, next) => {
// //   const id = ctx.params;
//   const query = ctx.request.query // 问号?后面的部分
//   const headers = ctx.request.header
//   const body = ctx.request.body

//   const res = new PositiveIntValidator().validate(ctx)
//   const id = res.get('path.id', parsed = false) 
 
//     // 这样的写法不可
//     //   const error = {
//     //       errorCode: 1234,
//     //       message: 'user接口挂了'
//     //   }
//     //   throw new Error(error)

//     // 手动创建
//     // const error = new Error('user报错')
//     // error.errorCode = 1234
//     // error.status = 400
//     // error.requestUrl = `${ctx.method} ${ctx.path}`
//     // throw Error(error)

//     // 使用类exception创建
//     // throw new ParameterException(400, 1234, 'user报错啦')
// })