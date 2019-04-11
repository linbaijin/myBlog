<template>
    <div class="container">
        <div class="main">
            <div class="personal-centern">
                <h3>个人资料</h3>
            </div>
            <div class="user-info">
                <mu-row gutter>
                    <!-- 头像 -->
                    <mu-col sm="2" md="2" lg="2">
                        <mu-avatar size="100%">
                            <img :src="form.headpicOut">
                        </mu-avatar>
                        <div class="modify-info" @click="openDialog">修改资料</div>
                    </mu-col>
                    <!-- 资料 -->
                    <mu-col sm="10" md="10"  lg="10">
                        <div class="info-cell">
                            <span>ID: {{userName}}</span>
                        </div>
                        <div class="info-cell">
                            <span>昵称: {{form.name}}</span>
                        </div>
                        <div class="info-cell">
                            <span>性别：{{form.sex}}</span>
                        </div>
                    </mu-col>
                </mu-row>
                <mu-dialog title="编辑个人资料" width="360" :open.sync="openScroll">
                    <mu-form :model="form" class="mu-demo-form" label-position="left" label-width="100">
                        <mu-form-item prop="name" label="昵称">
                            <mu-text-field v-model="form.name"></mu-text-field>
                        </mu-form-item>
                        <mu-form-item prop="sex" label="性别">
                            <mu-radio v-model="form.sex" value="Male" label="男"></mu-radio>
                            <mu-radio v-model="form.sex" value="Female" label="女"></mu-radio>
                        </mu-form-item>
                        <mu-form-item prop="headpic" label="头像">
                            <van-uploader class="head-pic-upload" :after-read="onRead">
                                <img ref="head_pic" :src="form.headpicIn" class="head-pic-img">
                            </van-uploader>
                        </mu-form-item>
                    </mu-form>
                    
                    <mu-button flat color="primary" @click="saveUserInfo">OK</mu-button>
                </mu-dialog>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import url from '@/serviceApi.config.js'
import Toast from 'muse-ui-toast'
    export default {
        data() {
            return {
                userName:sessionStorage.getItem('userName'),
                openScroll:false,
                form:{
                    name:'',
                    sex:'',
                    headpicOut:'',
                    headpicIn:'',
                    headpicSend:''
                }
            }
        },
        methods:{
            openDialog(){
                this.openScroll = true
            },
            closeDialog(){
                this.openScroll = false
            },
            getUserInfo(){//获取用户信息
                axios({
                    url:url.getUserInfo,
                    method:'post',
                    data:{
                        userName:this.userName
                    }
                }).then((response)=>{
                    console.log(response)
                    this.form.name = response.data.message.name
                    this.form.headpicOut = response.data.message.headpic
                    this.form.headpicIn = response.data.message.headpic
                    this.form.sex = response.data.message.sex
                    this.userName = response.data.message.userName
                }).catch((error)=>{
                    console.log(error)
                })
            },
            onRead(file,content){
                console.log(file,content)
                //把Fiel对象赋值准备发往后台
                this.form.headpicSend = file.file
                //将原图显示为选择图片
                this.$refs.head_pic.src = file.content
                console.log(this.form.headpicIn)
                // console.log(typeof(this.head_pic))//string
            },
            saveUserInfo(){
                var formdata = new FormData()
                //把数据装进FormData对象
                formdata.append('image',this.form.headpicSend)
                formdata.append('userName',this.userName)
                formdata.append('name',this.form.name)
                formdata.append('sex',this.form.sex)
                console.log(formdata)
                
                axios({
                    url:url.uploadUserInfo,
                    method:'post',
                    data:formdata
                }).then((response)=>{
                    console.log(response)
                    
                    if(response.data.code===200&&response.data.message){
                        this.closeDialog()
                        Toast.info('保存成功')
                        //保存退出更新数据
                        this.getUserInfo()
                    }else{
                        Toast.error('保存失败')
                    }
                }).catch((error)=>{
                    console.log(error)
                    this.closeDialog()
                })
            }
        },
        created(){
            this.getUserInfo()
        }
    }
</script>

<style scoped>
.main{
    background: none repeat scroll 0% 0% #ffffff;
    border-radius: 7px;
    box-shadow: 1px 2px 3px #a7a8ad;
    color: #333331;
    margin-top: 20px;
    min-height: 10px;
    padding: 10px 20px;
    
}
.personal-centern{
    border-bottom: 1px solid  #a7a8ad;
    margin-bottom: 20px;
}
.modify-info{
    text-align: center;
    font-size: 20px;
    color: #3399ea;
    cursor:pointer;
}
.user-info{
    min-width: 20px;
}
.info-cell{
    line-height: 1.5rem;
    width: 100%;
    overflow: hidden;
}
.info-cell span{
    font-size: 16px;
}
.head-pic-upload{
    position: absolute;
    width:28px;
    height:28px;
}
.head-pic-img{
    width:26px;
    height:26px;
    border-radius: 1.8rem;
}
</style>