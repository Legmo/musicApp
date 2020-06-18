<template>
  <div class="results">
    <h1>Результаты поиска {{localQuery}}</h1>
    <div v-if="Object.keys(entity).length == 0">
      Ничего не найдено
    </div>
    <div v-else>
      <div v-for="item in pagedEntity" :key="item.number">
        <itemList :itemEntity='item' />
      </div>
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
  name: "Results",
  props: {
    searchQuery: {
      type: String,
      default: ''
    },
  },
  components: {
    itemList
  },
  data() {
    return {
      itemsPerPage: 8,
      currentPage: 1,
      entity: [],
      localQuery: ''
    }
  },
  computed: {
    pagedEntity () {
      return this.entity.slice(((this.currentPage - 1) * this.itemsPerPage), (this.itemsPerPage * this.currentPage))
    },
  },
  mounted() {
    if (this.searchQuery == '') {
      this.localQuery = this.$route.query.text
    } else {
      this.localQuery = this.searchQuery;
    }
  },
  methods: {
    handleSizeChange(val) {
      this.itemsPerPage = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
  },
  watch: {
    'localQuery': function (newValue) {
      let self = this;
     this.$http.get(`${this.$rootApiPath}releases/search?text=${newValue}&_format=json`).then(function (e) {
       self.entity = e.body;
     }).catch(function () {
       self.entity = require("../assets/search_cogo.json");
       self.$message.error("There was an error while reading data");
     });
    },
  }
};
</script>
