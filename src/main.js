import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'font-awesome/css/font-awesome.css';
import CanvasJSChart from '@canvasjs/vue-charts';


createApp(App)
    .use(router)
    .use(CanvasJSChart) //CanvasJS Vuejs Chart Plugin
    .mount('#app');
