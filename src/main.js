import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueResource from 'vue-resource'
import APlayer from "@moefe/vue-aplayer";
APlayer.disableVersionBadge = true;
import ElementUI from "element-ui";
import locale from 'element-ui/lib/locale/lang/en'

locale.el.pagination.pagesize = ' на странице'


import "element-ui/lib/theme-chalk/index.css";
import "./assets/css/site.scss";

var rootPath = '';
Vue.prototype.$rootPath = rootPath;
Vue.prototype.$rootApiPath = rootPath + '/api/';

Vue.use(VueResource);
Vue.use(ElementUI, { locale });
Vue.use(APlayer, {
  productionTip: false // disable console output
});

// Vue.http.options.root = '/';
// Vue.http.options.headers = {
//     "Expires": "-1",
//     "Cache-Control": "no-cache",
//     "Pragma": "no-cache"
// };
// Vue.http.headers.common['Authorization'] = 'Basic ' + btoa("i20:devsites");

Vue.config.productionTip = false;

new Vue({
  router,
  components: {},
  render: h => h(App)
}).$mount("#app");
