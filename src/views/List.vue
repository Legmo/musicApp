<template>
<div class="mainList">
    <div v-for="item in entity" :key="item.number">
      <itemList :itemEntity='item' />
    </div>
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
  methods: {
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
