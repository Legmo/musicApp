<template>
    <div>
        <div  :class="['mainList', layout === 'grid' ? 'view-grid' : 'view-list']">
            <div v-for="item in entity" :key="item.number">
                <itemList :itemEntity='item' :layout="layout"/>
            </div>
        </div>
        <!-- <div class="el-pagination">
          <button type="button" :disabled="pager.current_page == 0" class="btn-prev" @click="reducePage()"><i class="el-icon el-icon-arrow-left"></i></button>
          <ul class="el-pager">
            <li v-for="page in pager.total_pages" :class="{'number':true, 'active': page == pager.current_page+1}" :key="page">
              <template v-if="page == pager.current_page+1">{{page}}</template>
              <template v-else><span v-on:click="currentPage = page-1">{{page}}</span></template>
            </li>
          </ul>
          <button type="button" :disabled="pager.current_page == pager.total_pages" class="btn-next" @click="addPage()"><i class="el-icon el-icon-arrow-right"></i></button>
          <span class="el-pagination__sizes">
            <el-select v-model="pager.items_per_page" placeholder="Select" @change="handleSizeChange">
             <el-option v-for="size in pageSizes"
               :key="size"
               :label="`${size} на странице`"
               :value="size">
             </el-option>
           </el-select>
          </span>
        </div> -->
        <pager  :pager="pager"/>
  </div>
</template>

<script>
import itemList from "@/components/itemList.vue";
import pager from "@/components/pager.vue";

export default {
  name: "List",
  props: {
  },
  components: {
    itemList,
    pager
  },
  data() {
    return {
      itemsPerPage: 8,
      currentPage: 0,
      layout: 'list',
      entity: this.$store.state.mainList,
      pager: {
        current_page: 0,
        items_per_page: 8,
        total_pages: null
      }
    }
  },
  created: function () {
    this.getPageData ();
  },
  mounted() {
    this.$store.watch(() =>  this.$store.state.layout, newValue => {
      this.layout = newValue
    })
    this.$store.watch(() =>  this.$store.state.sort, newValue => {
      this.getSorted(newValue.dir, newValue.sortBy)
    })
  },
  computed: {
  },
  methods: {
    getPageData () {
      var self = this;
      this.$http.get(`${this.$rootApiPath}releases?items_per_page=${this.itemsPerPage}&page=${this.currentPage}&_format=json`).then(function (e) {
          self.entity = e.body.rows;
          self.pager = e.body.pager;
          self.$store.commit('setList', self.entity);
      }).catch(function () {
        self.entity = require("../assets/releases.json").rows;
        self.pager = require("../assets/releases.json").pager;
        self.$message.error("There was an error while reading data");
        self.$store.commit('setList', self.entity);
      }).finally(function () {

      });
    },
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
      this.getPageData();
    },
    getSorted(order, field) {
      let self = this;
      let orderCap = order.toUpperCase();
      if(field == 'title') {
          this.$http.get(`${this.$rootApiPath}releases?items_per_page=${this.itemsPerPage}&page=${this.currentPage}&_format=json&sort_by=title&sort_order=${orderCap}`).then(function (e) {
            self.entity = e.body.rows;
          }).catch(function () {
            self.entity = require("../assets/releases.json").rows;
            self.$message.error("There was an error while reading data");
          });
      } else if(field == 'date') {
          this.$http.get(`${this.$rootApiPath}releases?items_per_page=${this.itemsPerPage}&page=${this.currentPage}&_format=json&sort_by=field_release_date_value&sort_order=${orderCap}`).then(function (e) {
            self.entity = e.body.rows;
          }).catch(function () {
            self.entity = require("../assets/releases.json").rows;
            self.$message.error("There was an error while reading data");
          });
      }
    }
  },
  watch: {
    'currentPage': function () {
      this.getPageData();
    },
  }
};
</script>
