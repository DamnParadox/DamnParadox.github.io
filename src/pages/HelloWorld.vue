<script setup>
import { ref, reactive, onMounted } from 'vue'
let isWin = ref(localStorage.getItem('helloworld') || false)

let letters = reactive([])
for (let i = 0; i < 32; i++) {
  letters.push(String.fromCharCode(Math.floor(Math.random() * 26) + 97))
}
const resultArr = 'hello'.split('')

let randomArr = new Set()
while (randomArr.size < resultArr.length) {
  randomArr.add(Math.floor(Math.random() * letters.length))
}
randomArr = [...randomArr]
randomArr.sort((a, b) => a - b)

randomArr.forEach((item, index) => {
  letters.splice(item + index, 0, resultArr[index])
})

let indexArr = new Set();
let DomArr = new Set();
const lightLetter = (index) => {
  event.target.style.color = '#ffd386'
  indexArr.add(index);
  DomArr.add(event.target)
  let indexSortArr = [...indexArr].sort((a, b) => a - b)
  let lightArr = [];
  indexSortArr.forEach((item) => {
    lightArr.push(letters[item])
  })
  
  if(resultArr.indexOf(letters[index]) === -1 || DomArr.length > 5){
    DomArr.forEach((item)=>{
      item.style.color = '#000'
    })
    DomArr = new Set()
    indexArr = new Set()
  }

  if(lightArr.join('') === resultArr.join('')){
    isWin.value = true
    window.localStorage.setItem('helloworld', true)
  }
}

const modalInfo = reactive({
  show: true
})

const isLoad = ref(true)
const loadtime = ref(0);
onMounted(() => {
  const loadTimer = setInterval(() => {
    loadtime.value+=2
    if(loadtime.value >= 100){
      isLoad.value = false
      clearInterval(loadTimer)
    }
  }, 20);
})

</script>

<script>    
export default {    
  name: 'HelloWorld'    
}
</script>
<template>
  
  <div class="loading" v-if="isLoad">
    loading...{{ loadtime }}%
  </div>
  
  <div class="result-box" v-if="isWin" v-show="!isLoad">
  
    <div class="card-box">
      <div  class="card-main">
        <div class="line1">hello world~</div>
        <p>你好世界</p>
        <p>你好代码</p>
        <p>你好UIH爱码士</p>
        <p>初心就像一匹野马，上马易，驭马难，恭喜你还能拦住这匹野“码”</p>
        <p>请截图保存当前页面，凭截图前往前台抽奖，祝你好运哦~</p>
        <br />
        <p style="text-align: center;">不忘初心，牢记使命</p>
      </div>
    </div>

  </div>
  <div class="hello-main" v-else  v-show="!isLoad">
    <div class="modal-box video-box" v-if="modalInfo.show">
      <div class="modal-main">
        <div style="width:100%;height:auto">
          找到在代码世界的初心，回忆一下你的第一个程序是什么呢？
        </div>
        <div class="btn-box">
          <div @click="modalInfo.show = false">开始挑战</div>
        </div>
      </div>
    </div>
    <div class="letters-box">
      <span class="letter" v-for="(item,i) in letters" :key="i" @click="lightLetter(i)">{{ item }}</span>
      <span class="letter world" >w</span>
      <span class="letter world" >o</span>
      <span class="letter world" >r</span>
      <span class="letter world" >l</span>
      <span class="letter world" >d</span>
    </div>
  </div>
</template>

<style scoped lang="less">

.loading{
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hello-main{
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  
  background: url('../assets/imgs/gamebox.png') no-repeat center center;
  background-size: 110% 100%;
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
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  .modal-main{
    height:max-content;
    width: 100%;
    background: #fff;
    background: url('../assets/imgs/modal.png') no-repeat;
    background-size: 100% 100%;
    padding:100px 20%;
  }
  .modal-con{
    font-size:20px;
    line-height: 30px;
  }
  .modal-tips{
    font-size: 16px;
    margin-top: 20px;
    font-weight: bold;
  }
  .btn-box{
    display: flex;
    justify-content: space-around;
    margin-top: 30px;
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
.letters-box{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 78%;
  height: 70%;
  margin: 65px auto;
  overflow-y: auto;

 .letter{
    font-size: 42px;
    width: 45px;
    height: 45px;
    margin: 10px 0;
    text-align: center;
 }

.letter.world {
  color: #ffd386;
}
}

.result-box{
  position: absolute;
  width:100vw;
  height: 100vh;
  top: 0;
  left: 0;
 }

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
