<template>
  <div :class="{'item': true, 'item-list': layout == 'List', 'item-grid': layout == 'Grid'}">
    <!-- List layout -->
    <template v-if="layout=='list'">
    <div class="number">{{itemEntity.number}}
      <i class="el-icon-video-play"></i>
      <i class="el-icon-video-pause"></i>
    </div>
    <div class="title ">{{itemEntity.title}}</div>
    <router-link
      :to="{ name: 'Article', params: { id: itemEntity.id } }"
      class="read-more"
      >Читать</router-link>
      <el-collapse>
  <el-collapse-item title="Список композиций" name="1">
    <div v-for="(song, index) in itemEntity.composition_list" :key="index"> {{song.composition_name}}</div>
  </el-collapse-item>
</el-collapse>
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
      <span class="player-button">
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
      layout: 'list',
      isPaused: true,
    };
  },
  mounted() {
    this.$root.$on('handleLayoutChange', data => {
        this.layout = data
    });
  },
  methods: {
    reroute(id) {
        this.$router.push({name: 'Tags', params: { tagId: id }});
    },
  }
};
</script>
