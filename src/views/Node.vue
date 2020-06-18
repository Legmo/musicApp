<template>
  <div class="release">

    <div class="release-header row">
      <div class="col-xl-8">
        <div class="titleAndCo">
          <div class="title ">{{entity.title}}</div>
          <span class="small gray">{{entity.date}} | Выпуск {{entity.number}}</span>
          <div class="rating" v-if="entity.rating">нету рейтинга в json</div>
          <div class="buttons">
            <div @click="playSong(entity)">
              <template v-if="$store.state.songPlayed == entity.number">
                <i :class="{'el-icon-video-play': $store.state.isPaused == true, 'el-icon-video-pause': $store.state.songPlayed == entity.number && $store.state.isPaused == false}"></i>
              </template>
              <template v-else>
                <i class="el-icon-video-play" />
              </template>
            </div>
            <a :href="entity.audiofile_url" download> <i class="el-icon-download"></i></a>
          </div>
        </div>
        <div class="contents">
          <span>Содержание</span>
          <ul >
            <li v-for="(item, index) in entity.content" :key="index"> <a :href="`#composition-${index}`">{{item.composition_name}}</a></li>
          </ul>
        </div>
      </div>
      <div class="col-xl-4">
        <div class="release-image">
          <img :src="entity.image_url" />
        </div>
      </div>
    </div>

  <div class="release-content">
    <div class="" v-for="(item, index) in entity.content" :key="index" :id="`composition-${index}`">
      <div>{{item.composition_name}}</div>
      <div v-html="item.text"></div>
    </div>
    <div class="tags">
      <span v-for="(tag, index) in entity.tags" :key="index">
        <a @click="reroute(tag.id)" >{{tag.title}}</a>
      </span>
    </div>
    <div class="release-controls">
       <el-button :disabled="entity.prev_release_path==null"><i class="el-icon-arrow-left" />
         <router-link
             :to="{ name: 'Article', params: { path: entity.prev_release_path } }"
             class="read-more">Предыдущий выпуск</router-link></el-button>
        <el-button>
          <router-link
             :to="{ name: 'List'}"
             class="read-more">
             Список выпусков
           </router-link>
        </el-button>
         <el-button :disabled="entity.next_release_path==null"><router-link
              :to="{ name: 'Article', params: { path: entity.next_release_path } }"
              class="read-more">Следующий выпуск</router-link><i class="el-icon-arrow-right" /> </el-button>
    </div>
  </div>


</div>
</template>

<script>

export default {
  name: "Article",
  props: {
    path: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      entity: []
    }
  },
  mounted() {
    let self = this;
    this.$http.get(`${this.$rootApiPath}release${this.path}?_format=json`).then(function (e) {
        self.entity = e.body.release;
    }).catch(function () {
      self.entity = require("../assets/article.json").release;
      self.$message.error("There was an error while reading data");
    });
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
  },
  watch: {
    'path': function (newValue) {
      let self = this;
      this.$http.get(`${this.$rootApiPath}release${newValue}?_format=json`).then(function (e) {
          self.entity = e.body.release;
      }).catch(function () {
        self.entity = require("../assets/article.json").release;
        self.$message.error("There was an error while reading data");
      });
    },
  }
};
</script>
