<template>
  <div id="app">
      <mainHeader />
      <main role="main" class="container-fluid">
        <div class="row">
             <div class="col-md-3">
               <leftBlock />
             </div>
             <div class="col-md-9">
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
  created: function (){
    let self = this;
    this.$http.get(this.$rootApiPath + 'player-releases?_format=json').then(function (e) {
          this.$store.commit('setPlayerList', e.body);
      }).catch(function () {
        let ent = require("./assets/player-releases.json");
        this.$store.commit('setPlayerList', ent);
        self.$message.error("There was an error while reading data");
      }).finally(function () {
      });

    this.$store.watch(() =>  this.$store.state.playerList, newValue => {
      self.entity = newValue;
      self.rewriteEntityForPlayer(self.entity);
    })

  },
  methods: {
    rewriteEntityForPlayer(ent){
      var map = {
        title : "name",
        image_url: "cover",
        audiofile_url: "url"
    }
      this.$refs.player.music  = _.map(ent, function(currentObject) {
        _.each(currentObject, function(value, key) {
            key = map[key] || key;
            currentObject[key] = value;
        })
        currentObject.artist = "Аэростат"
        currentObject = _.omit(currentObject, Object.keys(map))
        return currentObject
      })

    },
  }
};
</script>
