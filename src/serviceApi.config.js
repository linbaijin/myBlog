const ServiceBaseUrl = "http://127.0.0.1:3000"

const url = {
    registerUrl : ServiceBaseUrl + '/user/register',//注册接口
    loginUrl : ServiceBaseUrl + '/user/login',//登录接口
    articleReleaseUrl: ServiceBaseUrl + '/article/articleRelease',//文章提交接口
    uploadUrl : ServiceBaseUrl + '/upload/uploadImg',//文章图片上传接口
    getArticleListUrl : ServiceBaseUrl + '/article/getArticleGeneralInfo',//获取文章列表接口
    getArticleMainContent: ServiceBaseUrl + '/article/getArticleMainContent',//获取文章详细内容接口
    getUserInfo : ServiceBaseUrl + '/user/getUserInfo',//获取用户信息接口
    uploadUserInfo : ServiceBaseUrl +'/user/uploadUserInfo',//用户信息页上传用户信息接口
    checkUsername : ServiceBaseUrl + '/user/checkUsername'//检查是否重名接口
}

module.exports = url