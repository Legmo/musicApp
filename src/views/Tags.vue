<template>
  <div  :class="['mainList', 'tags-list-all', layout === 'grid' ? 'view-grid' : 'view-list']">
    <h1 v-if="tagId=='All'" class="titleOne">Выпуски по тэгам</h1>
    <div v-for="(item, key) in cloneEntity" :key="key" :class="{'tag-header':item.additionalTagInfo, 'test': true}">
      <h4 class="titleTwo">
        Тэг {{key}}
        <span class="small gray">
          ({{item.releases.length}}
          {{getNoun(item.releases.length, 'выпуск', 'выпуска', 'выпусков')}} )
        </span>
      </h4>
      <itemList v-for="(release, index) in item.releases" :itemEntity="release" :layout="layout" :key="index"/>
    </div>
    <pager  :pager="pager"/>
  </div>
</template>

<script>
import itemList from "@/components/itemList.vue";
import pager from "@/components/pager.vue";
import _ from 'lodash'

export default {
  name: "Tags",
  props: {
    tagId: {
      type: String,
    default: 'All'
  }
  },
  components: {
    itemList,
    pager
  },
  data() {
    return {
      entity: {},
      layout: 'list',
      cloneEntity: {},
      tagNames: [],
      itemsPerPage: 8,
      currentPage: 0,
      pager: {
        current_page: 0,
        items_per_page: 8,
        total_pages: null
      }
    }
  },
  mounted() {
    this.$store.watch(() =>  this.$store.state.layout, newValue => {
      this.layout = newValue
    })
    this.identifyTags(this.tagId)
},
computed: {
},
  methods: {
    rewriteEntityForPagination(){
      this.cloneEntity = _.cloneDeep(this.entity);
    },
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
      addPage() {
        this.currentPage = this.pager.current_page +1
      },
      reducePage() {
        this.currentPage = this.pager.current_page -1
      },
      changePage(val) {
        this.currentPage = val-1
      },
      handleSizeChange(val) {
        this.itemsPerPage = val;
        this.identifyTags(this.tagId);
      },
      identifyTags(val) {
        let self = this;
        if (val == "All"){
         this.$http.get(`${this.$rootApiPath}releases/tags?_format=json&items_per_page=${this.itemsPerPage}&page=${this.currentPage}`).then(function (e) {
           self.entity = e.body.rows;
           self.pager = e.body.pager;
         }).catch(function () {
           self.entity = require("../assets/tags-new.json").rows;
           self.pager = require("../assets/tags-new.json").pager;
           self.$message.error("There was an error while reading data");
         }).finally(function () {
           this.rewriteEntityForPagination()
         });
        }
        else {
          this.$http.get(`${this.$rootApiPath}releases/tags/${val}?_format=json&items_per_page=${this.itemsPerPage}&page=${this.currentPage}`).then(function (e) {
            self.entity = e.body.rows;
            self.pager = e.body.pager;
          }).catch(function () {
            self.entity = require("../assets/tag20-new.json").rows;
            self.pager = require("../assets/tag20-new.json").pager;
            self.$message.error("There was an error while reading data");
          }).finally(function () {
            this.rewriteEntityForPagination()
          });
        }

      },
  },
  watch: {
    'tagId': function (newValue) {
      this.currentPage = 0;
      this.identifyTags(newValue)
    },
    'currentPage': function () {
      this.identifyTags(this.tagId);
    },
  }
};
</script>
