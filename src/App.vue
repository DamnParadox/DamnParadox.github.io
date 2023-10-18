<template>
  <router-view/>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()


// 限制时间
const doTime = () =>{
  const nowTime = new Date().getTime()
  const oldTime = window.localStorage.getItem('time')
  if(nowTime - oldTime > 1000*60*10){
    router.push('/time')
  }
}

onMounted(() => {
  const nowTime = new Date().getTime()
  if (!window.localStorage.getItem('time')) {
    window.localStorage.setItem('time', nowTime)
  } else {
    if (nowTime - window.localStorage.getItem('time') >= 1000 * 60 * 30) {
      window.localStorage.setItem('time', nowTime)
    }
  }
  setInterval(() => {
    doTime()
  }, 0, 3000);

})
</script>

<script>
export default {
  name: 'App'
}
</script>

<style>
html,body,p{
  margin: 0;
  padding: 0;
  -webkit-tap-highlight-color:rgba(255,255,255,0);
  font-size: 18px;
  line-height: 1.2;
  font-family: 'MyCustomFont2';
}
body{
  background-color: #e3dfd6;
}
</style>