const Koa = require('koa')
const app = new Koa
const mongoose = require('mongoose')
const {connect,initSchemas} = require('./database/init.js')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
let router = new Router()
let user = require('./Api/User.js')

app.use(cors()).use(bodyParser())

mongoose.set('useNewUrlParser', true)//以下3行为修复弃用警告
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)



;(async()=>{
    await connect()
    initSchemas()
})()

//装载所有子路由
router.use('/user',user.routes())
app.use(router.routes()).use(router.allowedMethods())


app.use(async(ctx)=>{
    ctx.body = '<h1>Hello Koa2</h1>'
})


app.listen(3000,()=>{
    console.log('server run at port 3000')
})