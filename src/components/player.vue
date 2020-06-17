<template v-if="music.length >0">
  <div id="mainPlayer">
    <aplayer     preload="none"
      :audio="music"
      :listFolded="true"
      ref="aplayer"
      @pause="pause"
      @play="play"
    />

    <div class="player-bottom">
      <div class="buttons-block">
        <span class="player-button" @click="back()" :disabled="entity.id == null">
          <i class="el-icon-d-arrow-left"></i>
        </span>
        <span class="player-button" @click="checkCurrent()" :disabled="entity.id == null">
          <i v-if="$store.state.isPaused" class="el-icon-video-play"></i>
          <i v-else class="el-icon-video-pause"></i>
        </span>
        <span class="player-button" @click="next()" :disabled="entity.id == null">
          <i class="el-icon-d-arrow-right"></i>
        </span>
      </div>

      <div class="info-block" v-if="entity != {}">
        <div class="cover--thumb">
          <img :src="entity.cover" />
        </div>
        <div class="text right">
          <p>{{ entity.number }}.{{ entity.name }}</p>
          <span>{{ entity.date }}</span>
          <router-link
            :to="{ name: 'Article', params: { id: entity.node_path } }"
            class="read-more"
            >Читать</router-link>
        </div>
      </div>

      <div class="rating-controls">
        <el-rate v-if="entity.rating"
          v-model="entity.rating"
          disabled
          show-score
          text-color="#ff9900"
        >
        </el-rate>
        <a :href="entity.url" download :disabled="entity.id == null"> <i class="el-icon-download"></i></a>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: "Player",
  props: {
  },
  data() {
    return {
      entity: {
      },
      music:[],
    };
  },
  mounted() {
    this.$nextTick(function () {
      this.getCurrentMusic()
  })
var self = this;
this.$store.watch(() => this.$store.state.songPlayed, newValue => {
  let songIndex = _.findIndex(self.music, function(o) { return o.number == newValue; })
  self.$refs.aplayer.switch(songIndex);
  self.$store.commit('setPaused', false);
})

  this.$store.watch(() =>  this.$store.state.isPaused, newValue => {
    if(newValue == true) self.$refs.aplayer.pause();
  })
  },
  methods: {
    getCurrentMusic() {
      this.entity = this.$refs.aplayer.currentMusic;
      this.isPaused = false;
    },
    checkCurrent() {
      this.entity = this.$refs.aplayer.currentMusic;
      if (this.$refs.aplayer.media.paused == true) {
        this.$refs.aplayer.play();
      } else {
        this.$refs.aplayer.pause();
      }
    },
    play() {
      this.getCurrentMusic();
      this.$store.commit('setSong', this.entity.number);
      this.$store.commit('setPaused', false);
    },
    pause() {
      this.$store.commit('setPaused', true);
    },
    next() {
      this.entity = this.$refs.aplayer.currentMusic;
      this.$refs.aplayer.skipForward();
    },
    back() {
      this.entity = this.$refs.aplayer.currentMusic;
      this.$refs.aplayer.skipBack();
    }
  }
};
</script>
