import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        songPlayed: null,
        isPaused: true,
        layout: 'list',
        sort: {
          dir: 'asc',
          sortBy: 'date'
        },
        mainList: []
    },
    mutations: {
        setSong(state, value) {
            state.songPlayed = value;
        },
        setPaused(state, value) {
            state.isPaused = value;
        },
        setLayout(state, value) {
            state.layout = value;
        },
        setSort(state, value) {
            state.sort = value;
        },
        setList(state, value) {
            state.mainList = value;
        },
    }
})
