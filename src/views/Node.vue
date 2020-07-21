<template>
  <div class="release">

    <div class="release-header row">
      <div class="col-xl-8">
        <div class="titleAndCo">
          <div class="info">
            <h1 class="title ">{{entity.title}}</h1>
            <span class="small gray">{{entity.date}} | Выпуск {{entity.number}}</span>
            <div class="rating" v-if="entity.rating">нету рейтинга в json</div>
          </div>
          <div class="buttons">
            <div class="buttodiplay" @click="playSong(entity)">
              <template v-if="$store.state.songPlayed == entity.number">
                <i :class="{'el-icon-video-play': $store.state.isPaused == true, 'el-icon-video-pause': $store.state.songPlayed == entity.number && $store.state.isPaused == false}"></i>
              </template>
              <template v-else>
                <i class="el-icon-video-play" />
              </template>
            </div>
            <a class="button-download" :href="entity.audiofile_url" download target="_blank">
              <icon-download />
            </a>
          </div>
        </div>
        <div class="contents">
          <h5>Содержание</h5>
          <ol >
            <template  v-for="(song, index) in entity.content" >
            <li v-if="song.composition_name" :key="index">
              <a v-if="song.composition_name" :href="`#composition-${index}`">{{song.composition_name}}</a>
            </li>
          </template>
          </ol>
        </div>
      </div>
      <div class="col-xl-4">
        <div class="release-image">
          <img :src="entity.image_url" />
        </div>
        <div class="release-image--artist" v-if="entity.image_artist">
          <p>{{entity.image_artist}}</p>
        </div>
      </div>
    </div>

  <div class="release-content">
    <div class="composition" v-for="(item, index) in entity.content" :key="index" :id="`composition-${index}`">
      <div class="composition-name">
        <p>
          {{item.composition_name}}
        </p>
      </div>
      <div v-html="item.text" class="composition-txt"></div>
    </div>
    <div class="tags">
      <span v-for="(tag, index) in entity.tags" :key="index">
        <a class="tag-item" @click="reroute(tag.id)" >{{tag.title}}</a>
      </span>
    </div>
    <div class="release-controls">
       <el-button :disabled="entity.prev_release_path==null"><i class="el-icon-arrow-left" />
         <template v-if="entity.prev_release_path!=null">
         <router-link
             :to="{ name: 'Article', params: { path: getUrl(entity.prev_release_path) } }"
             class="read-more" @click.native="scrollToTop">Предыдущий выпуск</router-link>
        </template>
        <template v-else>Предыдущий выпуск</template>
        </el-button>
        <el-button>
          <router-link
             :to="{ name: 'List'}"
             class="read-more">
             Список выпусков
           </router-link>
        </el-button>
         <el-button :disabled="entity.next_release_path==null">
           <template v-if="entity.next_release_path!=null">
             <router-link
                :to="{ name: 'Article', params: { path: getUrl(entity.next_release_path) } }"
                class="read-more" @click.native="scrollToTop">Следующий выпуск</router-link><i class="el-icon-arrow-right" />
          </template>
          <template v-else>Следующий выпуск</template>
        </el-button>
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
    this.$http.get(`${this.$rootApiPath}release/${this.path}?_format=json`).then(function (e) {
        self.entity = e.body.release;
    }).catch(function () {
      self.entity = require("../assets/article.json").release;
      self.$message.error("There was an error while reading data");
    });
  },
  methods: {
    scrollToTop() {
        window.scrollTo(0,0);
    },
    playSong(item) {
      if( this.$store.state.songPlayed == item.number) {
        if(!this.$store.state.isPaused) {
          this.$store.commit('setPaused', true);
        }
      } else {
        this.$store.commit('setSong', item.number);
      }
    },
    reroute(id) {
        this.$router.push({name: 'Tags', params: { tagId: id }});
    },
    getUrl(str) {
      let result=str.split("/").pop();
      return result
    }
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
