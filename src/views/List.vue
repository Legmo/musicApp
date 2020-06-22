<template>
  <div>
<div  :class="['mainList', layout === 'grid' ? 'view-grid' : 'view-list']">
    <div v-for="item in pagedEntity" :key="item.number">
      <itemList :itemEntity='item' :layout="layout"/>
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
  name: "List",
  props: {
  },
  components: {
    itemList
  },
  data() {
    return {
      itemsPerPage: 8,
      currentPage: 1,
      layout: 'list',
      entity: this.$store.state.mainList
    }
  },
  mounted() {
    this.$store.watch(() =>  this.$store.state.layout, newValue => {
      this.layout = newValue
    })
    this.$store.watch(() =>  this.$store.state.sort, newValue => {
      this.getSorted(newValue.dir, newValue.sortBy)
    })
    this.$store.watch(() =>  this.$store.state.mainList, newValue => {
      this.entity = newValue
    })
  },
  computed: {
    pagedEntity () {
      return this.entity.slice(((this.currentPage - 1) * this.itemsPerPage), (this.itemsPerPage * this.currentPage))
    },
  },
  methods: {
    handleSizeChange(val) {
      this.itemsPerPage = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    getSorted(order, field) {
      let self = this;
      let orderCap = order.toUpperCase();
      if(field == 'title') {
          this.$http.get(`${this.$rootApiPath}releases?items_per_page=All&_format=json&sort_by=title&sort_order=${orderCap}`).then(function (e) {
            self.entity = e.body.rows;
          }).catch(function () {
            self.entity = require("../assets/responses.json").rows;
            self.$message.error("There was an error while reading data");
          });
      } else if(field == 'date') {
          this.$http.get(`${this.$rootApiPath}releases?items_per_page=All&_format=json&sort_by=field_release_date_value&sort_order=${orderCap}`).then(function (e) {
            self.entity = e.body.rows;
          }).catch(function () {
            self.entity = require("../assets/responses.json").rows;
            self.$message.error("There was an error while reading data");
          });
      }
    }
  }
};
</script>
