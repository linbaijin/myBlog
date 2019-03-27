const Koa = require('koa')
const app = new Koa
const mongoose = require('mongoose')
const {connect,initSchemas} = require('./database/init.js')
mongoose.set('useNewUrlParser', true)//以下3行为修复弃用警告
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

;(async()=>{
    await connect()
    initSchemas()
    const User = mongoose.model('User')
    const Article = mongoose.model('Article')
    // let oneUser = new User({userName:'lllbbbbjjj',password:'123456'})
    // console.log('111')
    // oneUser.save().then(()=>{
    //     console.log('111')
    //     console.log('插入成功')
    // })
    let oneArticle = new Article({atricleTitle:'afsdf',
        atricleDescription:'fsdfsdfdgbfdugbdfigbfidgbgbdfgbfdu',
        articleContent:'dasdasfrgegergveerefjbkbuibubsicsdcsdcsdcscscscdsc',
        articleAuthor:'lllbbbjjj',
        articleType:'Linux',
        readNum:1})
        oneArticle.save().then(()=>{
            console.log('插入文章成功')
        })
    let users = await User.findOne().exec()
    console.log(users)
})()
app.use(async(ctx)=>{
    ctx.body = '<h1>Hello Koa2</h1>'
})

app.listen(3000,()=>{
    console.log('server run at port 3000')
})