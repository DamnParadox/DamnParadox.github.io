<script setup>
import { onMounted } from 'vue'
onMounted(() => {
  window.localStorage.setItem('cao', true)
})
</script>
<script>
export default {
  name: 'CaoPage'
}
</script>

<template>
  
  <div class="card-box">
    <div  class="card-main">
      <div class="line1">恭喜！你喂饱了小码，它也不再虚弱，为了表示感谢，就送给你个大福利吧！请截图保存当前页面，凭截图前往前台抽奖，祝你好运哦~</div>
      <br />
      <p style="text-align: center;">奖励你工作之余也没有忘记汲取知识，精进自己的写码能力！用心改变，引领医疗创新！</p>
    </div>
  </div>

</template>


<style scoped lang="less">
.card-box{
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .card-main{
    width: 380px;
    height: 700px;
    background: url('../assets/imgs/card-gift.png') no-repeat center center;
    background-size: 100%;
    padding-left: 80px;
    padding-right: 50px;
  }
}
.line1{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 210px;
  img{
    width: 100px;
  }
}

</style>

