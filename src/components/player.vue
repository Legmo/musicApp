<template>
  <div id="mainPlayer">
    <aplayer
      :audio="music"
      :listFolded="true"
      ref="aplayer"
      @pause="isPaused = true"
      @play="getCurrentMusic"
    />

    <div class="player-bottom">
      <div class="buttons-block">
        <span class="player-button" @click="back()" :disabled="entity.id == null">
          <i class="el-icon-d-arrow-left"></i>
        </span>
        <span class="player-button" @click="checkCurrent()" :disabled="entity.id == null">
          <i v-if="isPaused" class="el-icon-video-play"></i>
          <i v-else class="el-icon-video-pause"></i>
        </span>
        <span class="player-button" @click="next()" :disabled="entity.id == null">
          <i class="el-icon-d-arrow-right"></i>
        </span>
      </div>

      <div class="info-block" v-if="entity.id != null">
        <div class="cover--thumb">
          <img :src="entity.cover" />
        </div>
        <div class="text right">
          <p>{{ entity.id }}.{{ entity.name }}</p>
          <span>{{ entity.date }}</span>
          <router-link
            :to="{ name: 'Article', params: { id: entity.id } }"
            class="read-more"
            >Читать</router-link>
        </div>
      </div>

      <div class="rating-controls">
        <el-rate
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
export default {
  name: "Player",
  components: {},
  data() {
    return {
      isPaused: true,
      ratingTmp: 0,
      nodeId: null,
      coverImgTmp: "",
      entity: {
        name: "",
        artist: "",
        url: "",
        cover: "",
        rating: 0,
        id: null,
        date: ""
      },
      music: [
        {
          name: "real Aerostate",
          artist: "",
          url: "http://aerostats.getmobileup.com/music/774.mp3",
          cover:
            "https://bigenc.ru/media/2016/10/27/1235149383/3384.jpg.262x-.png",
          rating: 3.5
        },
        {
          name: "testTitle",
          artist: "testArtist",
          url:
            "https://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3",
          cover:
            "https://www.cygnus-x1.net/links/rush/images/albums/testforecho-cover-ss.jpg",
          rating: 5
        },
        {
          name: "something different",
          artist: "completely new",
          url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
          cover:
            "https://www.cygnus-x1.net/links/rush/images/albums/flybynight-thumb.jpg",
          rating: 3
        },
        {
          name: "3",
          artist: "completely new",
          url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
          cover:
            "https://www.cygnus-x1.net/links/rush/images/albums/flybynight-thumb.jpg",
          rating: 2
        },
        {
          name: "4",
          artist: "completely new",
          url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3",
          cover:
            "https://www.cygnus-x1.net/links/rush/images/albums/flybynight-thumb.jpg",
          rating: 0.5
        }
      ]
    };
  },
  mounted() {
    this.getCurrentMusic()
  },
  methods: {
    getCurrentMusic() {
      this.entity = this.$refs.aplayer.currentMusic;
      this.isPaused = false;
    },
    checkCurrent() {
      this.entity = this.$refs.aplayer.currentMusic;
      if (this.$refs.aplayer.media.paused == true) {
        console.log(this.$refs.aplayer.media);
        this.$refs.aplayer.play();
      } else {
        this.$refs.aplayer.pause();
      }
    },
    next() {
      this.$refs.aplayer.skipForward();
    },
    back() {
      this.$refs.aplayer.skipBack();
    }
  }
};
</script>
