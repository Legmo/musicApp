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

import iconList from '@/assets/icons/icon_layout-list.svg?inline'
import iconTiles from '@/assets/icons/icon_layout-tiles.svg?inline'
import iconAccordion from '@/assets/icons/icon_accordion.svg?inline'
import iconPlayerLeft from '@/assets/icons/icon_player-left.svg?inline'
import iconPlay from '@/assets/icons/icon_player-play.svg?inline'
import iconRepeat from '@/assets/icons/icon_player-repeat.svg?inline'
import iconPlayerRight from '@/assets/icons/icon_player-right.svg?inline'
import iconSound from '@/assets/icons/icon_player-sound.svg?inline'
import iconSoundHigh from '@/assets/icons/icon_player-sound-high.svg?inline'
import iconSortingDown from '@/assets/icons/icon_sorting_down.svg?inline'
import iconSortingUp from '@/assets/icons/icon_sorting_up.svg?inline'

Vue.component('icon-list', iconList);
Vue.component('icon-tiles', iconTiles);
Vue.component('icon-accordion', iconAccordion);
Vue.component('icon-player-left', iconPlayerLeft);
Vue.component('icon-play', iconPlay);
Vue.component('icon-repeat', iconRepeat);
Vue.component('icon-player-right', iconPlayerRight);
Vue.component('icon-sound', iconSound);
Vue.component('icon-sound-high', iconSoundHigh);
Vue.component('icon-sorting-down', iconSortingDown);
Vue.component('icon-sorting-up', iconSortingUp);

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

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  components: {},
  render: h => h(App)
}).$mount("#app");
