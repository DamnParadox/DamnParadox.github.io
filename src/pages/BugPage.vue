<script setup>
import { onMounted, reactive, ref } from 'vue'
let count = ref(0)
let timer = null
const bgstyle = reactive({
  isImg: true,
})
const changeColor = () => {
  if (count.value >= 10) {
    clearInterval(timer);
    bgstyle.isImg = true;
    return;
  }
  count.value++;
  if (count.value % 2 === 0) {
    bgstyle.isImg = true;
  } else {
    bgstyle.isImg = false;
  }
}
onMounted(() => {
  window.localStorage.setItem('bug', true)
  timer = setInterval(() => {
    changeColor()
  }, 300)
})
</script>
<script>
export default {
  name: 'BugPage'
}
</script>
<template>
<div class="bg-div">
  <img v-if="bgstyle.isImg" src="../assets/imgs/bugPage2.png" alt="" style="width: 100vw; height: 100vh;"/>
  <img v-else src="../assets/imgs/bugPage1.png" alt="" style="width: 100vw; height: 100vh;"/>
  <div class="tips" v-if="count>=10">
    <p>都说了今年没有BUG，你非要找BUG，码场又坏了, 凭截图去线下补给站修理吧~</p>
    <p style="margin-top: 20px;text-align: center;">补给站坐标：前台</p>
  </div>
</div>
</template>

<style scoped lang="less">
.bg-div{
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.tips{
  font-size: 20px;
  line-height: 30px;
  width: 60%;
  height: 300px;
  padding: 0 20%;
  padding-top: 140px;
  background: url('../assets/imgs/modal2.png') no-repeat center center;
  background-size: 100% 100%;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;

}
</style>
