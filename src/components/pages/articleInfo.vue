
<template>
        <div id="topics">
        <div class="content">
            
            <div class="article-head">
                <mu-row>
                    <mu-col sm="6" md="6" lg="6">
                        <h1>{{articleTitle}}</h1>
                    </mu-col>
                    <mu-col sm="6" md="6" lg="6">
                        <div class="authorInfo">
                            <mu-avatar size="40px" class="author-headpic">
                                <img :src="authorHeadpic" >
                            </mu-avatar>
                            
                            <div style="float:left;">{{authorName}}</div>
                        </div>
                        <mu-button style="float:right;" flat color="success" @click="goback">返回</mu-button>
                    </mu-col>
                </mu-row>
            </div>
                
            <div class="article-cotent" v-html="articleContent"></div>
        </div>
        <div class="foot">
            <div class="type">分类: {{articleType}}</div>
            <div class="upperAndLower">
                <div v-show="upperArticleId" class="upper" @click="goUpperChapter">上一篇: {{upperArticleTitle}}</div>
                <div v-show="lowerArticleId" class="lower" @click="goLowerChapter">下一篇: {{lowerArticleTitle}}</div>
            </div>
        </div>
    </div>
    
    
</template>



<script>
import axios from 'axios'
import url from '@/serviceApi.config.js'
    export default {
        data() {
            return {
                msg:'1',
                articleId:'',
                articleTitle:'',
                articleContent:'',
                articleType:'',
                upperArticleId:'',
                upperArticleTitle:'',
                lowerArticleId:'',
                lowerArticleTitle:'',
                authorName:'',
                authorHeadpic:''
            }
        },
        activated(){
            this.articleId = this.$route.query.articleId
            this.getArticleContent()
        },
        // async mounted(){
        //     this.articleId = this.$route.query.articleId
        //     await this.getArticleContent()
        //     this.getAuthorInfo()
        //     this.getUpperAndLowerChapter()
            
        // },
        // mounted(){
        //     this.articleId = this.$route.query.articleId
        //     this.getArticleContent()
        //     this.getUpperAndLowerChapter()
        // },
        // watch:{
        //     '$route'(from){
        //         this.articleId = this.$route.query.articleId
        //         this.getArticleContent()
        //     }
        // },
        methods:{
            async getArticleContent(){//获取文章内容并获取作者账号
                console.log(111)
                await axios({
                    url:url.getArticleMainContent,
                    method:'post',
                    data:{
                        articleId:this.articleId
                    }
                }).then((response)=>{
                    console.log(response)
                    let _item = response.data.message
                    this.articleTitle = _item.articleContent.articleTitle
                    this.articleContent = _item.articleContent.articleContent
                    this.articleType = _item.articleContent.articleType
                    this.authorName = _item.userInfo.name
                    this.authorHeadpic = _item.userInfo.headpic
                    if('upperChapter' in _item){
                        this.upperArticleId = _item.upperChapter._id
                        this.upperArticleTitle = _item.upperChapter.articleTitle
                    }else{
                        this.upperArticleId = ''
                    }
                    if('lowerChapter' in _item){
                        this.lowerArticleId = _item.lowerChapter._id
                        this.lowerArticleTitle = _item.lowerChapter.articleTitle
                    }else{
                        this.lowerArticleId = ''
                    }
                }).catch((error)=>{
                    console.log(error)
                })
            },
            goUpperChapter(){
                this.$router.push({path:'/articleInfo',query:{articleId:this.upperArticleId}})
            },
            goLowerChapter(){
                this.$router.push({path:'/articleInfo',query:{articleId:this.lowerArticleId}})
            },
            goback(){
                this.$router.go(-1)
            }
        },
        // beforeRouteEnter (to, from, next) {
        //     this.articleId = this.$route.query.articleId
        // },
        watch:{
            $route(to,from){
                console.log('to',to)
                console.log('from',from)
                this.articleId = this.$route.query.articleId
                this.getArticleContent()
            }
            
        }
    }
</script>

<style scoped>
#topics{
    background: none repeat scroll 0% 0% #ffffff;
    border-radius: 7px;
    box-shadow: 1px 1px 2px #a8a8ad;
    margin-bottom: 15px;
    min-height: 200px;
    overflow: hidden;
    padding: 15px;
    text-overflow: ellipsis;
    word-break: break-all;
}
.article-head{
    font-size: 24px;
    border-bottom: 1px solid #dddddd;
    line-height: 1.5em;
    margin-bottom: 10px;
    padding-bottom: 5px;
    padding-left: 5px;
    max-height: 50px;
}
.authorInfo{
   width: 80%;
   height: 100%;
   margin: 0 auto;
}
.author-headpic{
    width:40px;
    height:40px;
    margin-right: 20px;
    float: left;
}
.article-cotent{
    padding: 20px;
    width: 100%;
    height: auto;
    border-bottom: 1px solid #dddddd
}
.foot{
    margin-top: 20px;
    width: 100%;
    max-height: 40px;
    margin-bottom:20px;
}
.type{
    width: 100%;
    text-align: left;
    height: auto;
    font-size: 14px;
}
.upper{
    float: left;
    font-size: 16px;
    color: #42b983;
    line-height: 1.5rem;
    cursor: pointer;
}
.lower{
    float: right;
    font-size: 16px;
    color: #42b983;
    line-height: 1.5rem;
    cursor: pointer;
}
</style>