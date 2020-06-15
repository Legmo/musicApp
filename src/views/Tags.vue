<template>
<div class="mainList">
  <h1 v-if="tagId=='All'">Выпуски по тэгам</h1>


  <div v-for="(item, key, index) in entity" :key="key">
  <h3 class="tagName" v-if="tagId=='All'">Тэг {{Object.keys(entity)[index]}} <span class="small gray">({{item.length}} {{getNoun(item.length, 'выпуск', 'выпуска', 'выпусков')}} )</span></h3>
    <h1 v-else>{{Object.keys(entity)[index]}}</h1>


    <itemList v-for="(release, index) in item" :key="index" :itemEntity='release'/>
  </div>
</div>
</template>

<script>
import itemList from "@/components/itemList.vue";

export default {
  name: "Tags",
  props: {
    tagId: {
      type: String,
    default: 'All'
  }
  },
  components: {
    itemList
  },
  data() {
    return {
      entity: require("../assets/tags.json"),
    }
  },
  mounted() {
    this.$root.$on('handleLayoutChange', data => {
        this.layout = data
    });
},
  methods: {
    getNoun(number, one, two, five) {
        let n = Math.abs(number);
        n %= 100;
        if (n >= 5 && n <= 20) {
          return five;
        }
        n %= 10;
        if (n === 1) {
          return one;
        }
        if (n >= 2 && n <= 4) {
          return two;
        }
        return five;
      }
  },
  watch: {
    'tagId': function (newValue) {
      if (newValue == "All")
        this.entity = require("../assets/tags.json");
      else {
        this.entity = require("../assets/tag20.json");
      }
    },
  }
};
</script>
