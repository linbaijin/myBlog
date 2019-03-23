<template>
<div>
      
        <!-- 导航栏 -->
        <div class="container">
          <mu-row>
          <mu-col  sm="4" md="4" lg="4"><div class="blog-title"><span>myBlog</span></div></mu-col>
          <mu-col sm="8" md="8" lg="8">
            <div class="nav-button">
            <mu-button flat large color="primary">Linux</mu-button>
            <mu-button flat large color="secondary">Python</mu-button>
            <mu-button flat large color="success">Java</mu-button>
            <mu-button flat large color="warning">JavaScript</mu-button>
            </div>
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
                      <img src="./assets/qianxun.png">
                    </figure>
                  </h2>
                  <h2 class="blog-subtitle">
                    <figure class="transistion">
                      <img src="./assets/qianxuntext.png">
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
                    <img src="./assets/longmao.png">
                  </a>
                </div>
              </div>
            </mu-col>
            
          </div>
          
        </mu-row>
   
</div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scope>
.nav-button{
  float:right;
  margin-right: 30px;
  font-size: 26px;
}
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
.blog-subtitle{
  
}
.fade-area{
  width: 100%;
  -webkit-animation: fadeIn .5s ease-in-out;
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
</style>
