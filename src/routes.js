import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './components/Pages/home.vue'
import SignUp from './components/User/signup.vue'
import SignIn from './components/User/signin.vue'
import Dashboard from './components/User/dashboard.vue';
import store from './store'
Vue.use(VueRouter)

const routes = [
    { path: '/', component: Home },
    { path: '/signin', component: SignIn },
    { path: '/signup', component: SignUp },
    {
        path: '/dashboard',
        component: Dashboard,
        beforeEnter: (to, from, next) => {
            if (store.state.token) {
                next();
            } else {
                next('/')
            }
        }
    },
]

export default new VueRouter({ mode: 'history', routes })