import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import $ from 'jquery';

window.jQuery = $;
window.$ = $;

const routes = [
	{
		path: '/',
		component: Home
	},
	{
		path: '/Map',
		name: 'Map',
		component: () => import('../components/Map.vue')
	},
	{
		path: '/ErrorList',
		name: 'ErrorList',
		component: () => import('../components/ErrorList.vue')
	},
	{
		path: '/Login',
		name: 'Login',
		component: () => import('../components/Login.vue')
	},
	{
		path: '/DatenHost',
		name: 'DatenHost',
		component: () => import('../components/DatenHost.vue'),
		props: route => ({ datenHost: JSON.parse(route.query.datenHost) })
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes
});

export default router;
