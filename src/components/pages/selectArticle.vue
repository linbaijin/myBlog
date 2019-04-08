<template>
    <div id="right-main">
        <article class="article-area" v-for="(item,index) in articleList" :key="index">
            <blogArticle :articleTitle="item.articleTitle" 
            :articleDescription="item.articleDescription" 
            :readNum="item.readNum"
            :articleId="item._id"
            :articleCreatTime="item.creatAt"
            ></blogArticle>
        </article>
        <div class="pagination">
          <mu-pagination @change="changeCurrentPage" :total="totalNum" :page-size="pageSize" :current.sync="currentPage"></mu-pagination> 
        </div>
        
    </div>
</template>

<script>
import blogArticle from '@/components/component/blogArticle'
import axios from 'axios'
import url from '@/serviceApi.config.js'
export default {
  data() {
    return {
      type:'',
      totalNum:null,
      pageSize:5,
      currentPage:1,
      articleList:[]
    }
  },
//   activated(){
//       this.type = this.$route.query.type
//       this.getArticleList(this.type)
//   },
  mounted(){
      this.type = this.$route.query.type
      this.getArticleList(this.type)
  },
  methods:{
    getArticleList(type){
      axios({
        url:url.selectType,
        method:'post',
        data:{
          type:this.type,
          pageSize:this.pageSize,
          currentPage:this.currentPage
        }
      }).then((response)=>{
        console.log(response)
        this.articleList = response.data.message
        this.totalNum = response.data.totalNum
        console.log(this.articleList)
      })
    },
    changeCurrentPage(){
      console.log(this.currentPage)
      this.getArticleList()
    }
  },
  components:{
    blogArticle
  },
  watch:{
      $route(to,from){
          this.type = this.$route.query.type
          this.getArticleList(this.type)
      }
  }
}
</script>

<style scoped>
#right-main{
  width: 100%;
  height: auto;
}
/* #right-main .article-area:nth-child(1){
  animation-delay: 0.1s;
} */
.article-area{
  width: 100%;
  height: auto;
  /* animation:fade ease-out 1s forwards; */
}
@keyframes fade{
  0%{
    transform: translate3d(0,3em,0);
    opacity: 0;
  }
  100%{
    transform: translate3d(0,3em,0);
    opacity: 1;
  }
}
.pagination{
  max-width: 300px;
  margin: 60px auto;
}
</style>