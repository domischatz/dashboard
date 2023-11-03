import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			component: Home
		},
		{
			path: '/about',
			component: () => import('../views/About.vue')
		},
	],
})

export default router