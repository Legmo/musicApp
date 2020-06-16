<template>
  <div :class="['item', layout == 'grid' ? 'item-grid' : 'item-list']">
    <!-- List layout -->
    <template v-if="layout=='list'">
      <div @click="playSong(itemEntity)">
        <div class="number">{{itemEntity.number}}
          <i class="el-icon-video-play"></i>
          <i class="el-icon-video-pause"></i>
        </div>
        <div class="title ">{{itemEntity.title}}</div>
      </div>
    <router-link
      :to="{ name: 'Article', params: { path: itemEntity.node_path } }"
      class="read-more"
      >Читать</router-link>
      <el-collapse>
        <el-collapse-item title="Список композиций" name="1">
          <div v-for="(song, index) in itemEntity.composition_list" :key="index"> {{song.composition_name}}</div>
        </el-collapse-item>
      </el-collapse>
      <div class="text" v-if="itemEntity.search_excerpt"> <p v-html="itemEntity.search_excerpt"></p></div>
<div class="rating">нету рейтинга в json</div>
<a :href="itemEntity.audiofile_url" download> <i class="el-icon-download"></i></a>
<div class="date">{{itemEntity.date}}</div>
<div class="tags">
  <span v-for="(tag, index) in itemEntity.tags" :key="index">
    <a @click="reroute(tag.id)" >{{tag.title}}</a>
  </span>
</div>
</template>
<!-- Grid layout -->
<template v-else-if="layout=='grid'">
  <div style v-bind:style="{ 'background-image': 'url(' + itemEntity.image_url + ')' }">
    <div class="rating">нету рейтинга в json</div>
    <div class="showOnHover">
      <span class="player-button" @click="playSong(itemEntity)">
        <i v-if="isPaused" class="el-icon-video-play"></i>
        <i v-else class="el-icon-video-pause"></i>
      </span>
      <a :href="itemEntity.audiofile_url" download> <i class="el-icon-download"></i></a>
      <router-link
        :to="{ name: 'Article', params: { id: itemEntity.id } }"
        class="read-more"
        >Читать</router-link>
    </div>
  </div>
  <div class="title ">{{itemEntity.title}}</div>
  <div>
    <div class="number">{{itemEntity.number}}</div><div class="date">{{itemEntity.date}}</div>
  </div>
</template>

  </div>
</template>

<script>
export default {
  name: "itemList",
  props: {
    layout:{
      type: String,
      default: 'list'
    },
    itemEntity: {
      type: Object,
      default:  function () {
    return {
          id: null,
          title: "",
          number: "",
          date: "",
          image_url: "",
          tags: [],
          audiofile_url: null,
          composition_list: []
        }
    }
  }
  },
  data() {
    return {
      isPaused: true,
    };
  },
  mounted() {
  },
  methods: {
    playSong(item) {
      console.log(item)
      //this.$root.$emit('playSong', item.number);
    },
    reroute(id) {
        this.$router.push({name: 'Tags', params: { tagId: id }});
    },
  }
};
</script>
