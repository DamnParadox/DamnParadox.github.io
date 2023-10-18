
import {createRouter,createWebHashHistory} from 'vue-router'

// import HomePage from './pages/Home.vue'
// import BugPage from './pages/BugPage.vue'
// import HelloWorld from './pages/HelloWorld.vue'
// import PuzzlePage from './pages/PuzzlePage.vue'
// import FoodPage from './pages/FoodPage.vue'
// import CaoPage from './pages/CaoPage.vue'
// import IndPage from './pages/IndPage.vue'
// import TimePage from './pages/TimePage.vue'

const  HomePage = import('./pages/Home.vue') 
const  BugPage = import('./pages/BugPage.vue') 
const  HelloWorld = import('./pages/HelloWorld.vue') 
const  PuzzlePage = import('./pages/PuzzlePage.vue') 
const  FoodPage = import('./pages/FoodPage.vue') 
const  CaoPage = import('./pages/CaoPage.vue') 
const  IndPage = import('./pages/IndPage.vue') 
const  TimePage = import('./pages/TimePage.vue')

const routes = [
  { 
    path: '/', 
    component: HomePage, 
  },
  {
    path:'/bug',
    component:BugPage
  },
  {
    path:'/helloworld',
    component:HelloWorld
  },
  {
    path:'/puzzle',
    component:PuzzlePage
  },
  {
    path:'/food',
    component:FoodPage
  },
  {
    path:'/cao',
    component:CaoPage
  },
  {
    path:'/ind',
    component:IndPage
  },
  {
    path:'/time',
    component:TimePage
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  base: process.env.NODE_ENV === 'production'?'/event/231024/':'/',
  routes,
})

// 函数：判断是不是移动端的飞书浏览器
const isFeishu = () => {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.indexOf('feishu') > -1) {
    return true;
  }
  return false;
}

router.beforeEach((to, from, next) => {
  if (isFeishu()) {
    if (to.path === '/ind') {
      next()
    } else {
      next('/ind')
    }
  } else if (localStorage.getItem('bug')) {
    if (to.path === '/bug') {
      next()
    } else {
      next('/bug')
    }
  } else if (localStorage.getItem('helloworld')) {
    if (to.path === '/helloworld') {
      next()
    } else {
      next('/helloworld')
    }
  } else if(localStorage.getItem('puzzle')){
    if (to.path === '/puzzle') {
      next()
    } else {
      next('/puzzle')
    }
  } else if(localStorage.getItem('food')){
    if (to.path === '/food') {
      next()
    } else {
      next('/food')
    }
  } else if(localStorage.getItem('cao')){
    if (to.path === '/cao') {
      next()
    } else {
      next('/cao')
    }
  } else {
    next()
  }
});


export default router