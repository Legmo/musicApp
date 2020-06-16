<template>
<div class="mainList">
  <h1 v-if="tagId=='All'">Выпуски по тэгам</h1>
  <div v-for="(item, key) in pagedEntity" :key="key">
    <template v-if="item.additionalTagInfo">
      <h3>Тэг {{item.additionalTagInfo.tagTitle}} <span class="small gray">({{item.additionalTagInfo.tagLength}} {{getNoun(item.additionalTagInfo.tagLength, 'выпуск', 'выпуска', 'выпусков')}} )</span></h3>
      <itemList :itemEntity='item'/>
    </template>
    <template v-else>
      <itemList :itemEntity='item'/>
    </template>
  </div>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page.sync="currentPage"
    :page-sizes="[4, 8, 24, 48]"
    :page-size.sync="itemsPerPage"
    layout="prev, pager, next, sizes"
    :total="Object.keys(entity).length">
  </el-pagination>
</div>
</template>

<script>
import itemList from "@/components/itemList.vue";
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
    itemList
  },
  data() {
    return {
      entity: require("../assets/tags.json"),
      cloneEntity: {},
      tagNames: [],
      itemsPerPage: 8,
      currentPage: 1,
    }
  },
  mounted() {
    this.$root.$on('handleLayoutChange', data => {
        this.layout = data
    });
    this.rewriteEntityForPagination()
},
computed: {
  pagedEntity () {
    let ent = Object.keys(this.cloneEntity).map(i => this.cloneEntity[i]);
    return ent.slice(((this.currentPage - 1) * this.itemsPerPage), (this.itemsPerPage * this.currentPage))
  },
},
  methods: {
    rewriteEntityForPagination(){
      this.cloneEntity = _.cloneDeep(this.entity);
      this.cloneEntity = _.flatMap(_.map(this.cloneEntity, function(currentObject, key) {
        currentObject[0].additionalTagInfo = {'tagTitle':key, 'tagLength': currentObject.length}
        return currentObject;
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
      handleSizeChange(val) {
        this.itemsPerPage = val;
      },
      handleCurrentChange(val) {
        this.currentPage = val;
      },
  },
  watch: {
    'tagId': function (newValue) {
      if (newValue == "All"){
        this.entity = require("../assets/tags.json");
        this.rewriteEntityForPagination()
      }
      else {
        this.entity = require("../assets/tag20.json");
        this.rewriteEntityForPagination()
      }
    },
  }
};
</script>
