const Koa = require('koa')
const app = new Koa
const mongoose = require('mongoose')
const {connect,initSchemas} = require('./database/init.js')
const Router = require('koa-router')
const koaBody = require('koa-body')
const cors = require('koa2-cors')
const static = require('koa-static')
const staticPath = '/public/uploadImg'
let router = new Router()
let user = require('./Api/User.js')//用户接口
let articles = require('./Api/Articles.js')//文章上传接口
let upload = require('./Api/uploadImg')
let path = require('path')
let getUploadFileExt = require('./getUploadFileExt.js')
let getUploadFileName = require('./getUploadFileName.js')

app.use(cors())
app.use(koaBody({
    multipart:true,
    formidable:{
        // uploadDir:path.join(__dirname,'public/uploadImg'),
        keepExtensions:true,
        maxFieldsSize:500*1024*1024,
        onFileBegin:(name,file)=>{
            const dirName = '/public/uploadImg/'
            const dir = path.join(__dirname,dirName)
            const ext = getUploadFileExt(file.name)
            file.path = dir + getUploadFileName(ext)
            // console.log(file.path)
        }
    }
}))
app.use(static(
    path.join(__dirname,staticPath)
))


mongoose.set('useNewUrlParser', true)//以下3行为修复弃用警告
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)



;(async()=>{
    await connect()
    initSchemas()
})()

//装载所有子路由
router.use('/user',user.routes())
router.use('/article',articles.routes())
router.use('/upload',upload.routes())
app.use(router.routes()).use(router.allowedMethods())


app.use(async(ctx)=>{
    ctx.body = '<h1>Hello Koa2</h1>'
})


app.listen(3000,()=>{
    console.log('server run at port 3000')
})