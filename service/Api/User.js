const Router = require('koa-router')
let router = new Router()
const mongoose = require('mongoose')

router.get('/',async(ctx)=>{
    ctx.body = 'This is user operation page'
}).post('/register',async(ctx)=>{
    //取得User模型
    const User = mongoose.model('User')
    let newUser = new User(ctx.request.body)
    console.log(ctx.request.body)
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
})

router.post('/login',async(ctx)=>{
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



module.exports = router