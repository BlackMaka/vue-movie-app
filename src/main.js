import { createApp } from 'vue';
import App from './App.vue';
import router from './routes/index.js';
import store from './store/index.js'
import loadImage from  './plugins/loadImage'
//import store from './store'           //index.js이름은 생략가능
createApp(App)
.use(router) // $route, $router
.use(store)  // $store
.use(loadImage) // $loadImage
.mount('#app');
