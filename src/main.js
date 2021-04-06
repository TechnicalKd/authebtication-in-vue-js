import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import router from './routes'
import store from './store';
import VueResource from 'vue-resource';


import { MdCard, MdButton, MdField } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'

Vue.use(MdCard)
Vue.use(MdButton)
Vue.use(MdField)
Vue.use(VueResource);

Vue.http.options.root = "https://auth-users-266fa-default-rtdb.firebaseio.com/"


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')