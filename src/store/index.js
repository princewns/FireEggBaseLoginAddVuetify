import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import modProvider from "@/store/provider";
import modCommmon from "@/store/common";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    provider: modProvider,
    common : modCommmon
  },
  plugins: [
    new VuexPersistence({
      storage: window.localStorage,
    }).plugin,
  ],
});
