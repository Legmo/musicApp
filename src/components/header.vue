<template>
  <header>
      <!-- Fixed navbar -->
      <!--<nav class="navbar navbar-expand-md fixed-top">-->
    <div class="container-fluid">
      <nav class="navbar navbar-expand-md">
          <div class="row">
            <div class="col-md-3 col-sm-6">
              <router-link to="/" class="navbar-brand" title="Перейти к списку выпусков">
                <img class="logo" src="./../assets/logo.svg" alt="Аэростат" />
                <span>Аэростат</span>
              </router-link>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
            </div>
            <div class="col-md-9 col-sm-6">
              <!--<div class="collapse navbar-collapse" id="navbarCollapse">-->
              <div class="navbar-collapse" id="navbarTmp">
                  <searchBar/>
                <div class="list-settings-block">
                  <template v-if="ifShowSort()">
                    <div class="sorting">
                      <template v-if="$route.name == 'List'">
                        <span class="line-label">Сортировка:</span>
                        <span :class="['link-box', ($store.state.sort.sortBy == 'date') && 'active']" @click="sorting('date')" title="Сортировка по дате" >
                          <span class="sorting-label">по дате</span>
                          <span class="sorting-icon">
                            <template v-if="$store.state.sort.sortBy == 'date'">
                              <template v-if="$store.state.sort.dir == 'asc'"> <icon-sorting-up  /></template>
                              <template v-else-if="$store.state.sort.dir == 'desc'"><icon-sorting-down /></template>
                            </template>
                          </span>
              </span>
                        <span :class="['link-box', ($store.state.sort.sortBy == 'title') && 'active']" @click="sorting('title')" title="Сортировка по названию">
                          <span class="sorting-label">по названию</span>
                          <span class="sorting-icon">
                            <template v-if="$store.state.sort.sortBy == 'title'">
                              <template v-if="$store.state.sort.dir == 'asc'"> <icon-sorting-up /></template>
                              <template v-else-if="$store.state.sort.dir == 'desc'"><icon-sorting-down /></template>
                            </template>
                          </span>
              </span>
                      </template>
                    </div>
                    <div class="layout-switch">
                      <a @click="changeLayout('list')" :class="{'layout-icon':true, 'active': layout == 'list'}" title="В виде списка"><icon-list /></a>
                      <a class="layout-icon" @click="changeLayout('grid')" :class="{ 'active': layout == 'grid'}" title="В виде плитки"><icon-tiles /></a>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
      </nav>
    </div>
  </header>
</template>

<script>
import searchBar from "@/components/searchBar.vue";

export default {
  name: "mainHeader",
  components: {
    searchBar,
    // iconList
  },
  props: {
  },
  data() {
    return {
      layout: 'list',
      sort: {
        sortBy:'date',
        switcher: true
      }
    }
  },
  mounted() {
    this.$store.watch(() =>  this.$store.state.layout, newValue => {
      this.layout = newValue
    })
  },
  methods: {
    changeLayout(data){
      this.$store.commit('setLayout', data);
    },
    ifShowSort() {
      //let names = ['List', 'Tags', 'Results'] - if we decide to use sorting & different layouts on all these pages
      let names = ['List', 'Tags']
      return names.includes(this.$route.name);
    },
    changeDirection(dir, changed) {
      let finalDir
        if (changed == true) {
          finalDir = 'asc'
        } else {
          if(dir == 'asc') {finalDir = 'desc'}
          else if(dir == 'desc') {finalDir = 'asc'}
        }
      return finalDir
    },
    sorting(name) {
      let data = {'sortBy': name, 'switcher': !this.sort.switcher}
      this.sort = data
    },
  },
  watch: {
    'sort': function (newValue, oldValue) {
      let data;
      if (newValue.sortBy == oldValue.sortBy) {
        data = {'dir': this.changeDirection(this.$store.state.sort.dir, false), 'sortBy': newValue.sortBy}
        this.$store.commit('setSort', data);
      } else {
        data = {'dir': this.changeDirection(this.$store.state.sort.dir, true), 'sortBy': newValue.sortBy}
        this.$store.commit('setSort', data);
      }
    },
},
};
</script>
