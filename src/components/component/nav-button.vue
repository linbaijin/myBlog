<template>
    <div class="nav-button">
        <ul>
            <!-- 头像 -->
            <li class="userInfo-li">
                <mu-menu palcement="bottom-end" open-on-hover>
                    <mu-avatar size="30">
                        <img src="../../assets/userheadpic.jpeg">
                    </mu-avatar>
                    <mu-list slot="content">
                        <mu-list-item button>
                            <mu-list-item-title>个人中心</mu-list-item-title>
                        </mu-list-item>
                        <mu-list-item button>
                            <mu-list-item-title>退出登录</mu-list-item-title>
                        </mu-list-item>
                    </mu-list>
                </mu-menu>
            </li>
            <li class="userInfo-li">
                <span>Briken Lam</span>
            </li>
            <!-- <li>
                <mu-badge content="12" badge-class="new-reminder" circle color="secondary">
                    <mu-button icon>
                        <mu-icon size="16" value="floder"></mu-icon>
                    </mu-button>
                </mu-badge>
            </li> -->
        </ul>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
.nav-button{
  padding-left: 20px;
  font-size: 26px;
  width: 50%;
  float: right;
}
.userInfo-li{
    color: #c2a7dd;
    font-size: 20px;
    margin: 8px 10px;
    min-width: 36px;
}
.new-reminder{
    max-width: 50px;
    font-size: 16px;
}
ul{
    margin: 0;
}
.nav-button ul li{
    list-style: none;
    float: left;
    display: block;
    height: 100%;
}
</style>