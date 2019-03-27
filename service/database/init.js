const mongoose = require('mongoose')
const db = "mongodb://localhost/myBlogDb"
const glob = require('glob') //node的glob模块允许你使用 * 等符号，来写一个glob规则，像在shell里一样，获取匹配对应规则文件
const {resolve} = require('path')// 将一系列路径或路径段解析为绝对路径

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

exports.initSchemas = ()=>{
    glob.sync(resolve(__dirname,'./schema/','**/*.js')).forEach(require)
}