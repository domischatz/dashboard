import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Stellen Sie sicher, dass der richtige Router-Import vorhanden ist.
import 'font-awesome/css/font-awesome.css';
import CanvasJSChart from '@canvasjs/vue-charts';

createApp(App)
    .use(router)
    .use(CanvasJSChart) // Installieren Sie das CanvasJS Vuejs Chart Plugin
    .mount('#app');