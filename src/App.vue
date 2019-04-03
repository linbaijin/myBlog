<template>
  <div class="main">
    <transition name="fade" model="out-in">
      <router-view class="position-view"></router-view>
    </transition>
    
  </div>
</template>

<script>
  export default {
    name:'App'
  }
</script>

<style scoped>
.position-view{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.main{
  width: 100%;
  height: 100%;
}
.fade-enter{
  opacity: 0;
}
.fade-leave{
  opacity: 1;
}
.fade-enter-active{
  transition: opacity .5s;
}
.fade-leave-active{
  opacity: 0;
  transition: opacity .5s
}
</style>