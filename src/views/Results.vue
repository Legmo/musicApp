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
      entity: require("../assets/search_cogo.json"),
      localQuery: ''
    }
  },
  mounted() {
    if (this.searchQuery == '') {
      this.localQuery = this.$route.params.searchQuery
    } else {
      this.localQuery = this.searchQuery;
    }
    // let self = this;
    // this.$http.get(`${this.apiUrl}/releases/search?text=${this.localQuery}&_format=json`).then(function (e) {
    //   self.entity = e.body;
    // }).catch(function (e) {
    //   self.$message.error("There was an error while reading data");
    // });
},
};
</script>
