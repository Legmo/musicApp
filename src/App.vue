<template>
  <div id="app">
      <mainHeader />
      <main role="main" class="container-fluid">
        <div class="row">
             <div class="col-xl-3">
               <leftBlock />
             </div>
             <div class="col-xl-9 col-md-12">
               <div class="mainContent">
                   <router-view />
               </div>
             </div>
        </div>
      </main>
      <footer class="footer fixed-bottom">
            <div class="container-fluid">
                  <player ref="player"/>
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
      entity: [],
    }
  },
  created: function () {
    var self = this;
    this.$http.get(this.$rootApiPath + 'releases?items_per_page=All&_format=json').then(function (e) {
        self.entity = e.body.rows;
        self.rewriteEntityForPlayer(self.entity);
    }).catch(function () {
      self.entity = require("./assets/responses.json").rows;
      self.$message.error("There was an error while reading data");
      self.rewriteEntityForPlayer(self.entity);
    }).finally(function () {

    });
  },
  mounted() {
},
  methods: {
    rewriteEntityForPlayer(ent){
      this.$store.commit('setList', ent);
      this.$refs.player.music = _.map(ent, function(currentObject) {
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
