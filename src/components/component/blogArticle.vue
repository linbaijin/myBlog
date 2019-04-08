<template>
    <div class="article" @click="goArticleInfoPage">
        <div class="article-title">
            <a href="#">{{articleTitle}}</a>
        </div>
        <div class="abstract">
            <div class="abstract-desc">
                {{articleDescription}}
            </div>
            <div class="abstract-foot">
                {{articleCreatTime}} Model-Zachary 阅读({{readNum}}) 评论(0)
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:['articleTitle','articleDescription','readNum','articleId','articleCreatTime'],
        data() {
            return {
                message:'hello'
            }
        },
        methods:{
            goArticleInfoPage(){
                this.$router.push({path:'/articleInfo',query:{articleId:this.articleId}})
            }
        }
    }
</script>

<style scoped>
.article{
    background: none repeat scroll 0% 0% #ffffff;
    border-radius: 7px;
    box-shadow: 1px 2px 3px #a7a8ad;
    color: #333331;
    margin:0px 5px 18px 0px;
    min-height: 10px;
    padding: 5px 20px 10px;
    /* animation: pullUp 2s linear 0.5s 1 normal */
}
@keyframes pullUp{
    0%{
        transform: translateX(300px);
        opacity: 0;
    }
    50%{
        transform: translateX(150px);
        opacity: 0.5;
    }
    100%{
        transform: translateX(0);
        opacity: 1;
    }
}
.article-title{
    border-bottom: 1px dashed #4ab19a;
    clear: both;
    width: 100%;
    line-height: 2.5em;
    font-size: 21px;
}
.abstract{
    padding: 10px 0px 4px;
    width: 100%
}
.abstract-desc{
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
    line-height: 1.5
}
.abstract-foot{
    clear: both;
    width: 100%;
    text-align: right;
    overflow: hidden;
    white-space: nowrap;
}
</style>