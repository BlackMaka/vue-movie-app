import { createRouter, createWebHashHistory } from 'vue-router';
import Home from './Home';
import About from './About';
import Movie from './Movie';
import NotFound from './NotFound'
export default createRouter({
  // hash 모드 , 
  history : createWebHashHistory(),
  scrollBehavior(to, from, savedPosition){
    return {top : 0}
  },
  routes : [
    {
      path:'/',
      component : Home
    },
    {
      path:'/about',
      component : About
    },
    {
      path:'/movie/:id',
      component : Movie
    },
    { //ㄴㅏ머지 모든페이지
      path:'/:notFount(.*)',
      component:NotFound
    }
  ]
})