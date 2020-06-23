<template>
  <div class="about">
    <h1>{{entity.title}}</h1>
      <div v-html="entity.content"></div>
  </div>
</template>

<script>

export default {
  name: "About",
  props: {
    path: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      entity: []
    }
  },
  mounted() {
    let self = this;
    this.$http.get(`${this.$rootApiPath}page/${this.path}?_format=json`).then(function (e) {
        self.entity = e.body.release;
    }).catch(function () {
      self.entity = require("../assets/node.json").release;
      self.$message.error("There was an error while reading data");
    });
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0,0);
    },
  },
  watch: {
    'path': function (newValue) {
      let self = this;
      this.$http.get(`${this.$rootApiPath}page/${newValue}?_format=json`).then(function (e) {
          self.entity = e.body.release;
          self.scrollToTop()
      }).catch(function () {
        self.entity = require("../assets/node.json").release;
        self.$message.error("There was an error while reading data");
        self.scrollToTop()
      });
    },
  }
};
</script>
