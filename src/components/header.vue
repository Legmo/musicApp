<template>
  <header>
      <!-- Fixed navbar -->
      <nav class="navbar navbar-expand-md fixed-top">
        <a class="navbar-brand" href="/">
         <img src="./../assets/logo.png" height="30" alt="Аэростат" /> Аэростат
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link to="/">Home</router-link> |
            </li>
            <li class="nav-item">
              <router-link to="/about">About</router-link>
            </li>
          </ul>
          <div class="mt-2 mt-md-0">
            <searchBar/>
          </div>
          <template v-if="ifShowSort()">
          <div class="sorting">
            Сортировка: надо нарисовать
          </div>
          <div class="layout-switch">
            <a class="layout-icon" @click="changeLayout('list')" :class="{ 'active': layout == 'list'}" title="List"><i class="el-icon-s-grid" /></a>
            <a class="layout-icon" @click="changeLayout('grid')" :class="{ 'active': layout == 'grid'}" title="Grid"><i class="el-icon-menu" /></a>
          </div>
        </template>
        </div>
      </nav>
    </header>
</template>

<script>
import searchBar from "@/components/searchBar.vue";

export default {
  name: "mainHeader",
  components: {
    searchBar
  },
  props: {
  },
  data() {
    return {
      layout: 'grid',
    }
  },
  methods: {
    changeLayout(data){
      this.$root.$emit('handleLayoutChange', data);
    },
    ifShowSort() {
      let names = ['List', 'Tags', 'Results']
      return names.includes(this.$route.name);
    }
  }
};
</script>
