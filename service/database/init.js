const mongoose = require('mongoose')
const db = "mongodb://localhost/myBlogDb"

exports.connect = ()=>{
    //连接数据库
    mongoose.connect(db,{useNewUrlParser:true})
    let maxConnectTimes = 0
    return new Promise((resolve,reject)=>{
        mongoose.connection.on('disconnect',()=>{
            console.log('**************数据库连接断开**************')
            if(maxConnectTimes<3){
                maxConnectTimes++
                mongoose.connect(db,{useNewUrlParser:true})
            }else{
                reject()
                throw new Error('数据库出现问题，请人为修复')
            }
        })

        mongoose.connection.on('error',err=>{
            console.log('********数据库错误********')
            if(maxConnectTimes<3){
                maxConnectTimes++
                mongoose.connect(db,{useNewUrlParser:true})
            }else{
                reject()
                throw new Error('数据库出现问题，请人为修复')
            }
        })

        //链接打开时
        mongoose.connection.once('open',()=>{
            console.log('MongoDb connected successfully')
            resolve()
        })
    })
}