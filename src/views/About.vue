<template>
  <div class="about">
    <h1>{{path}}</h1>
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
        self.entity = e.body;
    }).catch(function () {
      self.entity = require("../assets/article.json").release;
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
          self.entity = e.body;
          self.scrollToTop()
      }).catch(function () {
        self.entity = require("../assets/article.json").release;
        self.$message.error("There was an error while reading data");
        self.scrollToTop()
      });
    },
  }
};
</script>
