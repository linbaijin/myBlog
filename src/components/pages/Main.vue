<template>
<div>
      
        <!-- 导航栏 -->
        <div class="container">
          <mu-row>
          <mu-col  sm="4" md="4" lg="4">
            <router-link to="/Main">
            <div class="blog-title"><span style="color:black;">Welcome home!</span>
            </div>
            </router-link>
            </mu-col>
          <mu-col sm="8" md="8" lg="8">
            <keep-alive>
              <navbutton></navbutton>
            </keep-alive>
          </mu-col>
          </mu-row>
        </div>
        
        <!-- 导航栏结束 -->

        <!-- 龙猫 -->
        <mu-row style="margin:30px;">
          <div class="fade-area">
            <div class="container">
              <mu-col sm="12" md="12" lg="12">
                <div class="transistion">
                  <h2 class="llfc-blog">
                    <figure class="transistion">
                      <img src="../../assets/qianxun.png" style="width:100%">
                    </figure>
                  </h2>
                  <h2 class="blog-subtitle">
                    <figure class="transistion">
                      <img src="../../assets/qianxuntext.png" style="width:100%">
                    </figure>
                  </h2>
                </div>
              </mu-col>
            </div>
            
          </div>

          <div class="fade-area">
            <mu-col sm="12" md="12" lg="12">
              <div class="homepic-area">
                <div id="homepic" class="hvr-bob">
                  <a href="#">
                    <img src="../../assets/longmao.png">
                  </a>
                </div>
              </div>
            </mu-col>
            
          </div>
          
        </mu-row>
        <!-- 龙猫结束 -->

        <!-- 下方文章主体 -->
        <div id="home">
          <div id="main">
            <div id="main-content">
              <mu-row gutter>
                <!-- 下方左侧 -->
                <mu-col sm="12" md="2" lg="2">
                  <div id="left-main">
                    <div class="personal-info">
                      <div class="head-pic">
                        <img id="head-pic" src="../../assets/headpic.jpg" class="img">
                      </div>
                      
                      <div class="text-box">
                      那一天的河川
                      宛若封存了千年的故事
                      不由自主的穿过了幽幽的隧道
                      忽然的瞬间在那久弃的教堂
                      我看见阳光亘古不变透过彩璃窗
                      蓝天 白云 青草 旧屋 微风
                      一切都静逸不变仿佛时光静止
                      </div>                      
                    </div>

                    <div id="subtitle">
                      <div id="subtitlelist" class="sub-list">
                        <ul>
                          <li v-for="(item,index) in typeList" :key="index" @click="selectType(item)"><p>{{item}}</p></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </mu-col>
                <!-- 下方右侧 -->
                <mu-col sm="12" md="9" lg="9">
                      <transition :name="transitionName">
                        <keep-alive>
                          <router-view></router-view>
                        </keep-alive>
                      </transition>
                </mu-col>
              </mu-row>
            </div>
          </div>
        </div>

    
        

</div>
</template>

<script>
import axios from 'axios'
import url from '@/serviceApi.config.js'
import Toast from 'muse-ui-toast'
import navbutton from '@/components/component/nav-button'
export default {
  data() {
    return {
      typeList:['Linux','Java','C++','Python','JavaScript','RegExp正则','Vue','React','Node'],
      transitionName:''
    }
  },

  components:{
    navbutton
  },
  methods:{
    selectType(type){
      this.$router.push({path:'/selectArticle',query:{type:type}})
    },
  },
  watch:{
    $route(to,from){
      console.log('to',to)
      console.log('from',from)
      if(to.path==='/articleInfo'){
        this.transitionName = "slide-right"
      }else if(from.path==='/main'){
        this.transitionName = "slide-left"
      }                
    }     
  }
}
</script>

<style scope>

.blog-title{
  font-size: 32px;
  margin-left: 30px;
}
.title-area{
  width: 100%;
}
.llfc-blog{
  margin-top: 10px;
  margin-bottom: 20px;
}
.transistion{
  transition: all .5s  ease-in-out
}
h2 figure{
  max-width: 350px;
  margin: 0 auto;
  position: relative;
}
h2 figure img {
    width: 100%;
    display: inline-block;
}
/* .blog-subtitle{
  
} */
.fade-area{
  width: 100%;
  /* -webkit-animation: fadeIn .5s ease-in-out; */
  transition: fadeIN .5s ease-in-out;
}
.homepic-area{
  width: 100%
}
#homepic{
  margin: 0 auto;
  max-width: 800px;
  overflow: hidden;
}
#homepic img{
  width: 100%;
  max-width: 800px !important;
}
@keyframes hvr-bob-float{
  100%{
    -webkit-transform: translateY(-8px);
    transform: translateY(-8px)
  }
}
@keyframes hvr-bob{
  0%{
    -webkit-transform: translateY(-8px);
    transform: translateY(-8px);
  }
  50%{
    -webkit-transform: translateY(-4px);
    transform: translateY(-4px);
  }
  100%{
    -webkit-transform: translateY(-8px);
    transform: translateY(-8px);
  }
}
.hvr-bob{
  vertical-align: middle;
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0,0,0,0);
  animation-name: hvr-bob-float,hvr-bob;
  animation-duration: .3s,1.5s;
  animation-delay: 0s,.3s;
  animation-timing-function: ease-out,ease-in-out;
  animation-iteration-count: 1,infinite;
  animation-fill-mode: forwards;
  animation-direction: normal,alternate;
}
#home{
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 auto;
}
#main{
  overflow: hidden;
  padding: 20px 6% 10px 6%;
  position: relative;
}
#main-content{
  width: 100%;
  height: 100%;
}
#left-main{
  width: 100%;
  height: auto;
}
.personal-info{
  width: 100%;
  height: 30%;
  background: none repeat scroll 0% 0% #fafcfd;
  border-radius: 7px;
  box-shadow: 1px 1px 2px #a7a8ad;
  line-height: 23px;
  margin-bottom: 15px;
  padding: 10px;
  text-indent: 0px;
}
#head-pic{
  transition: all .6s;
}
.text-box{
  width: 100%;
  overflow: hidden;
  color: #46241b;
  text-overflow: ellipsis;
  white-space:normal;
}
.img{
  width: 100%;
  border-radius: 50%;
  animation: arr 8s infinite normal linear;
}
@keyframes arr{
  from{
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg);
  }
}
.head-pic{
  width: 100%;
}
#subtitle{
  width: 100%;
  height: auto;
}
.sub-list{
  width: 100%;
  height: auto;
  background: none repeat scroll 0% 0% #fafcfd;
  border-radius: 7px;
  box-shadow: 1px 1px 2px #a7a8ad;
  margin-bottom: 15px;
  overflow: hidden;
}
p{
  padding: 0;
  margin: 0;
}
.sub-list ul li{
  font-family: Microsoft YaHei, arial, serif;
  font-size: 20px;
  height: 18%;
  width: 100%;
  list-style: none;
  border-bottom: 1px solid #dadfe1;
  padding: 10px 5px;
  text-indent: 1em;
  padding: 10px 5px;
}
.sub-list ul li:last-child{
  border-bottom: 0;
}
#subtitlelist ul{
  width: 100%;
  padding: 0;
  line-height: 1.5;
}
#subtitlelist ul li p:hover{
  cursor: pointer;
  color: #42b983;
  width: 100%;
  height: auto;
  animation: subtitle_li .7s ease-in-out .5s infinite normal
}
@keyframes subtitle_li{
  0%{
    transform: scale(0.9);
  }
  100%{
    transform: scale(1);
  }
}

.position-view{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 1000ms;
}

.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-to {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-to {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

</style>
