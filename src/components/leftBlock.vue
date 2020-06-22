<template>
  <div class="leftBlock">
    <ul class="sidebar-menu">
      <li><router-link to="/" :class="{'sidebar-nav-link':true, 'active': isSelected('link') }">Выпуски</router-link></li>
      <li><router-link to="/about" :class="{'sidebar-nav-link':true, 'active': isSelected('link') }">О проекте</router-link></li>
    <li><router-link to="/" :class="{'sidebar-nav-link':true, 'active': isSelected('link') }">Приложение</router-link></li>
    <li><router-link to="/contacts" :class="{'sidebar-nav-link':true, 'active': isSelected('link') }">Контакты</router-link></li>
  </ul>
    <div class="about-txt">
      <p>Программа музыканта Бориса Гребенщикова.</p>
      <p>Выходит еженедельно на «Радио России» <br>и на радиостанции «Культура».</p>
    </div>
<div class="tag" >
  <span class="tag-item" v-for="item in tags" :key="item.id" v-bind:style="{ fontSize: calculateTagSize(item.releases_number) }">
    <template v-if="$route.params.tagId == item.id">
        <span class="tag-item">{{item.name}}</span>
    </template>
    <template v-else>
      <a class="tag-item" @click="reroute(item.id)" >{{item.title}}</a>
    </template>
  </span>
  <span class="tag-item tag-item--all">
    <template v-if="$route.params.tagId == 'All'">
        <span class="tag-item">все тэги</span>
    </template>
    <template v-else>
      <a class="tag-item" @click="reroute('All')" >все тэги</a>
    </template>
  </span>
</div>
<div class="">
соцсети</div>
  </div>
</template>

<script>
export default {
  name: "leftBlock",
  props: {
  },
  data() {
    return {
      tags: []
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
    isSelected(val) {
      let selected = false
      if (this.$route.name == val) {
        selected = true
      }
      return selected
    },
    calculateTagSize(count) {
      let sizeDepending=''
      var maxVal = Math.max.apply(Math, this.tags.map(function(o) { return parseInt(o.releases_number) ; }))
      var minVal = Math.min.apply(Math, this.tags.map(function(o) { return parseInt(o.releases_number); }))
      var baseFont ='14px';
      var fontsplit = baseFont.match(/([0-9]+)\s?([a-z]+)/);
      var minFont = parseInt(fontsplit[1]);
      var maxFont = parseInt(fontsplit[1])*3;
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
