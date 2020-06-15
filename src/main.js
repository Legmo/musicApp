import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import APlayer from "@moefe/vue-aplayer";
APlayer.disableVersionBadge = true;
import ElementUI from "element-ui";


import "element-ui/lib/theme-chalk/index.css";
import "./assets/css/site.scss";


Vue.use(ElementUI);
Vue.use(APlayer, {
  productionTip: false // disable console output
});

Vue.config.productionTip = false;

new Vue({
  router,
  components: {},
  render: h => h(App)
}).$mount("#app");
