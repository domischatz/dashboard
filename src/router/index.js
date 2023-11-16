import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/', // Der Pfad, unter dem die Home-Komponente angezeigt wird
			component: Home
		},
		{
			path: '/chart1', // Der Pfad für die About-Komponente
			component: () => import('../components/Chart1.vue')
		},
		{
			path: '/Map',
			component: () => import('../components/Map.vue')
		},
	],
})

export default router
