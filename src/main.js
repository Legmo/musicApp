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

import iconAccordion     from '@/assets/icons/icon_accordion.svg?inline'
import iconAppApple      from '@/assets/icons/icon_app-apple.svg?inline'
import iconAppGoogle     from '@/assets/icons/icon_app-google.svg?inline'
import iconDownload      from '@/assets/icons/icon_download.svg?inline'
import iconDownloadSmall from '@/assets/icons/icon_download_small.svg?inline'
import iconList          from '@/assets/icons/icon_layout-list.svg?inline'
import iconTiles         from '@/assets/icons/icon_layout-tiles.svg?inline'
import iconPlayerLeft    from '@/assets/icons/icon_player-left.svg?inline'
import iconPlay          from '@/assets/icons/icon_player-play.svg?inline'
import iconPause         from '@/assets/icons/icon_player-pause.svg?inline'
import iconRepeat        from '@/assets/icons/icon_player-repeat.svg?inline'
import iconPlayerRight   from '@/assets/icons/icon_player-right.svg?inline'
import iconSearch        from '@/assets/icons/icon_search.svg?inline'
import iconSound         from '@/assets/icons/icon_player-sound.svg?inline'
import iconSoundHigh     from '@/assets/icons/icon_player-sound-high.svg?inline'
import iconSortingDown   from '@/assets/icons/icon_sorting_down.svg?inline'
import iconSortingUp     from '@/assets/icons/icon_sorting_up.svg?inline'
import iconSocialVK      from '@/assets/icons/icon_social-vk.svg?inline'

Vue.component('icon-accordion',      iconAccordion);
Vue.component('icon-app-apple',      iconAppApple);
Vue.component('icon-app-google',     iconAppGoogle);
Vue.component('icon-download',       iconDownload);
Vue.component('icon-download-small', iconDownloadSmall);
Vue.component('icon-list',           iconList);
Vue.component('icon-play',           iconPlay);
Vue.component('icon-pause',          iconPause);
Vue.component('icon-player-left',    iconPlayerLeft);
Vue.component('icon-player-right',   iconPlayerRight);
Vue.component('icon-repeat',         iconRepeat);
Vue.component('icon-search',         iconSearch);
Vue.component('icon-social-vk',      iconSocialVK);
Vue.component('icon-sorting-down',   iconSortingDown);
Vue.component('icon-sorting-up',     iconSortingUp);
Vue.component('icon-sound',          iconSound);
Vue.component('icon-sound-high',     iconSoundHigh);
Vue.component('icon-tiles',          iconTiles);

var rootPath = '';
Vue.prototype.$rootPath = rootPath;
Vue.prototype.$rootApiPath = rootPath + '/api/';

Vue.use(VueResource);
Vue.use(ElementUI, { locale });
Vue.use(APlayer, {
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
