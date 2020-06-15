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
},
  methods: {

  }
};
</script>
