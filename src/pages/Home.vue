<script setup>
import DefaultDrag from '../components/Drag.vue'
import {ref, reactive, onMounted, onUnmounted} from 'vue'

const pageSize = reactive({
  w: 1170,
  h: 855
})
const viewBox = ref(null);
const horseRef = ref(null);
const horseInfo = reactive({
  w: 100,
  h: 100
})


const modalInfo = reactive({
  show: false,
  content: '',
  tips: '一旦挑战此彩蛋成功，就不能继续探索“码”场了，是否挑战此彩蛋？',
  toPage: '',
  startModal: '看不懂？查看人话版本'
})

const doStartModal = (e) => {
  e.target.parentElement.classList.add('overturn')
  modalInfo.startModal = ''
  modalInfo.content = '你好，码场地图的各个角落藏着很多彩蛋，到处戳戳看看，说不定会触发惊喜彩蛋呢。彩蛋页面记得截图保存~，能参与线下的惊喜活动哦。当然，探索的时候还是记得不要饿到小码呦(这绝对不是线索)。'
  e.target.parentElement.firstElementChild.style.transform = 'rotateY(180deg)'
  e.target.parentElement.lastElementChild.style.transform = 'rotateY(180deg)'
}
const doStartGame = () => {
  modalInfo.show = false
  modalInfo.startModal = ''
}

const dialogInfo = reactive({
  show: false,
  content: '',
  w:100,
  h:100,
  x:20,
  y:20
})

const doCao = (val) => {
  const caoInfo = val.el.getBoundingClientRect()
  const horseInfo = horseRef.value.getBoundingClientRect()
  horseRef.value.firstElementChild.style.display = 'block'
  if(caoInfo.x > horseInfo.x && caoInfo.x < horseInfo.x + horseInfo.width 
      && caoInfo.y > horseInfo.y && caoInfo.y < horseInfo.y + horseInfo.height){
        val.el.style.display = 'none'
        setTimeout(() => {
          modalInfo.show = true,
          modalInfo.content = '恭喜你，喂饱了小码，让它码力十足，为了感谢你，发给你一个大福利吧。'
          modalInfo.toPage = '/cao'
        }, 1000);
  }

}

const doSign = (e) => {
  // 如果元素中含有overturn类名，就不执行
  if(e.target.classList.contains('fan')){
    modalInfo.show = true,
    modalInfo.content = '一直戳路牌，你想要出发去哪里呢？但是走的再远也不要忘了初心，挑战彩蛋来找到你在代码的初心吧。'
    modalInfo.toPage = '/helloworld'
  } else{
    e.target.classList.add('overturn')
    setTimeout(() => {
      e.target.src = require('../assets/imgs/sign2.png')
      e.target.classList.remove('overturn')
      e.target.classList.add('fan')
    }, 1500);
  }
}

const poolInfo = reactive({
  poolCount: 0
})
const doPool = () =>{
  poolInfo.poolCount++
  if(poolInfo.poolCount>=3){
    dialogInfo.show = true
    dialogInfo.content = '快了，快了'
    dialogInfo.w = 100
    dialogInfo.h = 40
    dialogInfo.x = 90
    dialogInfo.y = 610
  }
  if(poolInfo.poolCount>=5){
    modalInfo.show = true,
    modalInfo.content = '看你一直在抓鹅，应该是鹅了吧，餐厅有准备零食礼包，可以去补充能量哦。'
    modalInfo.toPage = '/food'
  }
}

const roleInfo = reactive({
  content: '千万别碰我'
})
const words = ['你好，我是llama','码场有很多彩蛋，快去探索','别戳了，别戳了','好饿呀，好饿呀, 找点东西吃吧']
const doRole = () => {
  roleInfo.content = words[Math.floor(Math.random()*words.length)]
}

const houseInfo = reactive({
  count: 0,
  show: false
})
const doHouse = () => {
  houseInfo.count++;
  if(houseInfo.count > 0){
    dialogInfo.show = true
    dialogInfo.content = 'AH，这里是联影小屋，快进屋来看看码场主与各位爱码士的美好回忆吧，点击进入...'
    dialogInfo.w = 230
    dialogInfo.h = 100
    dialogInfo.x = 445
    dialogInfo.y = 80
  }
  if(houseInfo.count > 1){
    houseInfo.show = true
  }
}

const leafInfo = reactive({
  count: 0,
  show: false
})
const doLeaf = ()=>{
  leafInfo.count++;
  if(leafInfo.count > 1){
    dialogInfo.show = true
    dialogInfo.content = '树上啥也没有别戳了...'
    dialogInfo.w = 120
    dialogInfo.h = 60
    dialogInfo.x = 1000
    dialogInfo.y = 100
  }
  if(leafInfo.count > 2){
    leafInfo.show = true
  }
}

const bugInfo = reactive({
  count: 0
})
const doBug = () =>{
  bugInfo.count++
  if(bugInfo.count>0){
    dialogInfo.show = true
    dialogInfo.content = '我不是bug，不要戳我啊'
    dialogInfo.w = 120
    dialogInfo.h = 60
    dialogInfo.x = 850
    dialogInfo.y = 165
  }
  if(bugInfo.count>1){
    modalInfo.show = true,
    modalInfo.content = '都说了今年没有BUG，你非找个BUG，手机坏了跟我没关系'
    modalInfo.toPage = '/bug'
  }
}

const tailInfo = reactive({
  count: 0
})
const doTail = () =>{
  tailInfo.count++
  if(tailInfo.count>0){
    dialogInfo.show = true
    dialogInfo.content = '这里没有人...'
    dialogInfo.w = 110
    dialogInfo.h = 45
    dialogInfo.x = 365
    dialogInfo.y = 105
  }
  if(tailInfo.count>3){
    modalInfo.show = true,
    modalInfo.content = '想不到你的好奇心这么强，我藏这么深都能被你发现，那就给你一个彩蛋吧'
    modalInfo.toPage = '/puzzle'
  }
}

const isLoad = ref(true)
const loadtime = ref(0);
let loadTimer = null;
onMounted(() => {
  
  modalInfo.show = true,
  modalInfo.content = '啊哈呀！又见面了，爱码仕还依稀记得我们的码场去年被大家各显神通，Bug都被大家找到了。码场主修到现在还没修好，今年就拜托大家帮忙照看一下我们的码场啦，带着小码到处逛逛，探索一下吧'
  modalInfo.toPage = ''

  loadTimer = setInterval(() => {
    loadtime.value += 2
    if (loadtime.value >= 200) {
      isLoad.value = false
      clearInterval(loadTimer)
      setTimeout(()=>{
        viewBox.value.scrollLeft = pageSize.w / 2 - viewBox.value.clientWidth / 2
        viewBox.value.scrollTop = pageSize.h / 2 - viewBox.value.clientHeight / 2
      },10)
    }
  }, 20);
  

})

// 页面销毁时清除定时器
onUnmounted(() => {
  clearInterval(loadTimer)
})


</script>
<script>
export default {
  name: 'HomePage'
}
</script>
<template>
  <div class="loading" v-if="isLoad">
    loading...{{ loadtime/2 }}%
  </div>
  <div class="view-box" ref="viewBox">
    <div class="main-div" :style="{ 'width': pageSize.w + 'px', 'height': pageSize.h + 'px'}">
      
      <div class="role-box" @click="doRole" :style="{'width':horseInfo.w+'px','height':horseInfo.h+'px'}" ref="horseRef">
        <div class="love">
          <img src="../assets/imgs/love.png" />
          <img src="../assets/imgs/love.png" />
          <img src="../assets/imgs/love.png" />
        </div>
      </div>
      <div class="role-dialog dialog">
        <p>{{ roleInfo.content }}</p>
      </div>

      <div class="pool" @click="doPool">
        <img src="../assets/imgs/egg1.png" />
        <img src="../assets/imgs/egg2.png" />
        <img src="../assets/imgs/egg3.png" />
      </div>
      <div class="block block1">
        <img src="../assets/imgs/block.png" />
      </div>
      <div class="block block2">
        <img src="../assets/imgs/block.png" />
      </div>
      <div class="grass grass1">
        <img src="../assets/imgs/grass1.png" />
      </div>
      <div class="grass grass2">
        <img src="../assets/imgs/grass1.png" />
      </div>
      <div class="three three1">
        <img src="../assets/imgs/tree1.png" />
      </div>
      <div class="three three2">
        <img src="../assets/imgs/tree2.png" />
      </div>
      <div class="sign" @click="doSign">
        <img src="../assets/imgs/sign.png" />
      </div>
      <div class="house" @click="doHouse">
        <img src="../assets/imgs/house.png" />
      </div>
      <div class="leaf" @click="doLeaf">
        <img src="../assets/imgs/leaf.png" />
      </div>
      <div class="bugbox" @click="doBug" v-if="leafInfo.show">
        <img src="../assets/imgs/bug.png" />
      </div>
      <div class="tail" @click="doTail">
        <img src="../assets/imgs/tail.png" />
      </div>
      <div class="luobo">
        <img src="../assets/imgs/luobo.png" />
      </div>
      
      <div class="dialog" :style="{'width':dialogInfo.w+'px','height':dialogInfo.h+'px','left':dialogInfo.x+'px','top':dialogInfo.y+'px','opacity':dialogInfo.show?'1':'0'}">
        <p>{{ dialogInfo.content }}</p>
      </div>

      <DefaultDrag :w="40" :h="35" :x="820" :y="155" @dragend="doCao" class="caocao" :zIndex="0">
        <img src="../assets/imgs/grass2.png" />
      </DefaultDrag> 
    </div>
  </div>
  <div class="modal-box" v-if="modalInfo.show">
    <div class="mask"></div>
    <div class="modal-main">
      <p class="modal-con">{{modalInfo.content}}</p>
      <p class="modal-tips" v-if="modalInfo.toPage">{{modalInfo.tips}}</p>
      <p class="start-modal" v-if="modalInfo.startModal" @click="doStartModal">{{ modalInfo.startModal }}</p>
      <div class="btn-box">
        <div v-if="modalInfo.startModal" @click="doStartGame">开始探索</div>
        <div @click="modalInfo.show = false" v-else>继续探索</div>
        <div v-if="modalInfo.toPage"><router-link :to="modalInfo.toPage">挑战彩蛋</router-link></div>
      </div>
    </div>
  </div>
  <div class="modal-box video-box" v-if="houseInfo.show">
    <div class="mask"></div>
    <div class="modal-main">
      <div style="width:100%;height:auto;text-align: center;">
        <!-- <video style="height:300px;max-width: 200px;" src="https://ued.united-imaging.com/event/231024/media_assets/uih-video.mp4" controls="controls" /> -->
        <video style="height:300px;max-width: 200px;"
               src="https://ued.united-imaging.com/event/231024/media_assets/uih-video.mp4" 
               controls x5-video-player-fullscreen="true" webkit-playsinline="true" x-webkit-airplay="true" playsinline x5-playsinline>
          您的浏览器不支持此video，请升级浏览器
        </video>
      </div>
      <div class="btn-box" style="margin: 10px 0;">
        <div @click="houseInfo.show = false">继续探索</div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
.loading{
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  background-color: #e3dfd6;
}
.view-box{
  width: 100vw;
  height: 100vh;
  overflow: scroll;
  position: relative;
}
.main-div{
 background: url('../assets/imgs/map.png') no-repeat center center;
 background-size: 100% 100%;
 position: relative;
 overflow:hidden;
}
.role-box{
  background: url(../assets/imgs/llama.png) no-repeat;
  background-size: 100% 100%;
  position:absolute;  
  top:420px;
  left:620px;
  -webkit-animation: shake-bottom 4s linear infinite 5s both;
  animation: shake-bottom 4s linear infinite 5s both;
  .love{
    width: 50px;
    margin-left: -30px;
    transition: display 1s;
    display: none;
    img{
      width: 20px;
      -webkit-animation: duang-duang 0.5s linear infinite both;
      animation: duang-duang 0.5s linear infinite both;
    }
    img:nth-child(2){
      -webkit-animation: duang-duang 0.5s linear infinite 0.5s both;
      animation: duang-duang 0.5s linear infinite 0.5s both;
      width: 15px;
    }
    img:nth-child(3){
      -webkit-animation: duang-duang 0.4s linear infinite 0.1s both;
      animation: duang-duang 0.4s linear infinite 0.1s both;
      width: 10px;
    }
  }
}
.role-dialog{
  position: absolute;
  width: 150px;
  height: 60px;
  top: 360px;
  left: 580px;
  -webkit-animation: duang-duang 2s linear infinite both !important;
  animation: duang-duang 2s linear infinite both !important;
}

.caocao{
  img{
    width: 100%;
    height: 100%;
    -webkit-animation: shake-bottom 4s linear infinite 5s both;
    animation: shake-bottom 4s linear infinite 5s both;
  }
}

.pool{
  position: absolute;
  top: 600px;
  left: 50px;
  width: 200px;
  height: 100px;
  img{
    position: absolute;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    -webkit-animation: shake-bottom 4s linear infinite 6s both;
    animation: shake-bottom 4s linear infinite 6s both;

  }
  img:nth-child(1){
    top: 30px;
    left: 30px;
  }
  img:nth-child(2){
    top: 50px;
    left: 85px;
    -webkit-animation: shake-bottom 3s linear infinite 8s both;
    animation: shake-bottom 3s linear infinite 8s both;
  }
  img:nth-child(3){
    top: 25px;
    left: 120px;
    -webkit-animation: shake-bottom 5s linear infinite both;
    animation: shake-bottom 5s linear infinite both;
  }
}
.block{
  position: absolute;
  width: 55px;
  height: 55px;
  img{
    width: 100%;
    height: 100%;
    -webkit-animation: shake-bottom 3s linear infinite 6s both;
    animation: shake-bottom 3s linear infinite 6s both;
  }
}
.block1{
  top: 40px;
  left: 120px;
}
.block2{
  top: 255px;
  left: 1070px;
}

.grass{
  position: absolute;
  height: 20px;
  width: 30px;
  img{
    width: 100%;
    height: 100%;
    -webkit-animation: shake-bottom 4s linear infinite 2.5s both;
    animation: shake-bottom 4s linear infinite 2.5s both;

  }
}
.grass1{
  top: 315px;
  left: 515px;
}
.grass2{
  top: 365px;
  left: 300px;
}
.three{
  position: absolute;
  width: 110px;
  height: 120px;
  img{
    width: 100%;
    height: 100%;
    -webkit-animation: duang-duang 5s linear infinite both;
    animation: duang-duang 5s linear infinite both;

  }
}

.three1{
  top: 360px;
  left: 70px;
}
.three2{
  top: 630px;
  left: 350px;
}

.house{
  position: absolute;
  top: 140px;
  left: 460px;
  width: 150px;
  height: 150px;
  img{
    width: 100%;
    height: 100%;
    -webkit-animation: duang-duang 4s linear infinite 10s both;
    animation: duang-duang 4s linear infinite 10s both;

  }
}
.leaf{
  position: absolute;
  top: -20px;
  left: 995px;
  width: 190px;
  height: 145px;
  img{
    width: 100%;
    height: 100%;
    -webkit-animation: shake-bottom 4s linear infinite 8s both;
    animation: shake-bottom 4s linear infinite 8s both;

  }
}
.bugbox{
  position: absolute;
  top: 190px;
  left: 1010px;
  width: 30px;
  height: 30px;
  -webkit-animation: falling-hor 1.1s both;
  animation: falling-hor 1.1s both;
  img{
    width: 100%;
    height: 100%;
    -webkit-animation: duang-duang 4s linear infinite both;
    animation: duang-duang 4s linear infinite both;

  }
}
.tail{
  position: absolute;
  top: 140px;
  left: 400px;
  width: 40px;
  height: 40px;
  img{
    width: 100%;
    height: 100%;
    -webkit-animation: shake-bottom 4s linear infinite 3.5s both;
    animation: shake-bottom 4s linear infinite 3.5s both;

  }
}
.sign{
  position: absolute;
  top: 220px;
  left: 140px;
  width: 85px;
  height: 80px;
  img{
    width: 100%;
    height: 100%;
    -webkit-animation: shake-bottom 4s linear infinite 4s both;
    animation: shake-bottom 4s linear infinite 4s both;
  }
}

.luobo{
  position: absolute;
  top: 695px;
  left: 920px;
  width: 35px;
  height: 40px;
  img{
    width: 100%;
    height: 100%;
    -webkit-animation: duang-duang 4s linear infinite both;
    animation: duang-duang 4s linear infinite both;

  }
}

.overturn {
	-webkit-animation: overturn-vertical 0.4s cubic-bezier(0.455, 0.030, 0.515, 0.955) both !important;;
  animation: overturn-vertical 0.4s cubic-bezier(0.455, 0.030, 0.515, 0.955) both !important;;
}
.duang-duang {
  -webkit-animation: duang-duang 4s linear infinite both;
  animation: duang-duang 4s linear infinite both;
}

.dialog{
  position: absolute;
  background: url(../assets/imgs/dialog.png) no-repeat center center;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.5s;
  -webkit-animation: duang-duang 4s linear infinite both;
  animation: duang-duang 4s linear infinite both;
  padding: 0 10px 0 25px;
}

.modal-box{
  position: absolute;
  left: 0;
  top: 0;
  bottom:0;
  right: 0;
  margin: auto;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  transform: perspective(1000);
  -moz-transform: perspective(1000);
  -o-transform: perspective(1000);
  -webkit-transform: perspective(1000);

  .modal-main{
    height:max-content;
    width: 100%;
    background: url('../assets/imgs/modal.png') no-repeat;
    background-size: 100% 100%;
    padding:100px 20%;
    z-index: 1;
  }
  .mask{
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
  }
  .modal-con{
    font-size:20px;
    line-height: 30px;
    transition: all 0.5s;
  }
  .modal-tips{
    font-size: 16px;
    margin-top: 20px;
    font-weight: bold;
  }
  .start-modal{
    margin-top: 5px;
    text-align: right;
    color: #3497fa;
    margin-top: 5px;
  }
  .btn-box{
    display: flex;
    justify-content: space-around;
    margin-top: 30px;
    transition: all 0.5s;
    div{
      text-align: center;
      background: url('../assets/imgs/btn.png') no-repeat;
      background-size: 100% 100%;
      width: 80px;
      height: 24px;
      padding: 20px;
    }
  }
}
</style>
 