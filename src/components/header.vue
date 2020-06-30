<template>
  <header>
      <!-- Fixed navbar -->
      <!--<nav class="navbar navbar-expand-md fixed-top">-->
      <nav class="navbar navbar-expand-md">
          <router-link to="/" class="navbar-brand">
            <img class="logo" src="./../assets/logo.svg" alt="Аэростат" />
            <span>Аэростат</span>
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
            <template v-if="$route.name == 'List'">
              <span>Сортировка:</span>
              <span :class="{'active': $store.state.sort.sortBy == 'date'}" @click="sorting('date')">по дате
                <i :class="{'el-icon-sort-up': $store.state.sort.dir == 'asc', 'el-icon-sort-down': $store.state.sort.dir == 'desc' }"
                v-if="$store.state.sort.sortBy == 'date'" />
              </span>
              <span :class="{'active': $store.state.sort.sortBy == 'title'}" @click="sorting('title')">по названию
                <i :class="{'el-icon-sort-up': $store.state.sort.dir == 'asc', 'el-icon-sort-down': $store.state.sort.dir == 'desc' }"
                v-if="$store.state.sort.sortBy == 'title'" />
              </span>
            </template>
          </div>
          <div class="layout-switch">
            <a class="layout-icon" @click="changeLayout('list')" :class="{ 'active': layout == 'list'}" title="Список">
              <!--<i class="el-icon-s-grid" />-->
              <svg id="Слой_1" data-name="Слой 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                <defs></defs>
                <g id="Слой_9" data-name="Слой 9">
                  <path class="cls-1"
                        d="M87.65,10.87H39.71a1.79,1.79,0,0,0-1.8,1.8v16a1.79,1.79,0,0,0,1.8,1.8H87.65a1.79,1.79,0,0,0,1.8-1.8v-16A1.79,1.79,0,0,0,87.65,10.87Z"/>
                  <path class="cls-1"
                        d="M28.3,10.87H12.35a1.79,1.79,0,0,0-1.8,1.8v16a1.79,1.79,0,0,0,1.8,1.8h16a1.79,1.79,0,0,0,1.8-1.8v-16A1.79,1.79,0,0,0,28.3,10.87Z"/>
                </g>
                <g id="Слой_9-2" data-name="Слой 9">
                  <path class="cls-1"
                        d="M87.65,69.25H39.71a1.79,1.79,0,0,0-1.8,1.8v16a1.79,1.79,0,0,0,1.8,1.8H87.65a1.79,1.79,0,0,0,1.8-1.8v-16A1.79,1.79,0,0,0,87.65,69.25Z"/>
                  <path class="cls-1"
                        d="M28.3,69.25H12.35a1.79,1.79,0,0,0-1.8,1.8v16a1.79,1.79,0,0,0,1.8,1.8h16a1.79,1.79,0,0,0,1.8-1.8v-16A1.79,1.79,0,0,0,28.3,69.25Z"/>
                </g>
                <g id="Слой_9-3" data-name="Слой 9">
                  <path class="cls-1"
                        d="M87.65,40.06H39.71a1.79,1.79,0,0,0-1.8,1.8v16a1.79,1.79,0,0,0,1.8,1.8H87.65a1.79,1.79,0,0,0,1.8-1.8v-16A1.79,1.79,0,0,0,87.65,40.06Z"/>
                  <path class="cls-1"
                        d="M28.3,40.06H12.35a1.79,1.79,0,0,0-1.8,1.8v16a1.79,1.79,0,0,0,1.8,1.8h16a1.79,1.79,0,0,0,1.8-1.8v-16A1.79,1.79,0,0,0,28.3,40.06Z"/>
                </g>
              </svg>
            </a>
            <a class="layout-icon" @click="changeLayout('grid')" :class="{ 'active': layout == 'grid'}" title="Плитка">
              <svg id="Слой_1" data-name="Слой 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                <defs>
                </defs>
                <g id="Слой_1-2" data-name="Слой 1">
                  <path class="cls-1"
                        d="M42.87,46.21H13.68a3.32,3.32,0,0,1-3.35-3.35V13.67a3.32,3.32,0,0,1,3.35-3.35H42.87a3.32,3.32,0,0,1,3.35,3.35V42.86A3.32,3.32,0,0,1,42.87,46.21Z"/>
                  <path class="cls-1"
                        d="M86,46.21H56.8a3.32,3.32,0,0,1-3.35-3.35V13.67a3.32,3.32,0,0,1,3.35-3.35H86a3.32,3.32,0,0,1,3.34,3.35V42.86A3.32,3.32,0,0,1,86,46.21Z"/>
                  <path class="cls-1"
                        d="M42.87,89.32H13.68A3.32,3.32,0,0,1,10.33,86V56.78a3.32,3.32,0,0,1,3.35-3.34H42.87a3.31,3.31,0,0,1,3.35,3.34V86A3.31,3.31,0,0,1,42.87,89.32Z"/>
                  <path class="cls-1"
                        d="M86,89.32H56.8A3.31,3.31,0,0,1,53.45,86V56.78a3.31,3.31,0,0,1,3.35-3.34H86a3.31,3.31,0,0,1,3.34,3.34V86A3.31,3.31,0,0,1,86,89.32Z"/>
                </g>
              </svg>
            </a>
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
