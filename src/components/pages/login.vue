<template>

    <div class="login-main" @keyup.enter="axiosLoginUser">
        <h1>登录</h1>
        <mu-container>
            <mu-form ref="form" :model="validateForm" class="mu-demo-form">
                <mu-form-item label="用户名" help-text="帮助文字" prop="userName" :rules="usernameRules">
                    <mu-text-field v-model="validateForm.userName" prop="userName"></mu-text-field>
                </mu-form-item>
                <mu-form-item label="密码" prop="password" :rules="passwordRules">
                    <mu-text-field type="password" v-model="validateForm.password" prop="password"></mu-text-field>
                </mu-form-item>
                <router-link to="/register">
                    <mu-form-item>
                        没有账号？注册鸭!
                    </mu-form-item>
                </router-link>
                
                <mu-form-item>
                    <mu-button color="primary" @click="axiosLoginUser">登录</mu-button>
                    <mu-button @click="clear">重置</mu-button>
                </mu-form-item>
            </mu-form>
        </mu-container>
    </div>
</template>

<script>
import axios from 'axios'
import url from '@/serviceApi.config.js'
import Toast from 'muse-ui-toast'
    export default {
        data() {
            return {
                arrowLogin:null,
                usernameRules:[
                    {validate:(val)=>!!val,message:'必须填写用户名'},
                    {validate:(val)=>val.length>=3,message:'用户名长度大于3'}
                ],
                passwordRules:[
                    {validate:(val)=>!!val,message:'必须填写密码'},
                    {validate:(val)=>val.length>=3&&val.length<=10,message:'密码长度大于3小于10'}
                ],
                agreeRules:[{validate:(val)=>!!val,message:'必须同意用户协议'}],
                validateForm:{
                    userName:'',
                    password:'',
                    isAgree:false
                },
            }
        },
        methods: {
            submit(){
                this.$refs.form.validate().then((result)=>{
                this.arrowLogin = result
                })
            },
            clear(){
                this.$refs.form.clear()
                this.validateForm = {
                    userName:'',
                    password:'',
                    isAgree:false
                }
                Toast.warning('Data has benn Clear!')
            },
            async axiosLoginUser(){
                await this.submit()
                console.log(this.arrowLogin)
                if(this.arrowLogin){
                    axios({
                        url:url.loginUrl,
                        method:'post',
                        data:{
                            userName:this.validateForm.userName,
                            password:this.validateForm.password
                        }
                    }).then((response)=>{
                        console.log(response)
                        if(response.data.code===200&&response.data.message){
                            Toast.success('Login Success')
                            sessionStorage.setItem('userName',this.validateForm.userName)
                            this.$router.push({path:'/Main'})
                        }
                    }).catch((error)=>{
                        console.log(error)
                    })
                }else{
                    Toast.error('验证不成功')
                }
                
            },
        },
    }
</script>

<style scoped>
.mu-demo-form {
  max-width: 480px;
}
.login-main{
    width: 480px;
    height: 480px;
    margin: 0 auto;/*水平居中*/
    top: 50%;
    margin-top: -240px;
}
</style>