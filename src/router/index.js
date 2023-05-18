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
	routes
});

router.beforeEach((to, from, next) =>{
	let documentTitle = `${process.env.VUE_APP_TITLE} - ${to.name}`;
	if (to.params.title){
		documentTitle += ` - ${to.params.title}`
	}
	document.title = documentTitle;
	next();
})

export default router;
