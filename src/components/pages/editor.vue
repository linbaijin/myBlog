<template>
    <div>
        <router-link to="/Main">
            <mu-button flat color="success">返回</mu-button>
        </router-link>
        <div class="article-title">
            <mu-form ref="form" :model="dataForm" class="mu-demo-form" label-position="top" label-width="100">
                <mu-form-item prop="title" label="标题" :rules="articleNameRules">
                    <mu-text-field v-model="dataForm.title"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="select" label="分类" :rules="articleTypeRules">
                    <mu-select v-model="dataForm.select" chips>
                        <mu-option v-for="(option,index) in options" :key="index" :label="option" :value="option"></mu-option>
                    </mu-select>
                </mu-form-item>
                <mu-form-item prop="description" label="文章描述" :rules="articleDescriptRules">
                    <mu-text-field v-model="dataForm.description"></mu-text-field>
                </mu-form-item>
            </mu-form>
        </div>
        <mavon-editor ref="md" v-model="articleContent" @change="$save" @imgAdd="$imgAdd" codeStyle="dark" fontSize="24px" :ishljs="true" :toolbars="markdownOptions" style="min-height:500px;"></mavon-editor>
        <div class="editor-footer">
            <mu-button flat color="success" @click="submitArticle">提交</mu-button>
            <mu-button flat color="error" @click="clear">重置</mu-button>  
        </div>
        
    </div>
</template>

<script>
import axios from 'axios'
import url from '@/serviceApi.config.js'
import Toast from 'muse-ui-toast'

    export default {
        data() {
            return {
                arrowRelease:null,
                articleContent:'',
                articleNameRules:[
                    {validate:(val)=>!!val,message:'必须填写文章标题'},
                ],
                articleTypeRules:[
                    {validate:(val)=>!!val,message:'必须选择文章类型'},
                ],
                articleDescriptRules:[
                    {validate:(val)=>!!val,message:'必须填写文章描述'},
                ],
                markdownOptions:{
                    bold: true, // 粗体
                    italic: true, // 斜体
                    header: true, // 标题
                    underline: true, // 下划线
                    strikethrough: true, // 中划线
                    mark: true, // 标记
                    superscript: true, // 上角标
                    subscript: true, // 下角标
                    quote: true, // 引用
                    ol: true, // 有序列表
                    ul: true, // 无序列表
                    link: true, // 链接
                    imagelink: true, // 图片链接
                    code: true, // code
                    table: true, // 表格
                    fullscreen: true, // 全屏编辑
                    readmodel: true, // 沉浸式阅读
                    htmlcode: true, // 展示html源码
                    help: true, // 帮助
                    /* 1.3.5 */
                    undo: true, // 上一步
                    redo: true, // 下一步
                    trash: true, // 清空
                    save: true, // 保存（触发events中的save事件）
                    /* 1.4.2 */
                    navigation: true, // 导航目录
                    /* 2.1.8 */
                    alignleft: true, // 左对齐
                    aligncenter: true, // 居中
                    alignright: true, // 右对齐
                },
                articleAuthor:'LeeBriken',
                options:['Linux','Java','C++','Python',
                    'JavaScript','RegExp','Vue','React'
                ],
                dataForm:{
                    title:'',
                    select:'',
                    description:'',
                    articleContent:'',
                }
            }
        },
        methods:{
            submit(){
                this.$refs.form.validate().then((result)=>{
                    this.arrowRelease = result
                })
            },
            async submitArticle(){
                await this.submit()
                if(this.arrowRelease){
                    await this.articleRelease()
                    this.clear()
                }else{
                    Toast.warning('请继续编辑文章信息')
                }
            },
            articleRelease(){
                console.log(this.dataForm.articleContent)
                axios({
                    url:url.articleReleaseUrl,
                    method:'post',
                    data:{
                        articleTitle:this.dataForm.title,
                        articleType:this.dataForm.select,
                        articleDescription:this.dataForm.description,
                        articleContent:this.dataForm.articleContent,
                        articleAuthor:this.articleAuthor
                    }
                }).then((response)=>{
                    console.log(response)
                    Toast.success('文章发布成功')
                }).catch((error)=>{
                    console.log(error)
                })
            },
            clear(){
                this.$refs.form.clear()
                this.dataForm = {
                    title:'',
                    select:'',
                    description:'',
                    articleContent:''
                }
                this.articleContent=''
                Toast.warning('Data has benn Clear!')
            },
            $save(value,render){
                this.dataForm.articleContent = render
                console.log('save',this.dataForm.articleContent)
            },
            $imgAdd(pos,$file){
                console.log(pos)
                console.log($file)
                var formdata = new FormData()
                formdata.append('image',$file)
                axios({
                    url:url.uploadUrl,
                    method:'post',
                    data:formdata
                }).then(async(response)=>{
                    console.log(response)
                    await this.$refs.md.$img2Url(pos,response.data.path)
                    Toast.success('上传成功')

                }).catch((error)=>{
                    console.log(error)
                })
            }

        }
    }
</script>

<style scoped>
.article-title{
    width: 100%
}
.mu-demo-form {
  width: 100%;
}
.editor-footer{
    margin: 0 auto;
    max-width: 30%;
}
</style>