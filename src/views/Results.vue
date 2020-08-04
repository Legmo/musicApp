<template>
  <div class="results">
    <h1>Результаты поиска {{localQuery}}</h1>
    <div v-if="Object.keys(entity).length == 0">
      Ничего не найдено
    </div>
    <div v-else>
      <div v-for="item in entity" :key="item.number">
        <itemList :itemEntity='item' />
      </div>
    </div>
    <!-- <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="[4, 8, 24, 48]"
      :page-size.sync="itemsPerPage"
      layout="prev, pager, next, sizes"
      :total="Object.keys(entity).length">
    </el-pagination> -->
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
      this.currentPage = this.pager.current_page +1
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
       }).catch(function () {
         self.entity = require("../assets/search_cogo.json").rows;
         self.pager = require("../assets/search_cogo.json").pager;
         self.$message.error("There was an error while reading data");
       });
    },
  },
  watch: {
    'localQuery': function (newValue) {
     //  let self = this;
     // this.$http.get(`${this.$rootApiPath}releases/search?text=${newValue}&_format=json`).then(function (e) {
     //   self.entity = e.body.rows;
     // }).catch(function () {
     //   self.entity = require("../assets/search_names.json").rows;
     //   self.$message.error("There was an error while reading data");
     // });
     this.getPageData(newValue)
    },
    'currentPage': function () {
      this.getPageData(this.localQuery);
    },
  }
};
</script>
