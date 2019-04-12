const Router = require('koa-router')
let router = new Router()
const mongoose = require('mongoose')

router.get('/',async(ctx)=>{
    ctx.body = 'This is user operation page'
}).post('/register',async(ctx)=>{//注册接口
    //取得User模型
    let registerUser = ctx.request.body
    const User = mongoose.model('User')
    let newUser = new User(registerUser)
    console.log(newUser)
    await User.findOne({userName:registerUser.userName}).exec().then(async(result)=>{
        if(result){
            ctx.body = {
                code:200,
                message:'账号已存在'
            }
        }else{
            await newUser.save().then(()=>{
                ctx.body = {
                    code:200,
                    message:'Regist Success'
                }
            }).catch((error)=>{
                ctx.body = {
                    code:500,
                    message:error
                }
            })
        }
    })


}).post('/checkUsername',async(ctx)=>{//检查用户名是否存在接口
        //取得User模型
        const User = mongoose.model('User')
        let newUser = new User(ctx.request.body)
        console.log(ctx.request.body)
        await newUser.findOne({userName:ctx.request.boy.userName}).exec().then((result)=>{
            if(result){
                ctx.body = {
                    code:200,
                    message:'账号已存在'
                }
            }else{
                ctx.body = {
                    code:200,
                    message:'当前用户名可以注册'
                }
            }
    })
})


router.post('/login',async(ctx)=>{//登录接口
    let loginUser = ctx.request.body
    console.log(loginUser)
    let userName = loginUser.userName
    let password = loginUser.password
    //引入User的model
    const User = mongoose.model('User')
    await User.findOne({userName:userName}).exec().then(async(result)=>{
        if(result){
            //用户名存在开始比对密码
            let newUser = new User()
            await newUser.comparePassword(password,result.password).then((isMath)=>{
                ctx.body = {code:200,message:isMath}
            }).catch((error)=>{
                ctx.body = {code:500,message:'密码错误'}
            })
        }else{
            ctx.body = {code:500,message:result}
        }
    }).catch((error)=>{
        ctx.body = {code:500,message:error}
    })
})

//获取用户信息接口
router.post('/getUserInfo',async(ctx)=>{
    let loginUser = ctx.request.body
    console.log(loginUser)
    let userName = loginUser.userName
    console.log(userName)
    const User = mongoose.model('User')
    const responseInfo = {name:true,sex:true,headpic:true,userName:true}
    await User.findOne({userName:userName},responseInfo).exec().then((result)=>{
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
})

//用户上传信息接口(包括用户上传的头像)
router.post('/uploadUserInfo',async(ctx)=>{
    let loginUser = ctx.request.body
    const User = mongoose.model('User')
    let reg = /([^\\]+)$/ //取最后一个\后的内容
    console.log('ddd',ctx.request.body)
    console.log('file',ctx.request.files)
    let uploadedPath = ctx.request.files.image.path.match(reg)[1]
    let serviceUrl = 'http://127.0.0.1:3000/'
    uploadInfo = {name:loginUser.name,sex:loginUser.sex,headpic:serviceUrl+uploadedPath}
    await User.findOneAndUpdate({userName:loginUser.userName},{$set:uploadInfo},{new:true}).exec().then((result)=>{
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
})


module.exports = router