<template>
    <div>
        <router-link to="/Main">
            <mu-button flat color="success">返回</mu-button>
        </router-link>
        <div class="article-title">
            <mu-form :model="dataForm" class="mu-demo-form" label-position="top" label-width="100">
                <mu-form-item prop="title" label="标题">
                    <mu-text-field v-model="dataForm.title"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="select" label="分类">
                    <mu-select v-model="dataForm.select" chips>
                        <mu-option v-for="(option,index) in options" :key="index" :label="option" :value="option"></mu-option>
                    </mu-select>
                </mu-form-item>
            </mu-form>
        </div>
        <mavon-editor v-model="articleContent" :ishljs="true"></mavon-editor>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                articleContent:'',
                options:['Linux','Java','C++','Python',
                    'JavaScript','RegExp','Vue','React'
                ],
                dataForm:{
                    title:'',
                    select:''
                }
            }
        },
    }
</script>

<style scoped>
.article-title{
    width: 100%
}
.mu-demo-form {
  width: 100%;
}
</style>