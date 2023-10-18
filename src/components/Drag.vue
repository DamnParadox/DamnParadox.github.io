<template>    
  <div class="default-drag-comp"    
    :style="{width: props.w + 'px',height: props.h + 'px',top: ny + 'px',left: nx + 'px',zIndex: props.zIndex}"    
    @touchstart="down"    
    @touchmove="move"    
    @touchend="end"    
    ref="dragComp"    
  >    
    <slot></slot>    
  </div>    
</template>    
<script setup>    
import { ref,reactive,onMounted, watch} from 'vue'    
// eslint-disable-next-line    
const props = defineProps({    
  w: {    
    type: Number,    
    default: 100    
  },    
  h: {    
    type: Number,    
    default: 100    
  },    
  x: {    
    type: Number,    
    default: 0    
  },    
  y: {    
    type: Number,    
    default: 0    
  },    
  zIndex: {    
    type: Number,    
    default: 1000    
  }    
})    
// eslint-disable-next-line    
const emit = defineEmits(['update:x','update:y','dragstart','draging','dragend']);    
const flags = ref(false)    
const position = reactive({ x: 0, y: 0 })    
const nx = ref(props.x)    
const ny = ref(props.y)    
let parentElement = null;    
let scrollElement = null;    
const dragComp = ref(null);    
let timer = null;
watch(()=>props.x,(newVal)=>{
 nx.value = newVal
})
watch(()=>props.y,(newVal)=>{
 ny.value = newVal
})
// 按压    
const down = () => {    
  flags.value = true;    
  var touch;    
  if (event.touches) {    
    touch = event.touches[0];    
  } else {    
    touch = event;    
  }    
  position.x = touch.pageX;
  position.y = touch.pageY;
  emit('dragstart',{el: dragComp.value,x:nx.value,y:ny.value})  
  timer = setInterval(() => {
    isScrollPage();
  }, 50);  
}    
// 拖动    
const move = (event) => {   
  event.preventDefault();    
  if (flags.value) {    
    var touch;    
    if (event.touches) {    
      touch = event.touches[0];    
    } else {    
      touch = event;    
    }   
    let newX = nx.value + (touch.pageX - position.x);    
    let newY = ny.value + (touch.pageY - position.y);
    if(newX < 0) newX = 0;
    if(newY < 0) newY = 0;
    if(newX + props.w > parentElement.clientWidth) newX = parentElement.clientWidth - props.w;
    if(newY + props.h > parentElement.clientHeight) newY = parentElement.clientHeight - props.h;
    nx.value = newX;    
    ny.value = newY; 
    emit('update:x', nx.value);
    emit('update:y', ny.value);
    position.x = touch.pageX; 
    position.y = touch.pageY;      
  }    
  emit('draging',{el:dragComp.value,x:nx.value,y:ny.value})    
}    
//释放    
const end = () => {    
  flags.value = false;    
  emit('dragend',{el: dragComp.value,x:nx.value,y:ny.value})    
} 
// 判断是否需要滚动滚动元素  
const isScrollPage = () => {
  if(!flags.value || !scrollElement){
    clearInterval(timer);
    return;
  }  
  if (nx.value + props.w > scrollElement.scrollLeft + scrollElement.clientWidth) { 
    if(nx.value + 10 + props.w < parentElement.clientWidth){
      nx.value += 10; 
      scrollElement.scrollLeft += 10;
      emit('update:x', nx.value);
    }
  } 
  if (nx.value < scrollElement.scrollLeft) { 
    if(nx.value - 10 > 0){
      nx.value -= 10; 
      scrollElement.scrollLeft -= 10;
      emit('update:x', nx.value);
    }
  }  
  if (ny.value + props.h >= scrollElement.scrollTop + scrollElement.clientHeight) {
    if(ny.value + 10 + props.h < parentElement.clientHeight){
      ny.value += 10;  
      scrollElement.scrollTop += 10;
      emit('update:y', ny.value);
    } 
  } 
  if (ny.value < scrollElement.scrollTop) { 
    if(ny.value - 10 > 0){
      ny.value -= 10; 
      scrollElement.scrollTop -= 10;
      emit('update:y', ny.value);
    }
  } 
}

onMounted(() => {    
  // 获取相对定位的元素和滚动元素
  parentElement = dragComp.value.offsetParent;    
  let el = parentElement;    
  while (el) {    
    if (el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth) {    
      scrollElement = el;    
      break;    
    }    
    el = el.parentElement;    
  }  
  console.log(dragComp.value);
  console.log(parentElement,scrollElement);  
})    
</script>    
<script>    
export default {    
  name: 'DefaultDrag'    
}    
</script>    
<style scoped lang="less">    
.default-drag-comp{    
  position: absolute;    
}    
</style>    
