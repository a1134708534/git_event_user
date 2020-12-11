// 导入 express
const express = require('express')
// 创建路由对象
const router = express.Router()

//获取用户基本信息
router.get('/userinfo',(req,res)=>{
    res.send('ok')
})

//向外共享
module.exports = router