//导入 express 模块
const express = require('express')
//创建服务器实例
const app = express()

//导入cors中间件
const cors = require('cors')
//将cors注册为全局
app.use(cors())

//配置解析 application/x-www-form-urlencoded 的中间件 内置中间件
app.use(express.urlencoded({
    extended: false
}))

//响应数据的中间件 优化代码
app.use((req, res, next) => {
    // status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
    res.cc = function (err, status = 1) {
        res.send({
            status: status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})

// 导入配置文件
const config = require('./config')
// 解析 token 的中间件
const expressJWT = require('express-jwt')
// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(expressJWT({secret:config.jwtSecretKey}).unless({path:[/^\/api\//]}))

//导入路由模块用户注册登录模块
const userRouter = require('./router/user')
//注册为事件
app.use('/api', userRouter)

//导入并使用用户信息路由模块
const userinfoRouter  = require('./router/userinfo')
// 注意：以 /my 开头的接口，都是有权限的接口，需要进行 Token 身份认证
app.use('/my',userinfoRouter)


//错误中间件
const joi = require('@hapi/joi')
app.use(function (err,req,res,next) {
    //数据验证失败
    if (err instanceof joi.ValidationError) return res.cc(err)
    // 捕获身份认证失败的错误
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
    //未知错误
    res.cc(err)
})

//启动服务器
app.listen(3007, () => {
    console.log('http://localhost:3007');
})