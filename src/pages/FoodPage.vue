<script setup>
import { onMounted } from 'vue'
onMounted(() => {
  window.localStorage.setItem('food', true)
})
</script>
<script>
export default {
  name: 'FoodPage'
}
</script>

<template>
  <div class="card-box">
    <div  class="card-main">
      <div class="line1">我<span> <img src="../assets/imgs/goose.png" /></span>了</div>
      <p>恭喜你发现“我饿了”卡，请截图保存当前页面，凭截图前往食堂兑换1024特别零食礼包吧（先到先得，发完即止，跑起来啊——</p>
      <br />
      <p style="text-align: center;">吃饭不积极，思想有问题</p>
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
  margin-top: 200px;
  img{
    width: 100px;
  }
}

</style>
