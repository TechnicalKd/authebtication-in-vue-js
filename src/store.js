 /* eslint-disable */
 import Vue from 'vue'
 import Vuex from 'vuex'

 Vue.use(Vuex);

 const FbAuth = "https://identitytoolkit.googleapis.com/v1/"
 const FbKey = "AIzaSyBnit_qQor7TAwZgUHUq4xUVJPF2FeHZbM"


 export default new Vuex.Store({
     state: {
         email: "",
         token: "",
         refresh: "",
         user: ""
     },
     getters: {
         isAuth(state) {
             if (state.token) { return true }
             return false
         }
     },
     mutations: {
         addUserInfo(state, userInfo) {
             state.user = userInfo
         },
         auth(state, authData) {
             state.email = authData.email,
                 state.token = authData.idToken,
                 state.refresh = authData.refreshToken
         },
         logout(state) {
             state.email = null,
                 state.token = null,
                 state.refresh = null,
                 localStorage.removeItem("token")
             localStorage.removeItem("refresh")
         }
     },
     actions: {
         getUserInfo({ commit }, payload) {
             Vue.http.post(`${FbAuth}accounts:lookup?key=${FbKey}`, {
                     idToken: payload
                 })
                 .then(response => response.json())
                 .then(authData => {
                     commit("addUserInfo", authData.users[0])
                     console.log(authData)
                 })
         },
         refreshToken({ commit }) {
             const refreshToken = localStorage.getItem("refresh");
             if (refreshToken) {
                 Vue.http.post(`https://securetoken.googleapis.com/v1/token?key=${FbKey}`, {
                         grant_type: 'refresh_token',
                         refresh_token: refreshToken
                     })
                     .then(response => response.json())
                     .then(authData => {
                         commit("auth", {
                             idToken: authData.id_token,
                             refreshToken: authData.refresh_token
                         });
                         localStorage.setItem("token", authData.idToken)
                         localStorage.setItem("refresh", authData.refreshToken)
                     })
             }


         },
         signin({ commit }, payload) {
             Vue.http.post(`${FbAuth}accounts:signInWithPassword?key=${FbKey}`, {
                     ...payload,
                     returnSecureToken: true
                 })
                 .then(response => response.json())
                 .then(authData => {
                     commit("auth", authData)
                     localStorage.setItem("token", authData.idToken)
                     localStorage.setItem("refresh", authData.refreshToken)
                 })
         },
         signup({ commit }, payload) {
             Vue.http.post(`${FbAuth}accounts:signUp?key=${FbKey}`, {
                     ...payload,
                     returnSecureToken: true
                 })
                 .then(response => response.json())
                 .then(authData => {
                     commit("auth", authData);
                     localStorage.setItem("token", authData.idToken)
                     localStorage.setItem("refresh", authData.refreshToken)

                 })
         }
     }
 })