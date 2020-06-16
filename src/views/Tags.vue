<template>
<div class="mainList">
  <h1 v-if="tagId=='All'">Выпуски по тэгам</h1>


  <div v-for="(item, key, index) in pagedEntity" :key="key">
  <h3 class="tagName" v-if="tagId=='All'">Тэг {{Object.keys(entity)[index]}} <span class="small gray">({{item.length}} {{getNoun(item.length, 'выпуск', 'выпуска', 'выпусков')}} )</span></h3>
    <h1 v-else>{{pagedNames[index]}}</h1>


    <itemList v-for="(release, index) in item" :key="index" :itemEntity='release'/>
  </div>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page.sync="currentPage"
    :page-sizes="[4, 8, 24, 48]"
    :page-size.sync="itemsPerPage"
    layout="prev, pager, next, sizes"
    :total="Object.keys(entity).length">
  </el-pagination>
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
      tagNames: [],
      itemsPerPage: 8,
      currentPage: 1,
    }
  },
  mounted() {
    this.$root.$on('handleLayoutChange', data => {
        this.layout = data
    });
},
computed: {
  pagedEntity () {
    let ent = Object.keys(this.entity).map(i => this.entity[i]);
    return ent.slice(((this.currentPage - 1) * this.itemsPerPage), (this.itemsPerPage * this.currentPage))
  },
  pagedNames() {
    let tagN = Object.keys(this.entity);
    return tagN.slice(((this.currentPage - 1) * this.itemsPerPage), (this.itemsPerPage * this.currentPage));
  }
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
      },
      handleSizeChange(val) {
        this.itemsPerPage = val;
      },
      handleCurrentChange(val) {
        this.currentPage = val;
      },
  },
  watch: {
    'tagId': function (newValue) {
      //let self = this
      if (newValue == "All"){
        this.entity = require("../assets/tags.json");
        // this.tagNames = Object.keys(this.entity)
        // this.entity = Object.keys(this.entity).map(i => this.entity[i])
      }
      else {
        this.entity = require("../assets/tag20.json");
        // this.tagNames = Object.keys(this.entity)
        // this.entity = Object.keys(this.entity).map(i => this.entity[i])
      }
    },
  }
};
</script>
