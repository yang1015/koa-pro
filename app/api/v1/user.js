const { 
    HttpException,
    ParameterException
 } = require('../../../core/HttpException.js') 

const Router = require('koa-router')
const router = new Router();


router.post('/v1/:id/user', (ctx, next) => {
  const id = ctx.params;
  const query = ctx.request.query // 问号?后面的部分
  const headers = ctx.request.header
  const body = ctx.request.body


// 这样的写法不可
//   const error = {
//       errorCode: 1234,
//       message: 'user接口挂了'
//   }
//   throw new Error(error)

    // const error = new Error('user报错')
    // error.errorCode = 1234
    // error.status = 400
    // error.requestUrl = `${ctx.method} ${ctx.path}`
    // throw Error(error)
    throw new ParameterException(400, 1234, 'user报错啦')
})

module.exports = router 
