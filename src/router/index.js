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
	scrollBehavior(to, savedPosition) {
	if (to.hash) {
		return {
			el: to.hash,
			top: 75
		};
	} else if (savedPosition){
		return savedPosition
	} else {
		return { top: 0 }
	}
},
});


export default router;
