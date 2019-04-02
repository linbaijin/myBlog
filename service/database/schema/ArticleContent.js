const mongoose = require('mongoose')//引入mongoose
const Schema = mongoose.Schema //声明Schema
let ObjectId = Schema.Types.ObjectId //主键

function formDate(dt){
    if(!dt){
        dt = new Date()
    }
    var year = dt.getFullYear()
    var month = dt.getMonth()+1
    var date = dt.getDate()
    var hours = dt.getHours()
    var minute = dt.getMinutes()
    if(month<10){
        month = '0'+month
    }
    if(date<10){
        date = '0'+date
    }
    if(minute<10){
        minute = '0'+minute
    }
    return year + '-' + month + '-' + date + ' ' + hours + ':' + minute
}//获取时间函数

//创建文章Schema
const articleSchema = new Schema({
    articleId:ObjectId,
    articleTitle:{type:String},
    articleDescription:{type:String},
    articleContent:{type:String},
    articleAuthor:{type:String},
    articleType:{type:String},
    readNum:{type:Number,default:0},
    creatAt:{type:String,default:formDate()},
    
},{
    collection:'Article'
})

mongoose.model('Article',articleSchema)