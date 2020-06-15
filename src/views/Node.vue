<template>
  <div class="about">
    <h1>This is Article page</h1>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Article",
  props: {
    id: {
      type: Number,
      default: null
    }
  },
  components: {}
};
</script>
