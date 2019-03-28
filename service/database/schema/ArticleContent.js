const mongoose = require('mongoose')//引入mongoose
const Schema = mongoose.Schema //声明Schema
let ObjectId = Schema.Types.ObjectId //主键

//创建文章Schema
const articleSchema = new Schema({
    articleId:ObjectId,
    atricleTitle:{type:String},
    atricleDescription:{type:String},
    articleContent:{type:String},
    articleAuthor:{type:String},
    articleType:{type:String},
    readNum:{type:Number,default:0},
    creatAt:{type:Date,default:Date.now()},
    
},{
    collection:'Article'
})

mongoose.model('Article',articleSchema)