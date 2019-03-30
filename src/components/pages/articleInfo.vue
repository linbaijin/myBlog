<template>
    <div id="topics">
        <div class="content">
            <div class="article-title">{{articleTitle}}</div>
            <div class="article-cotent" v-html="articleContent">
            </div>
        </div>
        <div class="foot">
            <div class="type">分类: {{articleType}}</div>
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
                articleType:''
            }
        },
        activated(){
            this.articleId = this.$route.query.articleId
            this.getArticleContent()
        },
        // watch:{
        //     '$route'(from){
        //         this.articleId = this.$route.query.articleId
        //         this.getArticleContent()
        //     }
        // },
        methods:{
            getArticleContent(){
                console.log('getInfo!!!!')
                axios({
                    url:url.getArticleMainContent,
                    method:'post',
                    data:{
                        articleId:this.articleId
                    }
                }).then((response)=>{
                    console.log(response)
                    this.articleTitle = response.data.message.articleTitle
                    this.articleContent = response.data.message.articleContent
                    this.articleType = response.data.message.articleType
                })
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
}
</style>