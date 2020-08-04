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
  // created: function () {
  //   var self = this;
  //   this.$http.get(this.$rootApiPath + 'releases?items_per_page=All&_format=json').then(function (e) {
  //       self.entity = e.body.rows;
  //       self.rewriteEntityForPlayer(self.entity);
  //   }).catch(function () {
  //     self.entity = require("./assets/responses.json").rows;
  //     self.$message.error("There was an error while reading data");
  //     self.rewriteEntityForPlayer(self.entity);
  //   }).finally(function () {
  //
  //   });
  // },
  created: function (){
    let self = this;
    this.$http.get(this.$rootApiPath + 'releases?items_per_page=All&_format=json').then(function (e) {
          this.$store.commit('setPlayerList', e.body.rows);
      }).catch(function () {
        let ent = require("./assets/releasesAll.json").rows;
        this.$store.commit('setPlayerList', ent);
        self.$message.error("There was an error while reading data");
      }).finally(function () {
      });

    // if(this.$store.state.mainList.length <= 0) {
    //   this.$http.get(this.$rootApiPath + 'releases?items_per_page=8&page=0&_format=json').then(function (e) {
    //         this.$store.commit('setList', e.body.rows);
    //     }).catch(function () {
    //       let ent = require("./assets/responses.json").rows;
    //       this.$store.commit('setList', ent);
    //       self.$message.error("There was an error while reading data");
    //     }).finally(function () {
    //     });
    // }

    // this.$store.watch(() =>  this.$store.state.mainList, newValue => {
    //   self.entity = newValue;
    //   self.rewriteEntityForPlayer(self.entity);
    // })
    this.$store.watch(() =>  this.$store.state.playerList, newValue => {
      self.entity = newValue;
      self.rewriteEntityForPlayer(self.entity);
    })

  },
  methods: {
    rewriteEntityForPlayer(ent){
      //this.$store.commit('setList', ent);
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
