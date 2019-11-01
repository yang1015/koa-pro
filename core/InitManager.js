const requirDirectory = require('require-directory')
const Router = require('koa-router')

class InitManager {
    static initCore(app) {
        // app从需要初始化的地方传进来(app.js)
        InitManager.initRouters(app)
    }

    static initRouters(app) {
        var path = `${process.cwd()}/app/api`
        // 自动加载每一个路由模块
        const modules = requirDirectory(module, path, {
            visit: (obj) => {
                 // 只注册确定是Router类型的对象 
                if (obj instanceof Router) app.use(obj.routes())
            }
        })
    }
}

module.exports = InitManager