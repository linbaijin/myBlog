<template>
    <div id="right-main">
        <div id="article-area">
            <blogArticle v-for="(item,index) in list" :key="index"></blogArticle>
        </div>
    </div>
</template>

<script>
    import blogArticle from '@/components/component/blogArticle'
export default {
  data() {
    return {
      list:[1,2,3,4,5,6,7,8]
    }
  },
  components:{
    blogArticle
  }
}
</script>

<style scoped>
#right-main{
  width: 100%;
  height: auto;
}
#article-area{
  width: 100%;
  height: auto;
}
</style>