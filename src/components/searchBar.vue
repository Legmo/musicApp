<template>
  <div id="searchBar" class="nav-searchbar__wrapper" >
          <form :class="{'nav-searchbar':true}" role="search">
              <div class="input-group">
                  <input type="text"
                         id="mainSearch"
                         class="form-control"
                         name="x"
                         placeholder="Search"
                         v-model.trim="queryString" />
                  <span class="input-group-btn">
                      <router-link :to="{
                                   name: 'Results',
                                   query: { text: queryString,}
                                   }"
                                   tag="button"
                                   class="btn btn-search"
                                   typeof="submit">
                          Найти
                      </router-link>
                  </span>
              </div>
          </form>
</div>
</template>

<script>
    export default {
        name: 'searchBar',
    data() {
        return {
            queryString: '',
            isChanged: false,
            delayTimer: 0,
            isActive: false,
        }
    },
    methods: {
        sendQueryString() {
            clearTimeout(this.delayTimer);
            this.delayTimer = setTimeout(() => {
                if (this.queryString.length >= 3) {
                    this.isChanged = false;
                    this.searchQuery.queryString = this.queryString.toLowerCase();
                    this.$http.get(`${this.$rootApiPath}result?queryString=${this.searchQuery.queryString}`)
                        .then(function () {
                        })
                        .catch(function () {
                            this.$message.error("There was an error while reading data");
                        });
                    this.isActive = true;
                } else {
                    this.searchQuery.queryString = '';
                    this.isActive = false;
                }
            }, 1000);

        },
        },
    mounted() {}
}
</script>
