<template>
  <div>
<div class="mainList">
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
      entity: require("../assets/responses.json"),
    }
  },
  mounted() {
    this.$root.$on('handleLayoutChange', data => {
        this.layout = data
    });
    this.$root.$on('sortingDateChange', data => {
        this.getSorted('date', data)
    });
    this.$root.$on('sortingTitleChange', data => {
        this.getSorted('title', data)
    });
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
    getSorted(field, order) {
      if(field == 'title') {
        if(order != '') {
          this.$http.get(`${this.apiUrl}/releases?_format=json?sort_by=title&sort_order=${order}`).then(function (e) {
            self.entity = e.body;
          }).catch(function () {
            self.$message.error("There was an error while reading data");
          });
        } else {
          this.$http.get(`${this.apiUrl}/releases?_format=json`).then(function (e) {
            self.entity = e.body;
          }).catch(function () {
            self.$message.error("There was an error while reading data");
          });
        }

      } else if(field == 'date') {
        if(order != '') {
          this.$http.get(`${this.apiUrl}/releases?_format=json?sort_by=field_release_date_value&sort_order=${order}`).then(function (e) {
            self.entity = e.body;
          }).catch(function () {
            self.$message.error("There was an error while reading data");
          });
        } else {
          this.$http.get(`${this.apiUrl}/releases?_format=json`).then(function (e) {
            self.entity = e.body;
          }).catch(function () {
            self.$message.error("There was an error while reading data");
          });
        }

      }
    }
  }
};
</script>
