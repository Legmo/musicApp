<template>
  <div :class="['item', layout == 'grid' ? 'item-grid' : 'item-list']">

    <!-- List layout -->
    <template v-if="layout=='list'">
      <div class="column-left" @click="playSong(itemEntity)">
        <div :class="['number',
        ($store.state.songPlayed == itemEntity.number && $store.state.isPaused === false) ? 'active' : null,
        ($store.state.songPlayed == itemEntity.number && $store.state.isPaused === true)  ? 'pause'  : 'normal'
        ]"
           title="Играть / Пауза"
        >
          <template v-if="$store.state.songPlayed !== itemEntity.number">
            <span class="digit">{{itemEntity.number}}</span>
          </template>
          <template v-if="$store.state.songPlayed == itemEntity.number">
              <template v-if="$store.state.isPaused == true">
                <icon-play />
              </template>
              <template v-if="$store.state.songPlayed == itemEntity.number && $store.state.isPaused == false">
                <icon-pause class='icon-pause'/>
              </template>
          </template>
          <template v-else>
            <icon-play />
          </template>
        </div>
      </div>
      <div class="column-right">
        <div class="top">
          <div class="part-one">
            <router-link
            :to="{ name: 'Article', params: { path: itemEntity.number } }"
            class="title-link"
            title="Читать выпуск"
            >
              <div class="title">{{itemEntity.title}}
            </div>
          </router-link>
            <el-collapse title="Трек-лист выпуска">
              <el-collapse-item title="Список композиций" name="1" >
                <ol>
                  <template  v-for="(song, index) in itemEntity.composition_list" >
                    <li v-if="song.composition_name" :key="index">
                      {{song.composition_name}}
                    </li>
                  </template>
                </ol>
              </el-collapse-item>
            </el-collapse>
          </div>
          <div class="part-two">
            <div class="rating" v-if="itemEntity.rating" >нету рейтинга в json</div>
            <div class="date">{{itemEntity.date}}</div>
            <a class="button-download" :href="itemEntity.audiofile_url" download target="_blank" title="Скачать mp3">
              <icon-download />
            </a>
          </div>
        </div>
        <div class="text" v-if="itemEntity.search_excerpt">
          <p v-html="itemEntity.search_excerpt"></p>
        </div>
        <div class="tags">
            <span v-for="(tag, index) in itemEntity.tags" :key="index">
                <template v-if="$route.params.tagId == tag.id">
                    <span class="tag-item" v-html="tag.title"></span>
                </template>
                <template v-else>
                  <a class="tag-item" @click="reroute(tag.id)" v-html="tag.title"></a>
                </template>
            </span>
        </div>
      </div>
    </template>

    <!-- Grid layout -->
    <template v-else-if="layout=='grid'">
      <div class="background" v-bind:style="{ 'background-image': 'url(' + itemEntity.image_url + ')' }">
        <div class="rating"  v-if="itemEntity.rating">нету рейтинга в json</div>
        <div :class="['showOnHover', ($store.state.songPlayed == itemEntity.number && $store.state.isPaused === false) ? 'active' : null, ($store.state.songPlayed == itemEntity.number && $store.state.isPaused === true) ? 'pause' : 'normal' ]">
            <span class="player-button" @click="playSong(itemEntity)" title="Играть / Пауза">
              <template v-if="$store.state.songPlayed == itemEntity.number && $store.state.isPaused == true">
                <icon-play />
              </template>
              <template v-if="$store.state.songPlayed == itemEntity.number && $store.state.isPaused == false">
                <icon-pause class='icon-pause'/>
              </template>
              <template v-if="$store.state.songPlayed !== itemEntity.number ">
                <icon-play />
              </template>
            </span>
            <a class="button-download" :href="itemEntity.audiofile_url" download target="_blank" title="Скачать mp3">
              <icon-download />
            </a>
          <router-link
            :to="{ name: 'Article', params: { path: itemEntity.number } }"
            class="read-more"
            title="Читать выпуск"
          >
            Читать
          </router-link>
        </div>
      </div>
      <router-link
        :to="{ name: 'Article', params: { path: itemEntity.number } }"
        class="title-link">
        <div class="title"
         title="Читать выпуск">
          {{itemEntity.title}}
        </div>
      </router-link>
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
//     downloadItem (ent) {
//   this.$http.get(ent.audiofile_url, { responseType: 'blob' })
//     .then(response => {
//       const blob = new Blob([response.data], { type: 'application/pdf' })
//       const link = document.createElement('a')
//       link.href = URL.createObjectURL(blob)
//       link.download = ent.number
//       link.click()
//       URL.revokeObjectURL(link.href)
//     }).catch(console.error)
// },
    playSong(item) {
      if( this.$store.state.songPlayed == item.number) {
        if(!this.$store.state.isPaused) {
          this.$store.commit('setPaused', true);
        } else {
          this.$store.commit('setPaused', false);
        }
      } else {
        this.$store.commit('setSong', item.number);
        this.$store.commit('setPaused', false);
      }
    },
    reroute(id) {
        this.$router.push({name: 'Tags', params: { tagId: id }});
    },
  }
};
</script>
