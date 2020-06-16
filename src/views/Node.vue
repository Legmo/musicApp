<template>
  <div class="release">

    <div class="release-header row">
      <div class="col-xl-8">
        <div class="titleAndCo">
          <div class="title ">{{entity.title}}</div>
          <span class="small gray">{{entity.date}} | Выпуск {{entity.number}}</span>
          <div class="rating">нету рейтинга в json</div>
          <div class="buttons">
            <div @click="playSong(entity)">
                <i class="el-icon-video-play"></i>
                <i class="el-icon-video-pause"></i>
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
    id: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      entity: require("../assets/article.json").release,
    }
  },
  components: {},
  methods: {
    playSong(item) {
      console.log(item)
      //this.$root.$emit('playSong', item.number);
    },
  }
};
</script>
