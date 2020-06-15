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
                  <player />
            </div>
          </footer>



  </div>
</template>

<script>
// @ is an alias to /src
import Player from "@/components/player.vue";
import LeftBlock from "@/components/leftBlock.vue";
import mainHeader from "@/components/header.vue";

export default {
  name: "App",
  components: {
    Player,
    LeftBlock,
    mainHeader
  }
};
</script>
