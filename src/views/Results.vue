<template>
  <div class="results">
    <el-row v-loading="loading">
    <h1>Результаты поиска {{localQuery}}</h1>
    <div v-if="Object.keys(entity).length == 0">
      Ничего не найдено
    </div>
    <div v-else>
      <div v-for="item in entity" :key="item.number">
        <itemList :itemEntity='item' />
      </div>
    </div>
  </el-row>
    <pager  :pager="pager"/>
  </div>
</template>

<script>
import itemList from "@/components/itemList.vue";
import pager from "@/components/pager.vue";

export default {
  name: "Results",
  props: {
    searchQuery: {
      type: String,
      default: ''
    },
  },
  components: {
    itemList,
    pager
  },
  data() {
    return {
      loading: true,
      itemsPerPage: 8,
      currentPage: 0,
      entity: [],
      localQuery: '',
      pager: {
        current_page: 0,
        items_per_page: 8,
        total_pages: null
      }
    }
  },
  computed: {
  },
  mounted() {
    if (this.searchQuery == '') {
      this.localQuery = this.$route.query.text
    } else {
      this.localQuery = this.searchQuery;
    }
  },
  methods: {
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
      this.getPageData(this.localQuery);
    },
    getPageData(val) {
      let self = this;
       this.$http.get(`${this.$rootApiPath}releases/search?text=${val}&items_per_page=${this.itemsPerPage}&page=${this.currentPage}&_format=json`).then(function (e) {
         self.entity = e.body.rows;
         self.pager = e.body.pager;
         this.loading = false;
       }).catch(function () {
         self.entity = require("../assets/search_cogo.json").rows;
         self.pager = require("../assets/search_cogo.json").pager;
         this.loading = false;
         self.$message.error("There was an error while reading data");
       });
    },
  },
  watch: {
    'localQuery': function (newValue) {
     this.getPageData(newValue)
    },
    '$route.query.text': function(newValue) {
      this.localQuery = newValue;
      this.loading = true;
    },
    'currentPage': function () {
      this.getPageData(this.localQuery);
    },
  }
};
</script>
