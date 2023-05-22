import { createWebHistory, createRouter } from "vue-router";
import MainPage from "@/views/MainPage.vue";
import PlayerPage from "@/views/PlayerPage.vue";

const routes = [
	{
		path: "/",
		name: "Effectif",
		component: MainPage,
		props: true
	},
	{
		path: "/player/:id",
		name: "Joueur",
		component: PlayerPage,
		props: true
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes,
	scrollBehavior(to) {
	if (to.hash) {
		return {
			selector: to.hash,
			behavior: 'smooth'
		};
	}
	return { top: 0 }
},
});


export default router;
