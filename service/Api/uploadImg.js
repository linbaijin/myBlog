const Router = require('koa-router')
const router = new Router()
const mongoose = require('mongoose')


router.post('/uploadImg',(ctx)=>{//文章图片上传接口
    let reg = /([^\\]+)$/ //取最后一个\后的内容
    let uploadedPath = ctx.request.files.image.path.match(reg)[1]
    ctx.body = {
        code:200,
        message:'上传成功',
        path:'http://127.0.0.1:3000/'+uploadedPath
    }
})


module.exports = router

