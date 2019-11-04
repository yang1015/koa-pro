const Koa = require('koa')
const axios = require('axios')
const InitManager = require('./core/InitManager') // 引入类
const parser = require('koa-bodyparser') // 接口中取body需要依赖中间件
const HandleException = require('./middlewares/HandleException.js')

const app = new Koa(); // 应用程序对象 有很多中间件

require('./app/models/user.js')

app.use(parser()) // ctx.body插件
app.use(HandleException)

InitManager.initCore(app) // 使用类的静态方法来初始化core

app.listen(1112)


