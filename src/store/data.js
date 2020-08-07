let otherOptions = {
  state: {
    tabbarShow: true,
    activeId: ""
  },
  mutations: {
    updateTabbarShow(state, payload){
      state.tabbarShow = payload
    },
    setActiveId(state, id) {
    	state.activeId = id;
    }
//  setOtherToken(state, otherToken) {
//    state.otherToken = otherToken;
//    localStorage.otherToken = otherToken;
//  },
  },
  getters: {
    getTabbarShow(state){
        return state.tabbarShow
    },
    getActiveId(state) {
    	return state.activeId;
    }
  },
  actions: {
//  setOtherToken(context, otherToken) {
//    context.commit("setOtherToken", otherToken);
//  },
  }
};
export default otherOptions;
