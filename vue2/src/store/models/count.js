export default {
  state: {
    num: 1,
  },
  mutations: {
    HANDLE_COUNT(state, val) {
      state.num += val;
    },
  },
  actions: {
    async handleCount({ commit }, val) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      commit("HANDLE_COUNT", val);
    },
  },
  getters: {
    addCount(state) {
      return state.num + 2;
    },
  },
};
