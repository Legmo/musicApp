import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueResource from 'vue-resource'
import APlayer from "@moefe/vue-aplayer";
APlayer.disableVersionBadge = true;
import ElementUI from "element-ui";
import locale from 'element-ui/lib/locale/lang/en'
import VueLodash from 'vue-lodash'
import lodash from 'lodash'
import store from './utils/authStore';

locale.el.pagination.pagesize = ' на странице'


import "element-ui/lib/theme-chalk/index.css";
import "./assets/css/site.scss";

var rootPath = '';
Vue.prototype.$rootPath = rootPath;
Vue.prototype.$rootApiPath = rootPath + '/api/';

Vue.use(VueResource);
Vue.use(ElementUI, { locale });
Vue.use(APlayer, {
  defaultCover: 'https://github.com/u3u.png',
  productionTip: false // disable console output
});
Vue.use(VueLodash, {lodash: lodash })
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
  store,
  components: {},
  render: h => h(App)
}).$mount("#app");
