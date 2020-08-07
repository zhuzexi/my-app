let userOptions = {
  state: {
    memberKey: "",
    memberInfo: ""
  },
  mutations: {
    setMemberKey(state, memberKey){
      state.memberKey = memberKey;
      localStorage.memberKey = memberKey;
    },
    setMemberInfo(state, memberInfo) {
    	state.memberInfo = memberInfo;
    	localStorage.memberInfo = memberInfo;
    },
    clearMemberKey(state){
      	state.memberKey = "";
      	localStorage.removeItem("memberKey");
    },
    clearMemberInfo(state){
      	state.memberInfo = "";
      	localStorage.removeItem("memberInfo");
    }
//  setOtherToken(state, otherToken) {
//    state.otherToken = otherToken;
//    localStorage.otherToken = otherToken;
//  },
  },
  getters: {
    getMemberKey(state){
      	if (!state.memberKey) {
        	state.memberKey = localStorage.getItem('memberKey');
      	}
      	return state.memberKey;
    },
    getMemberInfo(state) {
    	if (!state.memberInfo) {
        	state.memberInfo = localStorage.getItem('memberInfo');
      	}
      	return state.memberInfo;
    }
  },
  actions: {
  	setMemberKey(context, memberKey){
      context.commit("setMemberKey", memberKey);
    },
    setMemberInfo(context, memberInfo) {
    	context.commit("setMemberInfo", memberInfo);
    },
    clearUserStore(context) {
      context.commit("clearMemberKey");
      context.commit("clearMemberInfo");
    },
//  setOtherToken(context, otherToken) {
//    context.commit("setOtherToken", otherToken);
//  },
  }
};
export default userOptions;
