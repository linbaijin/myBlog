const mongoose = require('mongoose')//引入mongoose
const Schema = mongoose.Schema //声明Schema
let ObjectId = Schema.Types.ObjectId //主键

//创建用户Schema
const userSchema = new Schema({
    userId:ObjectId,
    userName:{unique:true,type:String},
    password:{type:String},
    creatAt:{type:Date,default:Date.now()},
    lastLoginAt:{type:Date,default:Date.now()}
},{
    collection:'User'
})

mongoose.model('User',userSchema)