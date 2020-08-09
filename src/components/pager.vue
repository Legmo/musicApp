<template>
  <div class="el-pagination">
    <div class="el-pagination__pager">
      <button type="button" :disabled="pager.current_page == 0" class="btn-prev" @click="$parent.reducePage()"><i class="el-icon el-icon-arrow-left"></i></button>

      <ul class="el-pager">
        <li class="number" v-if="pager.current_page > 5 && pager.total_pages > 10"><span v-on:click="$parent.changePage(1)">1</span></li>
        <li class="active number" v-if="pager.current_page > 5 && pager.total_pages > 10">... </li>
        <li v-for="page in pagesSliced" :class="{'number':true, 'active': page == pager.current_page+1}" :key="page">
          <template v-if="page == pager.current_page+1">{{page}}</template>
          <template v-else><span v-on:click="$parent.changePage(page)">{{page}}</span></template>
        </li>
        <li class="active number" v-if="pager.current_page < pager.total_pages-10">... </li>
        <li class="number" v-if="pager.current_page < pager.total_pages-10"><span v-on:click="$parent.changePage(pager.total_pages)">{{pager.total_pages}}</span></li>
      </ul>

      <button type="button" :disabled="pager.current_page+1 == pager.total_pages" class="btn-next" @click="$parent.addPage()"><i class="el-icon el-icon-arrow-right"></i></button>

    </div>
    <span class="el-pagination__sizes">
      <el-select v-model="pager.items_per_page" placeholder="Select" @change="$parent.handleSizeChange">
       <el-option v-for="size in pageSizes"
         :key="size"
         :label="`${size} на странице`"
         :value="size">
       </el-option>
     </el-select>
    </span>
  </div>
</template>

<script>

export default {
  name: "Pager",
  props: {
    pager: {
      type: Object,
      default:  function () {
        return {
          current_page: 0,
          items_per_page: 8,
          total_pages: null
          }
      }
    }
  },
  data() {
    return {
      pageSizes: [4, 8, 24, 48],
    }
  },
  computed: {
    pagesSliced () {
      let res
      if(this.pager.total_pages > 10) {
        if (this.pager.current_page+4 >= this.pager.total_pages) {
          res = this.range(this.pager.total_pages-10, this.pager.total_pages);
        } else if (this.pager.current_page -4 <=0) {
          res = this.range(1, 10);
        } else {
          res = this.range(this.pager.current_page-4, this.pager.current_page+4);
          }
      } else {
        res = this.range(1, this.pager.total_pages);
      }
      return res
    }
  },
  methods: {
    range(start, end) {
      return Array(end - start + 1).fill().map((_, idx) => start + idx)
    }
  }
};
</script>
