
<template>
    
        <div id="topics">
        <div class="content">
            <div class="article-title">{{articleTitle}}</div>
            <div class="article-cotent" v-html="articleContent">
            </div>
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
            }
        },
        activated(){
            this.articleId = this.$route.query.articleId
            this.getArticleContent()
            this.getUpperAndLowerChapter()
            console.log('up',this.upperArticleId)
            console.log('low',this.lowerArticleId)
        },
        mounted(){
            this.articleId = this.$route.query.articleId
            this.getArticleContent()
            this.getUpperAndLowerChapter()
        },
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
            getArticleContent(){
                axios({
                    url:url.getArticleMainContent,
                    method:'post',
                    data:{
                        articleId:this.articleId
                    }
                }).then((response)=>{
                    this.articleTitle = response.data.message.articleTitle
                    this.articleContent = response.data.message.articleContent
                    this.articleType = response.data.message.articleType
                }).catch((error)=>{
                    console.log(error)
                })
            },
            getUpperAndLowerChapter(){
                axios({
                    url:url.getUpperAndLowerChapter,
                    method:'post',
                    data:{
                        articleId:this.articleId
                    }
                }).then((response)=>{
                    console.log(response)
                    if('upperChapter' in response.data.message){
                        this.upperArticleId = response.data.message.upperChapter._id
                        this.upperArticleTitle = response.data.message.upperChapter.articleTitle
                    }else{
                        this.upperArticleId = ''
                    }
                    if('lowerChapter' in response.data.message){
                        this.lowerArticleId = response.data.message.lowerChapter._id
                        this.lowerArticleTitle = response.data.message.lowerChapter.articleTitle
                    }else{
                        this.lowerArticleId = ''
                    }
                })
            },
            goUpperChapter(){
                this.$router.push({path:'/articleInfo',query:{articleId:this.upperArticleId}})
            },
            goLowerChapter(){
                this.$router.push({path:'/articleInfo',query:{articleId:this.lowerArticleId}})
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
                this.getUpperAndLowerChapter()
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
    position: relative;
}
.article-title{
    font-size: 24px;
    border-bottom: 1px solid #dddddd;
    line-height: 1.5em;
    margin-bottom: 10px;
    padding-bottom: 5px;
    padding-left: 5px;
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