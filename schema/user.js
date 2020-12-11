//新建用户信息验证模块
const joi = require('@hapi/joi')


//用户的验证规则
const username = joi.string().alphanum().min(1).max(10).required()
//密码验证规则
const password = joi.string().pattern(/^[\S]{6,12}$/).required()

//注册登录表单的验证规则对象

exports.reg_login_schema = {
    // 表示需要对 req.body 中的数据进行验证
    body: {
        username,
        password,
    },
}