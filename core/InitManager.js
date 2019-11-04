const requirDirectory = require('require-directory')
const Router = require('koa-router')

class InitManager {
    static initCore(app) {
        // app从需要初始化的地方传进来(app.js)
        InitManager.app = app
        InitManager.initRouters()
        InitManager.loadConfig()
    }

    static initRouters() {
        var path = `${process.cwd()}/app/api`
        // 自动加载每一个路由模块
        const modules = requirDirectory(module, path, {
            visit: (obj) => {
                 // 只注册确定是Router类型的对象 
                if (obj instanceof Router) InitManager.app.use(obj.routes())
            }
        })
    }

    // 加载config配置 并将配置存在global里待用
    // configPath的地址单独写出来是为了确保当当前文件被移动到别的地方的时候，引用也不会报错
    static loadConfig(path='') {
        const configPath = path || process.cwd() + '/config/config.js' 
        const config = require(configPath)
        global.config = config
    }
}

module.exports = InitManager