<template>

    <div class="register-main">
        <h1>注册</h1>
        <mu-container>
            <mu-form ref="form" :model="validateForm" class="mu-demo-form">
                <mu-form-item label="用户名" help-text="帮助文字" prop="userName" :rules="usernameRules">
                    <mu-text-field v-model="validateForm.userName" prop="userName"></mu-text-field>
                </mu-form-item>
                <mu-form-item label="密码" prop="password" :rules="passwordRules">
                    <mu-text-field type="password" v-model="validateForm.password" prop="password"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="isAgree" :rules="agreeRules">
                    <mu-checkbox label="同意用户协议" v-model="validateForm.isAgree"></mu-checkbox>
                </mu-form-item>
                <mu-form-item>
                    <mu-button color="primary" @click="axiosRegisterUser">提交</mu-button>
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
                checkUsernameMsg:'',
                arrowRegist:null,
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
                    this.arrowRegist = result
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
            async checkUsername(){//检查用户名是否已存在
                await this.submit()
                if(this.arrowRegist){
                    axios({
                        url:url.checkUsername,
                        method:'post',
                        data:{
                            userName:this.validateForm.userName
                        }
                    }).then((response)=>{
                        if(response.data.message==="当前用户名可以注册"){
                            this.checkUsernameMsg = response.data.message
                        }
                    }).catch((error)=>{
                        console.log(error)
                    })
                }
            },
            async axiosRegisterUser(){
                await this.submit()
                console.log(this.arrowRegist)
                if(this.arrowRegist){
                    axios({
                        url:url.registerUrl,
                        method:'post',
                        data:{
                            userName:this.validateForm.userName,
                            password:this.validateForm.password
                        }
                    }).then((response)=>{
                        console.log(response)
                        if(response.data.code===200&&response.data.message){
                            Toast.success('Register Success')
                        }
                    }).catch((error)=>{
                        console.log(error)
                    })
                }else{
                    Toast.error('验证不成功')
                }
                
            },
        }
    }
</script>

<style scoped>
.mu-demo-form {
  max-width: 480px;
}
.register-main{
    width: 480px;
    height: 480px;
    margin: 0 auto;/*水平居中*/
    position: relative;
    top: 50%;
    margin-top: -240px;
}
</style>