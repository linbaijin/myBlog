const Router = require('koa-router')
let router = new Router()
const mongoose = require('mongoose')

//文章发布接口
router.get('/',(ctx)=>{
    ctx.body = 'This is article page'
}).post('/articleRelease',async(ctx)=>{
    console.log(ctx.request.body)
    const Article = mongoose.model('Article')
    let newArticle = new Article(ctx.request.body)
    await newArticle.save().then(()=>{
        ctx.body = {
            code:200,
            message:'发布成功'
        }
    }).catch((error)=>{
        ctx.body = {
            code:500,
            message:error
        }
    })//获取文章大致信息接口
}).post('/getArticleGeneralInfo',async(ctx)=>{
    let pagingSetting = ctx.request.body
    let pageSize = pagingSetting.pageSize//每页显示数量
    let currentPage = pagingSetting.currentPage//当前页数
    const Article = mongoose.model('Article')
    let totalNum =  await Article.find({}).exec()
    const responseInfo = {_id:true,articleTitle:true,articleDescription:true,articleAuthor:true,readNum:true,creatAt:true}//返回内容
    await Article.find({},responseInfo).limit(pageSize).skip((currentPage-1)*pageSize).sort({creatAt:-1}).exec().then((result)=>{
        console.log(result)
        ctx.body = {
            code:200,
            message:result,
            totalNum:totalNum.length
        }
    }).catch((error)=>{
        ctx.body = {
            code:500,
            message:error
        }
    })
}).post('/getArticleMainContent',async(ctx)=>{
    try {
        let articleId = ctx.request.body.articleId
        const Article = mongoose.model('Article')
        let articleContent = await Article.findOne({_id:articleId}).exec()//获取主要内容
        //获取上下篇
        const responseInfo = {_id:true,articleTitle:true}
        let upperChapter = await Article.find({_id:{'$lt':articleId}},responseInfo).sort({_id:-1}).limit(1).exec()//$lt小于操作符
        let lowerChapter = await Article.find({_id:{'$gt':articleId}},responseInfo).sort({_id:1}).limit(1).exec()//$gt大于操作符
        //获取文章作者信息
        let authorUsername = articleContent.authorUsername//作者用户名
        const User = mongoose.model('User')
        const userResponseInfo = {name:true,headpic:true}//要返回的作者信息
        let userInfo = await User.findOne({userName:authorUsername},userResponseInfo).exec()
        ctx.body = {
            code:200,
            message:{
                userInfo:userInfo,
                articleContent:articleContent,
                upperChapter:upperChapter[0],
                lowerChapter:lowerChapter[0],
            }
        }
    } catch (error) {
        ctx.body = {
            code:500,
            message:error
        }
    }
    
}).post('/selectType',async(ctx)=>{//分类接口
    let pagingSetting = ctx.request.body
    console.log(pagingSetting)
    let pageSize = pagingSetting.pageSize//每页显示数量
    let currentPage = pagingSetting.currentPage//当前页数
    let type = pagingSetting.type
    const Article = mongoose.model('Article')
    const responseInfo = {_id:true,articleTitle:true,articleDescription:true,readNum:true,creatAt:true}//返回内容
    await Article.find({articleType:type},responseInfo).limit(pageSize).skip((currentPage-1)*pageSize).sort({creatAt:-1}).exec().then((result)=>{
        ctx.body = {
            code:200,
            message:result,
            totalNum:result.length
        }
    }).catch((error)=>{
        ctx.body = {
            cdoe:500,
            message:error
        }
    })
    
})

module.exports = router