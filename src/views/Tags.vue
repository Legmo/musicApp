<template>
<div class="mainList">
  <h1 v-if="tagId==null">Выпуски по тэгам</h1>
  <h1 v-else>Тэг id-{{tagId}}</h1>
  <template v-if="layout=='list'">
    Tags list
  </template>
  <template v-else-if="layout=='grid'">
    Tags grid ???
  </template>
</div>
</template>

<script>
export default {
  name: "Tags",
  props: {
    tagId: null
  },
  data() {
    return {
      layout: 'grid',
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
