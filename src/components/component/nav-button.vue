<template>
    <div class="nav-button">
        <ul>
            <li class="user-headpic">
                <mu-avatar size="26">
                    <img src="../../assets/userheadpic.jpeg">
                </mu-avatar>
            </li>
            <li>
                <mu-badge content="12" badge-class="new-reminder" circle color="secondary">
                    <mu-button icon>
                        <mu-icon size="16" value="floder"></mu-icon>
                    </mu-button>
                </mu-badge>
            </li>
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
.user-headpic{
    margin: 4px 10px;
    max-width: 36px;
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