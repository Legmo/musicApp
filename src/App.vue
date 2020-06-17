<template>
  <div id="app">
      <mainHeader />
      <main role="main" class="container-fluid">
        <div class="row">
             <div class="col-xl-4">
               <leftBlock />
             </div>
             <div class="col-xl-8 col-md-6">
                 <router-view />
             </div>
        </div>
      </main>
      <footer class="footer fixed-bottom">
            <div class="container-fluid">
                  <player :music="entity" ref="player"/>
            </div>
          </footer>
  </div>
</template>

<script>
import _ from 'lodash'

import Player from "@/components/player.vue";
import LeftBlock from "@/components/leftBlock.vue";
import mainHeader from "@/components/header.vue";

export default {
  name: "App",
  components: {
    Player,
    LeftBlock,
    mainHeader,
  },
  data() {
    return {
      entity: require("./assets/responses.json"),
      songPlayed: null,
    }
  },
  mounted() {
    this.rewriteEntityForPlayer();
    this.$root.$on('playSong', data => {
      this.songPlayed = data;
    });
},
  methods: {
    rewriteEntityForPlayer(){
      this.$refs.player.music = _.map(this.entity, function(currentObject) {
        currentObject.name = currentObject.title;
        currentObject.cover = currentObject.image_url;
        currentObject.url = currentObject.audiofile_url;
        currentObject.artist = "Аэростат"
        return currentObject;
      })
    },
  }
};
</script>
