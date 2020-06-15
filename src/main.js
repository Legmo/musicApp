import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueResource from 'vue-resource'
import APlayer from "@moefe/vue-aplayer";
APlayer.disableVersionBadge = true;
import ElementUI from "element-ui";


import "element-ui/lib/theme-chalk/index.css";
import "./assets/css/site.scss";

var rootPath = '';
Vue.prototype.$rootPath = rootPath;
Vue.prototype.$rootApiPath = rootPath + '/api/';

Vue.use(VueResource);
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
