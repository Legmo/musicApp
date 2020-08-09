<template>
  <div class="leftBlock">
    <ul class="sidebar-menu">
      <li><router-link to="/" :class="{'sidebar-nav-link':true}" title="Список выпусков">Выпуски</router-link></li>
      <li><router-link :to="{ name: 'About', params: { path: 'about' } }" :class="{'sidebar-nav-link':true}"  title="Подробнее о передаче и сайте">О проекте</router-link></li>
      <li><router-link :to="{ name: 'About', params: { path: 'app' } }" :class="{'sidebar-nav-link':true}"  title="Приложения для мобильных">Приложение</router-link></li>
      <li><router-link :to="{ name: 'About', params: { path: 'contacts' } }" :class="{'sidebar-nav-link':true}"  title="Как с нами связаться?">Контакты</router-link></li>
    </ul>
    <div class="about-txt">
      <p>Программа Бориса Гребенщикова. <br>Выходит еженедельно <br>на «<a href="https://www.radiorus.ru/brand/57083/episodes" target="_blank" title="Страница передачи на сайте «Радио России»">Радио России</a>» <br>и радио «<a href="http://www.cultradio.ru/brand/about/id/57083/" target="_blank" title="Страница передачи на сайте «Радио Культура»">Культура</a>».</p>
    </div>
  <div class="tag" >
  <span class="tag-item" v-for="item in tags" :key="item.id" v-bind:style="{ fontSize: calculateTagSize(item.releases_number) }">
    <template v-if="$route.params.tagId == item.id">
        <span class="tag-item">{{item.name}}</span>
    </template>
    <template v-else>
      <a class="tag-item" @click="reroute(item.id)" v-html="item.title" ></a>
    </template>
  </span>
  <span class="tag-item tag-item--all">
    <template v-if="$route.params.tagId == 'All'">
        <span class="tag-item">все тэги</span>
    </template>
    <template v-else>
      <a title="Список всех тэгов" class="tag-item" @click="reroute('All')">все тэги</a>
    </template>
  </span>
</div>
<div class="bottom-links">
  <a href="https://vk.com/aerostatbg" target="_blank" title="Группа в Контакте" class="vk">
    <icon-social-vk />
  </a>
  <a href="https://apps.apple.com/us/app/aerostat-avtorskaa-programma/id1035297304" target="_blank" title="Приложение для iOS">
    <icon-app-apple />
  </a>
  <a href="https://play.google.com/store/apps/details?id=ru.mobileup.aerostat" target="_blank" title="Приложение для Android">
    <icon-app-google />
  </a>
</div>
  </div>
</template>

<script>
export default {
  name: "leftBlock",
  props: {
  },
  data() {
    return {
      tags: [],
    }
  },
  mounted() {
    var self = this;
    this.$http.get(`${this.$rootApiPath}popular-tags?_format=json`).then(function (e) {
      self.tags = e.body;
    }).catch(function () {
      self.tags = require("../assets/popular-tags.json");
      self.$message.error("There was an error while reading data");
    });
  },
  methods: {
    calculateTagSize(count) {
      let sizeDepending=''
      var maxVal = Math.max.apply(Math, this.tags.map(function(o) { return parseInt(o.releases_number) ; }))
      var minVal = Math.min.apply(Math, this.tags.map(function(o) { return parseInt(o.releases_number); }))
      var baseFont ='14px';
      var fontsplit = baseFont.match(/([0-9]+)\s?([a-z]+)/);
      var minFont = parseInt(fontsplit[1]);
      var maxFont = parseInt(fontsplit[1])*2;
      var fontUnits = fontsplit[2];
      var fontSize = (((count - minVal )/(maxVal - minVal)) * (maxFont - minFont)) + minFont;
      sizeDepending = fontSize+fontUnits;
    return sizeDepending
  },
  reroute(id) {
    let tagId
    if(isNaN(id)){
      tagId = id
    }else {
      tagId = '' + id;
    }
      this.$router.push({name: 'Tags', params: { tagId: tagId }});
  },
  }
};
</script>
