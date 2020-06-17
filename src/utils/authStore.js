import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        songPlayed: null,
        isPaused: true,
        layout: 'list'
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
    }
})
