import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tabbarShow:true,
    activeId: ""
  },
  getters:{
    getTabbarShow(state){
        return state.tabbarShow
    },
    getActiveId(state) {
    	return state.activeId;
    }
  },
  mutations: {
    updateTabbarShow(state, payload){
      state.tabbarShow = payload
    },
    setActiveId(state, id) {
    	state.activeId = id;
    }
  },
  actions: {}
});