const Koa = require('koa')
const axios = require('axios')
const parser = require('koa-bodyparser') // 接口中取body需要依赖中间件

const InitManager = require('./core/InitManager') // 引入类
const HandleException = require('./middlewares/HandleException.js')

const app = new Koa(); // 应用程序对象 有很多中间件

app.use(parser()) // ctx.body插件 方便post方法直接获取body内容
app.use(HandleException) // 使用自定义的处理异常拦截中间件

InitManager.initCore(app) // 使用类的静态方法来初始化core

app.listen(1112)


