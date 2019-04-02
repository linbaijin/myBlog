const mongoose = require('mongoose')//引入mongoose
const Schema = mongoose.Schema //声明Schema
let ObjectId = Schema.Types.ObjectId //主键
const bcrypt = require('bcrypt')//加密插件
const SALT_WORK_FACTOR = 10
//创建用户Schema
const userSchema = new Schema({
    userId:ObjectId,
    userName:{unique:true,type:String},
    password:{type:String},
    creatAt:{type:Date,default:Date.now()},
    lastLoginAt:{type:Date,default:Date.now()},
    name:{type:String,default:'Unkonw'},
    sex:{type:String,default:'Unkonw'},
    headpic:{type:String,default:'http://127.0.0.1:3000/defaultHeadpic.png'}
},{
    collection:'User'
})

//逐条加密
userSchema.pre('save',function(next){
    bcrypt.genSalt(SALT_WORK_FACTOR,(err,salt)=>{
        if(err) return next(err)
        bcrypt.hash(this.password,salt,(err,hash)=>{
            if(err) return next(err)
            this.password = hash
            next()
        })
    })
})

userSchema.methods = {
    comparePassword:(_password,password)=>{
        return new Promise((resolve,reject)=>{
            bcrypt.compare(_password,password,(err,isMath)=>{
                !err?resolve(isMath):reject(err)
            })
        })
    }
}

//发布模型
mongoose.model('User',userSchema)