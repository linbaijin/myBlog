const ServiceBaseUrl = "http://127.0.0.1:3000"

const url = {
    registerUrl : ServiceBaseUrl + '/user/register',
    loginUrl : ServiceBaseUrl + '/user/login',
    articleReleaseUrl: ServiceBaseUrl + '/article/articleRelease',
    uploadUrl : ServiceBaseUrl + '/upload/uploadImg',
    getArticleListUrl : ServiceBaseUrl + '/article/getArticleGeneralInfo',
    getArticleMainContent: ServiceBaseUrl + '/article/getArticleMainContent'
}

module.exports = url