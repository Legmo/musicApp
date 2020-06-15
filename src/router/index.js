import Vue from "vue";
import VueRouter from "vue-router";
import List from "../views/List.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "List",
    component: List
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import("../views/About.vue")
  },
  {
    path: "/contacts",
    name: "Contacts",
    component: () =>
      import("../views/Node.vue")
  },
  {
    path: "/node",
    name: "Article",
    props: true,

    component: () => import("../views/Node.vue")
  },
  {
    path: "/results",
    name: "Results",
    props: true,
    component: () => import( "../views/Results.vue")
  },
  {
    path: "/tags/:tagId",
    name: "Tags",
    props: true,
    component: () => import( "../views/Tags.vue")
  }

];

const router = new VueRouter({
  routes,
  mode: 'history'
});


export default router;
