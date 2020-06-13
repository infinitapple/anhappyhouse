import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/page/Index.vue'
import store from '../store'

Vue.use(VueRouter)

const requireAuth = () => (to, from, next) => {
    if(store.getters.login) return next()
    store.commit('setloginmodal',true)
    next('/search/apt')
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    redirect: '/search/apt'
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../components/page/Signup.vue'),
  },
  {
    path: '/user',
    name: 'user',
    redirect: '/user/info',
    component: () => import('../components/page/user/User.vue'),
    children:[
      {
        path: 'info',
        name: 'userinfo',
        component: () => import('../components/page/user/Info.vue'),
        beforeEnter: requireAuth(),
      },
      {
        path: 'changepwd',
        name: 'userchangepwd',
        component: () => import('../components/page/user/ChangePwd.vue'),
        beforeEnter: requireAuth(),
      },
      {
        path: 'resign',
        name: 'userresign',
        component: () => import('../components/page/user/Resign.vue'),
        beforeEnter: requireAuth(),
      },
      {
        path: 'update',
        name: 'userupdate',
        component: () => import('../components/page/user/Update.vue'),
        beforeEnter: requireAuth(),
      },
    ]
  },
  {
    path: '/search',
    name:'search',
    component: () => import('../components/page/search/Search.vue'),
    children:[
      {
        path: 'apt',
        name: 'searchapt',
        component: () => import('../components/page/search/Apt.vue'),
      },
      {
        path: 'house',
        name: 'searchhouse',
        component: () => import('../components/page/search/House.vue'),
      },
      {
        path: 'interest',
        name: 'searchinterest',
        component: () => import('../components/page/search/Interest.vue'),
        beforeEnter: requireAuth(),
      },
      {
        path: 'aptrent',
        name: 'searchaptrent',
        component: () => import('../components/page/search/AptRent.vue'),
      },
      {
        path: 'houserent',
        name: 'searchhouserent',
        component: () => import('../components/page/search/HouseRent.vue'),
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
