import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/', // Der Pfad, unter dem die Home-Komponente angezeigt wird
			component: Home
		},
		{
			path: '/chart1', // Der Pfad für die About-Komponente
			component: () => import('../views/Chart1.vue')
		},
	],
})

export default router
