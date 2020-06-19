<template>
  <header>
      <!-- Fixed navbar -->
      <nav class="navbar navbar-expand-md fixed-top">
          <router-link to="/" class="navbar-brand">
           <img src="./../assets/logo.png" height="30" alt="Аэростат" /> Аэростат
         </router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <div class="mt-2 mt-md-0">
            <searchBar/>
          </div>
          <div class="list-settings-block">
            <template v-if="ifShowSort()">
          <div class="sorting">
            <span>Сортировка:</span>
            <span :class="{'active': $store.state.sort.sortBy == 'date'}" @click="sorting('date')">по date
              <i :class="{'el-icon-sort-up': $store.state.sort.dir == 'asc', 'el-icon-sort-down': $store.state.sort.dir == 'desc' }"
              v-if="$store.state.sort.sortBy == 'date'" />
            </span>
            <span :class="{'active': $store.state.sort.sortBy == 'title'}" @click="sorting('title')">по названию
              <i :class="{'el-icon-sort-up': $store.state.sort.dir == 'asc', 'el-icon-sort-down': $store.state.sort.dir == 'desc' }"
              v-if="$store.state.sort.sortBy == 'title'" />
            </span>
          </div>
          <div class="layout-switch">
            <a class="layout-icon" @click="changeLayout('list')" :class="{ 'active': layout == 'list'}" title="List"><i class="el-icon-s-grid" /></a>
            <a class="layout-icon" @click="changeLayout('grid')" :class="{ 'active': layout == 'grid'}" title="Grid"><i class="el-icon-menu" /></a>
          </div>
        </template>
          </div>
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
