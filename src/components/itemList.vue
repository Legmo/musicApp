<template>
  <div :class="['item', layout == 'grid' ? 'item-grid' : 'item-list']">
    <!-- List layout -->
    <template v-if="layout=='list'">
      <div class="column-left" @click="playSong(itemEntity)">
        <div class="number">
          <span class="digit">{{itemEntity.number}}</span>
          <template v-if="$store.state.songPlayed == itemEntity.number">
            <i :class="{'el-icon-video-play': $store.state.isPaused == true, 'el-icon-video-pause': $store.state.songPlayed == itemEntity.number && $store.state.isPaused == false}"></i>
          </template>
          <template v-else>
            <i class="el-icon-video-play" />
          </template>
        </div>
      </div>
      <div class="column-right">
        <div class="top">
          <div class="part-one">
            <div class="title ">{{itemEntity.title}}</div>
            <router-link
            :to="{ name: 'Article', params: { path: itemEntity.node_path } }"
            class="read-more"
            >Читать
          </router-link>
            <el-collapse>
              <el-collapse-item title="Список композиций" name="1">
                <ol>
                  <li v-for="(song, index) in itemEntity.composition_list" :key="index">
                    {{song.composition_name}}
                  </li>
                </ol>
              </el-collapse-item>
            </el-collapse>
          </div>
          <div class="part-two">
            <div class="text" v-if="itemEntity.search_excerpt">
              <p v-html="itemEntity.search_excerpt"></p>
            </div>
            <div class="rating" v-if="itemEntity.rating" >нету рейтинга в json</div>
            <div class="date">{{itemEntity.date}}</div>
            <a :href="itemEntity.audiofile_url" download>
              <i class="el-icon-download"></i>
            </a>
          </div>
        </div>
        <div class="tags">
            <span v-for="(tag, index) in itemEntity.tags" :key="index">
                <template v-if="$route.params.tagId == tag.id">
                    <span class="tag-item">{{tag.title}}</span>
                </template>
                <template v-else>
                  <a class="tag-item" @click="reroute(tag.id)" >{{tag.title}}</a>
                </template>
            </span>
        </div>
      </div>
    </template>

    <!-- Grid layout -->
    <template v-else-if="layout=='grid'">
      <div class="background" style v-bind:style="{ 'background-image': 'url(' + itemEntity.image_url + ')' }">
        <div class="rating"  v-if="itemEntity.rating">нету рейтинга в json</div>
        <div class="showOnHover">
            <span class="player-button" @click="playSong(itemEntity)">
              <i :class="{'el-icon-video-play': $store.state.isPaused == true, 'el-icon-video-pause': $store.state.songPlayed == itemEntity.number && $store.state.isPaused == false}"></i>
            </span>
          <a class="link-download" :href="itemEntity.audiofile_url" download> <i class="el-icon-download"></i></a>
          <router-link
          :to="{ name: 'Article', params: { path: itemEntity.node_path } }"
          class="read-more"
          >Читать
        </router-link>
        </div>
      </div>
      <div class="title ">{{itemEntity.title}}</div>
      <div class="bottom">
        <div class="number">{{itemEntity.number}}</div>
        <div class="date">{{itemEntity.date}}</div>
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
        return {}
    }
  },
  songPlayed: {
    type: Number,
    default: null
  }
  },
  data() {
    return {
    };
  },
  mounted() {
  },
  methods: {
    playSong(item) {
      if(this.$store.state.isPaused) {
        this.$store.commit('setSong', item.number);
      } else {
        this.$store.commit('setPaused', true);
      }
    },
    reroute(id) {
        this.$router.push({name: 'Tags', params: { tagId: id }});
    },
  }
};
</script>
