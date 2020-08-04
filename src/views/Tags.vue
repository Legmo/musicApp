<template>
  <div  :class="['mainList', 'tags-list-all', layout === 'grid' ? 'view-grid' : 'view-list']">
    <h1 v-if="tagId=='All'" class="titleOne">Выпуски по тэгам</h1>
    <div v-for="(item, key) in pagedEntity" :key="key" :class="{'tag-header':item.additionalTagInfo}">
      <template v-if="item.additionalTagInfo">
        <h4 class="titleTwo">
          Тэг {{item.additionalTagInfo.tagTitle}}
          <span class="small gray">
            ({{item.additionalTagInfo.tagLength}}
            {{getNoun(item.additionalTagInfo.tagLength, 'выпуск', 'выпуска', 'выпусков')}} )
          </span>
        </h4>
      </template>
      <template v-if="item.additionalTagInfo">
        <itemList :itemEntity="item" :layout="layout"/>
      </template>
      <template v-else>
        <itemList :itemEntity="item" :layout="layout"/>
      </template>
    </div>
    <!-- <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="[4, 8, 24, 48]"
      :page-size.sync="itemsPerPage"
      layout="prev, pager, next, sizes"
      :total="Object.keys(entity).length">
    </el-pagination> -->
    <pager  :pager="pager"/>
  </div>
</template>

<script>
import itemList from "@/components/itemList.vue";
import pager from "@/components/pager.vue";
import _ from 'lodash'

export default {
  name: "Tags",
  props: {
    tagId: {
      type: String,
    default: 'All'
  }
  },
  components: {
    itemList,
    pager
  },
  data() {
    return {
      entity: {},
      layout: 'list',
      cloneEntity: {},
      tagNames: [],
      itemsPerPage: 8,
      currentPage: 0,
      pager: {
        current_page: 0,
        items_per_page: 8,
        total_pages: null
      }
    }
  },
  mounted() {
    this.$store.watch(() =>  this.$store.state.layout, newValue => {
      this.layout = newValue
    })
    this.identifyTags(this.tagId)
},
computed: {
  pagedEntity () {
    let ent = Object.keys(this.cloneEntity).map(i => this.cloneEntity[i]);
    //return ent.slice(( (this.currentPage - 1) * this.itemsPerPage), (this.itemsPerPage * this.currentPage))
    return ent
  }
},
  methods: {
    rewriteEntityForPagination(){
      this.cloneEntity = _.cloneDeep(this.entity);
      this.cloneEntity = _.flatMap(_.map(this.cloneEntity, function(currentObject, key) {
        currentObject.releases[0].additionalTagInfo = {'tagTitle':key, 'tagLength': currentObject.releases.length}
        return currentObject.releases;
      }))
    },
    getNoun(number, one, two, five) {
        let n = Math.abs(number);
        n %= 100;
        if (n >= 5 && n <= 20) {
          return five;
        }
        n %= 10;
        if (n === 1) {
          return one;
        }
        if (n >= 2 && n <= 4) {
          return two;
        }
        return five;
      },
      addPage() {
        this.currentPage = this.pager.current_page +1
      },
      reducePage() {
        this.currentPage = this.pager.current_page +1
      },
      changePage(val) {
        this.currentPage = val-1
      },
      handleSizeChange(val) {
        this.itemsPerPage = val;
        this.identifyTags(this.tagId);
      },
      identifyTags(val) {
        let self = this;
        if (val == "All"){
         this.$http.get(`${this.$rootApiPath}releases/tags?_format=json&items_per_page=${this.itemsPerPage}&page=${this.currentPage}`).then(function (e) {
           self.entity = e.body.rows;
           self.pager = e.body.pager;
         }).catch(function () {
           self.entity = require("../assets/tags-new.json").rows;
           self.pager = require("../assets/tags-new.json").pager;
           self.$message.error("There was an error while reading data");
         }).finally(function () {
           this.rewriteEntityForPagination()
         });
        }
        else {
          this.$http.get(`${this.$rootApiPath}releases/tags/${val}?_format=json&items_per_page=${this.itemsPerPage}&page=${this.currentPage}`).then(function (e) {
            self.entity = e.body.rows;
            self.pager = e.body.pager;
          }).catch(function () {
            self.entity = require("../assets/tag20-new.json").rows;
            self.pager = require("../assets/tag20-new.json").pager;
            self.$message.error("There was an error while reading data");
          }).finally(function () {
            this.rewriteEntityForPagination()
          });
        }

      },
  },
  watch: {
    'tagId': function (newValue) {
      this.currentPage = 0;
      this.identifyTags(newValue)
    },
    'currentPage': function () {
      this.identifyTags(this.tagId);
    },
  }
};
</script>
