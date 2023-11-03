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
			path: '/about', // Der Pfad für die About-Komponente
			component: () => import('../views/About.vue')
		},
	],
})

export default router
