<script>
export default {
  name: 'TimePage'
}
</script>

<template>
  <div class="card-box">
    <div  class="card-main">
      <div class="line1">别摸<span> <img src="../assets/imgs/fish.png" /></span>了</div>
      <p>码场快被你掘地三尺了，认真干活吧，活儿干完才能好好吃饭。凭截图前往食堂兑换1024特别零食礼包吧（先到先得，发完即止，跑起来啊——</p>
      <br />
      <p style="text-align: center;">认真干活，好好吃饭</p>
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
