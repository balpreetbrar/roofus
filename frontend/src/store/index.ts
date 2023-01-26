
import axios from "axios";
import { createStore } from "vuex";


export default createStore({
  state: {
    user: null,
    isNewUser: true,
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      localStorage.setItem("user", JSON.stringify(userData));
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${userData.token}`;
      state.user = userData;
    },
    LOGOUT(state) {
      state.user =null
      localStorage.removeItem("user");
      location.reload();
    },
    IS_NEW_USER(state, isNewUser) {
      state.isNewUser = isNewUser;
    },
  },
  actions: {
    register({ commit }, credentials) {
      return axios
        .post("https://api-angad.networkon.in/roofus/admin/register", credentials)
        .then(({ data }) => {
          commit("SET_USER_DATA", data);
        });
    },
    login({ commit }, credentials) {
      return axios
        .post("https://api-angad.networkon.in/roofus/admin/login", credentials)
        .then(({ data }) => {
          commit("SET_USER_DATA", data);
        });
    },
    logout({ commit }) {
      commit("LOGOUT");
    },
    isNewUser({ commit }, isNewUser) {
      commit("IS_NEW_USER", isNewUser);
    },
  },
});
