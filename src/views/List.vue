<template>
<div class="mainList">
  <template v-if="layout=='list'">
    list
  </template>
  <template v-else-if="layout=='grid'">
    grid
  </template>
</div>
</template>

<script>
export default {
  name: "List",
  props: {
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
