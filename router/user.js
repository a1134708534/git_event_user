//创建 express 
const express = require('express')
//创建路由对象
const router = express.Router()

//导入路由处理函数
const userHandler = require('../router_handler/user')

//导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')

//导入需要验证的规则对象
const {reg_login_schema} = require('../schema/user.js')

//注册
router.post('/reguser',expressJoi(reg_login_schema),userHandler.regUser)

//登录
router.post('/login',expressJoi(reg_login_schema),userHandler.login)

//将路由对象共享出去
module.exports = router