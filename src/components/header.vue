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
          <template v-if="ifShowSort()">
          <div class="sorting">
            <span>Сортировка:</span>
            <span @click="sortingDate()">по date
              <i v-if="sortDateDirection == ''" class="el-icon-sort" />
              <i v-else-if="sortDateDirection == 'asc'" class="el-icon-sort-up" />
              <i v-else-if="sortDateDirection == 'desc'" class="el-icon-sort-down" />
            </span>
            <span @click="sortingTitle()">по названию
              <i v-if="sortTitleDirection == ''" class="el-icon-sort" />
              <i v-else-if="sortTitleDirection == 'asc'" class="el-icon-sort-up" />
              <i v-else-if="sortTitleDirection == 'desc'" class="el-icon-sort-down" />
            </span>
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
      layout: 'list',
      sortDateDirection: '',
      sortTitleDirection: '',
    }
  },
  methods: {
    changeLayout(data){
      //this.$root.$emit('handleLayoutChange', data);
      this.$store.commit('setLayout', data);
    },
    ifShowSort() {
      //let names = ['List', 'Tags', 'Results'] - if we decide to use sorting & different layouts on all these pages
      let names = ['List']
      return names.includes(this.$route.name);
    },
    sortingDate() {
      this.sortTitleDirection = ''
      if(this.sortDateDirection == '') {
        this.sortDateDirection = 'asc'
        this.$root.$emit('sortingDateChange', this.sortDateDirection);
      } else if (this.sortDateDirection == 'asc') {
        this.sortDateDirection = 'desc'
        this.$root.$emit('sortingDateChange', this.sortDateDirection);
      } else if (this.sortDateDirection == 'desc') {
        this.sortDateDirection = ''
        this.$root.$emit('sortingDateChange', this.sortDateDirection);
      }
    },
    sortingTitle() {
      this.sortDateDirection = ''
      if(this.sortTitleDirection == '') {
        this.sortTitleDirection = 'asc'
        this.$root.$emit('sortingTitleChange', this.sortTitleDirection);
      } else if (this.sortTitleDirection == 'asc') {
        this.sortTitleDirection = 'desc'
        this.$root.$emit('sortingTitleChange', this.sortTitleDirection);
      } else if (this.sortTitleDirection == 'desc') {
        this.sortTitleDirection = ''
        this.$root.$emit('sortingTitleChange', this.sortTitleDirection);
      }
    },
  }
};
</script>
