<template>
    <div class="nav-button">
        <ul v-if="isSignIn">
            <!-- 头像 -->
            <li class="userInfo-li">
                <mu-menu palcement="bottom-end" open-on-hover>
                    <mu-avatar size="40">
                        <img :src="headpic" style="width:100%">
                    </mu-avatar>
                    <mu-list slot="content">
                        <router-link to="/userInfo">
                            <mu-list-item button>
                            <mu-list-item-title>个人中心</mu-list-item-title>
                        </mu-list-item>
                        </router-link>
                        <mu-list-item button @click="signOut">
                            <mu-list-item-title>退出登录</mu-list-item-title>
                        </mu-list-item>
                    </mu-list>
                </mu-menu>
            </li>
            <li class="userInfo-li">
                <span>{{name}}</span>
            </li>
            <li>
                
                    <mu-button @click="goEditor" flat color="error">写博客!</mu-button>
                
                
            </li>
            <!-- <li>
                <mu-badge content="12" badge-class="new-reminder" circle color="secondary">
                    <mu-button icon>
                        <mu-icon size="16" value="floder"></mu-icon>
                    </mu-button>
                </mu-badge>
            </li> -->
        </ul>
        <router-link v-else to="/login">
            <mu-button  flat color="primary">请登录</mu-button>
        </router-link>
        
    </div>
</template>

<script>
import axios from 'axios'
import url from '@/serviceApi.config.js'
    export default {
        data() {
            return {
                msg: '1',
                headpic:'',
                name:'',
                userName:'',
                isSignIn:false//登录状态
            }
        },
        methods:{
            getUserInfo(){//主页用户信息组件获取用户信息
                axios({
                    url:url.getUserInfo,
                    method:'post',
                    data:{
                        userName:sessionStorage.getItem('userName')
                    }
                }).then((result)=>{
                    this.headpic = result.data.message.headpic,
                    this.name = result.data.message.name,
                    this.userName = result.data.message.userName
                })
            },
            signOut(){
                sessionStorage.removeItem('userName')
                // console.log(sessionStorage.getItem('userName'))
                this.isSignIn = false
            },
            isLogin(){
                // console.log(sessionStorage.getItem('userName'))
                sessionStorage.getItem('userName')?this.isSignIn=true:this.isSignIn=false
                // console.log('signIn',this.isSignIn)
            },
            goEditor(){
                this.$router.push({path:'/editor',query:{authorName:this.name}})
            }
        },
        activated(){
            this.isLogin()
            if(this.isSignIn){
                this.getUserInfo()
            }
            
        },
        created(){
            this.isLogin()
        }
    }
</script>

<style scoped>
.nav-button{
  padding-left: 20px;
  font-size: 26px;
  width: 50%;
  float: right;
}
.userInfo-li{
    color: #c2a7dd;
    font-size: 20px;
    margin: 8px 10px;
    min-width: 36px;
}
.new-reminder{
    max-width: 50px;
    font-size: 16px;
}
ul{
    margin: 0;
}
.nav-button ul li{
    list-style: none;
    float: left;
    display: block;
    height: 100%;
}
</style>