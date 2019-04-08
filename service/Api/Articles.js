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
    const responseInfo = {_id:true,articleTitle:true,articleDescription:true,readNum:true,creatAt:true}//返回内容
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
    let articleId = ctx.request.body.articleId
    const Article = mongoose.model('Article')
    await Article.findOne({_id:articleId}).exec().then((result)=>{
        ctx.body = {
            code:200,
            message:result
        }
    }).catch((error)=>{
        ctx.body = {
            code:500,
            message:error
        }
    })
}).post('/getUpperAndLowerChapter',async(ctx)=>{//上下篇接口
    try{
        let articleId = ctx.request.body.articleId
        const Article = mongoose.model('Article')
        const responseInfo = {_id:true,articleTitle:true}
        let upperChapter = await Article.find({_id:{'$lt':articleId}},responseInfo).sort({_id:-1}).limit(1).exec()//$lt小于操作符
        let lowerChapter = await Article.find({_id:{'$gt':articleId}},responseInfo).sort({_id:1}).limit(1).exec()//$gt大于操作符
        ctx.body = {
            code:200,
            message:{upperChapter:upperChapter[0],lowerChapter:lowerChapter[0]}
        }
        // console.log(upperChapter)
        // console.log(lowerChapter)
    }catch(error){
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