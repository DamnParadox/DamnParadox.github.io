<script setup>
import DefaultDrag from '../components/Drag.vue'
import { ref, reactive, watch } from 'vue'
let isWin = ref(localStorage.getItem('puzzle') || false)
const data = reactive([
  {
    img1: require('../assets/imgs/game4/dou1.png'),
    img2: require('../assets/imgs/game4/dou2.png'),
    x: 30,
    y: 130,
    isPuzzle:'no',
    puzzlePos:{
      x:[50,150],
      y:[340,440],
      bg1: 'url('+require('../assets/imgs/game4/img1-1.png')+')',
      bg2: 'url('+require('../assets/imgs/game4/img1-2.png')+')',
    }
  },
  {
    img1: require('../assets/imgs/game4/shuo1.png'),
    img2: require('../assets/imgs/game4/shuo2.png'),
    x: 100,
    y: 130,
    isPuzzle:'none'
  },
  {
    img1: require('../assets/imgs/game4/le1.png'),
    img2: require('../assets/imgs/game4/le2.png'),
    x: 160,
    y: 130,
    isPuzzle:'no',
    puzzlePos:{
      x:[150,250],
      y:[340,440],
      bg1: 'url('+require('../assets/imgs/game4/img2-1.png')+')',
      bg2: 'url('+require('../assets/imgs/game4/img2-2.png')+')',
    }
  },
  {
    img1: require('../assets/imgs/game4/zhe1.png'),
    img2: require('../assets/imgs/game4/zhe2.png'),
    x: 230,
    y: 130,
    isPuzzle:'no',
    puzzlePos:{
      x:[250,350],
      y:[340,440],
      bg1: 'url('+require('../assets/imgs/game4/img3-1.png')+')',
      bg2: 'url('+require('../assets/imgs/game4/img3-2.png')+')',
    }
  },
  {
    img1: require('../assets/imgs/game4/li1.png'),
    img2: require('../assets/imgs/game4/li2.png'),
    x: 300,
    y: 130,
    isPuzzle:'no',
    puzzlePos:{
      x:[150,250],
      y:[440,540],
      bg1: 'url('+require('../assets/imgs/game4/img5-1.png')+')',
      bg2: 'url('+require('../assets/imgs/game4/img5-2.png')+')',
    }
  },
  {
    img1: require('../assets/imgs/game4/mei1.png'),
    img2: require('../assets/imgs/game4/mei2.png'),
    x: 50,
    y: 210,
    isPuzzle:'none'
  },
  {
    img1: require('../assets/imgs/game4/you1.png'),
    img2: require('../assets/imgs/game4/you2.png'),
    x: 120,
    y: 210,
    isPuzzle:'none'
  },
  {
    img1: require('../assets/imgs/game4/youyou1.png'),
    img2: require('../assets/imgs/game4/youyou2.png'),
    x: 190,
    y: 210,
    isPuzzle:'none'
  },
  {
    img1: require('../assets/imgs/game4/xi1.png'),
    img2: require('../assets/imgs/game4/xi2.png'),
    x: 260,
    y: 210,
    isPuzzle:'none'
  },
])

const dynamicPos = reactive([])
data.forEach(item => {
  dynamicPos.push({x:item.x,y:item.y})
});
let nowItem = null
let nowItemIndex = -1;
const touchstart = (item,i)=>{
  nowItem = item
  nowItemIndex = i
}

const dragend = (val)=>{
  if(nowItem.isPuzzle == 'none') {
    dynamicPos[nowItemIndex].x = data[nowItemIndex].x
    dynamicPos[nowItemIndex].y = data[nowItemIndex].y
  } else{
    const hotDivInfo = val.el.querySelector('.hot').getBoundingClientRect()
    if (hotDivInfo.x >= nowItem.puzzlePos.x[0] && hotDivInfo.x + hotDivInfo.width <= nowItem.puzzlePos.x[1] 
        && hotDivInfo.y >= nowItem.puzzlePos.y[0] && hotDivInfo.y + hotDivInfo.height <= nowItem.puzzlePos.y[1]) {
      val.el.style.display = 'none'
      data[nowItemIndex].isPuzzle = 'yes'
    } else{
      dynamicPos[nowItemIndex].x = data[nowItemIndex].x
      dynamicPos[nowItemIndex].y = data[nowItemIndex].y
    }
  }
  nowItem = null;
  nowItemIndex = -1;
}

watch(()=>data,(newVal)=>{
  isWin.value = !data.some(item => item.isPuzzle == 'no')
  if(isWin.value){
    window.localStorage.setItem('puzzle',true)
  }
},{
    deep: true
  })
</script>
<script>    
export default {    
  name: 'PuzzlePage'
}
</script>
<template>
  <div class="result-box"  v-if="isWin">
      <div class="card-box">
      <div  class="card-main">
        <div class="line1">危机解除</div>
        <p>在你的努力下，出逃的顽皮小码被成功找回。请截图保存当前页面，凭截图前往前台抽奖，祝你好运哦~</p>
        <br />
        <p style="text-align: center;">火眼金睛，心细如发</p>
      </div>
    </div>
  </div>
  <div class="puzzle-main" v-else>
    <div class="word-box word1" v-for="(item, i) in data" :key="i" :style="{'left':item.x+'px', 'top':item.y+'px'}">
      <img :src="item.img1">
    </div>
    <DefaultDrag class="word-box word2" v-for="(item, i) in data" :key="i" :w="60" :h="60"
      v-model:x="dynamicPos[i].x" v-model:y="dynamicPos[i].y"  @touchstart="touchstart(item,i)" @dragend="dragend">
        <div class="img2-box">
          <img :src="item.img2">
          <div class="hot"></div>
        </div>
    </DefaultDrag>
    <div class="word-box img4" >
      <div class="img2-box">
        <img src="../assets/imgs/game4/img4.png">
      </div>
    </div>
    <div class="word-box img6" >
      <div class="img2-box">
        <img src="../assets/imgs/game4/img6.png">
      </div>
    </div>
    <div class="target-dot" v-for="(item, i) in data.filter(item1 => item1.isPuzzle != 'none')" :key="i" 
    :style="{'backgroundImage': item.isPuzzle == 'no' ? item.puzzlePos.bg1 : item.puzzlePos.bg2, 'width':(item.puzzlePos.x[1] - item.puzzlePos.x[0]) + 'px', 'height':(item.puzzlePos.y[1] - item.puzzlePos.y[0]) + 'px', 'left':item.puzzlePos.x[0] +'px', 'top':item.puzzlePos.y[0] +'px'}"></div>
  </div>
</template>

<style scoped lang="less">
.puzzle-main{
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  background: url('../assets/imgs/main-bg.png') no-repeat center center;
  background-size: 120% 100%;
  .word-box{
    width: 60px;
    height: 60px;
    position: absolute;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .img4{
    top:440px;
    left: 50px;
    width: 100px;
    height: 100px;
  }
  .img6{
    top:440px;
    left: 249px;
    width: 100px;
    height: 100px;
  }
  .img2-box{
    width: 100%;
    height: 100%;
    position: relative;
    .hot{
      width: 10px;
      height: 10px;
      position: absolute;
      top: 20px;
      left: 20px;
    }
  }
}

.target-dot{
  position:absolute;
  background-size:100% 100%;
}
.result-box{
  position: absolute;
  width:100vw;
  height: 100vh;
  top: 0;
  left: 0;
  // background-color: #fff;
  z-index: 9999;
 }

 .card-box{
  width: 100vw;fff
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
