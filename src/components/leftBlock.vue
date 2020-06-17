<template>
  <div class="leftBlock">
    <ul class="sidebar-menu">
      <li><router-link to="/" :class="{'sidebar-nav-link':true, 'active': isSelected('invoicing') }">выпуски</router-link></li>
      <li><router-link to="/about" :class="{'sidebar-nav-link':true, 'active': isSelected('invoicing') }">о проекте</router-link></li>
    <li><router-link to="/" :class="{'sidebar-nav-link':true, 'active': isSelected('invoicing') }">приложение</router-link></li>
    <li><router-link to="/contacts" :class="{'sidebar-nav-link':true, 'active': isSelected('invoicing') }">контакты</router-link></li>
  </ul>
  <p> текст что это такое и чего там когда выходит
  </p>
<div class="tag" >
  <span class="tag-item" v-for="item in tags" :key="item.id" v-bind:style="{ fontSize: calculateTagSize(item.count) }">
    <template v-if="$route.params.tagId == item.id">
        <span class="tag-item">{{item.name}}</span>
    </template>
    <template v-else>
      <a class="tag-item" @click="reroute(item.id)" >{{item.name}}</a>
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
      tags: [{name: 'ситар', count: 1, id: 1},
    {name: 'притчи', count: 3, id: 2},
    {name: 'гитара', count: 4, id: 3},
    {name: 'Индия', count: 9, id: 4},
    {name: 'Beatles', count: 78, id: 5},
    {name: 'поэзия', count: 10, id: 6},
    {name: 'Джаз', count: 92, id: 7},
    {name: 'блюз', count: 34, id: 8},
    {name: '60-е', count: 54, id: 9},
    {name: 'кельты', count: 11, id: 10},
    {name: 'T.Rex', count: 62, id: 11},
      {name: 'Буддизм', count: 100, id: 12}
      ],
    }
  },
  mounted() {
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
      var maxVal = Math.max.apply(Math, this.tags.map(function(o) { return o.count; }))
      var minVal = Math.min.apply(Math, this.tags.map(function(o) { return o.count; }))
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
