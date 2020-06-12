import Vue from 'vue';
import VueRouter from 'vue-router';

import Index from '@/components/page/Index.vue';

import User from '@/components/page/user/User.vue';
import UserInfo from '@/components/page/user/Info.vue';
import UserChangePwd from '@/components/page/user/ChangePwd.vue';
import UserResign from '@/components/page/user/Resign.vue';
import UserUpdate from '@/components/page/user/Update.vue';

import Search from '@/components/page/search/Search.vue';
import SearchApt from '@/components/page/search/Apt.vue';
import SearchHouse from '@/components/page/search/House.vue';
import SearchInterest from '@/components/page/search/Interest.vue';
import SearchAptRent from '@/components/page/search/AptRent.vue';
import SearchHouseRent from '@/components/page/search/HouseRent.vue';

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes : [
        {
            path: '/',
            name: 'Index',
            component: Index,
            redirect: '/search/apt',
        },
        {
            path: '/user',
            component: User,
            redirect: '/user/info',
            children:[
                {
                    path: 'info',
                    name: 'UserInfo',
                    component: UserInfo
                },
                {
                    path: 'changepwd',
                    name: 'UserChangePwd',
                    component: UserChangePwd
                },
                {
                    path: 'resign',
                    name: 'UserResign',
                    component: UserResign
                },
                {
                    path: 'update',
                    name: 'UserUpdate',
                    component: UserUpdate
                },
            ]
        },
        {
            path: '/search',
            component: Search,
            redirect: '/search/apt',
            children:[
                {
                    path: 'apt',
                    name: 'SearchApt',
                    component: SearchApt
                },
                {
                    path: 'house',
                    name: 'SearchHouse',
                    component: SearchHouse
                },
                {
                    path: 'interest',
                    name: 'SearchInterest',
                    component: SearchInterest
                },
                {
                    path: 'aptrent',
                    name: 'SearchAptRent',
                    component: SearchAptRent
                },
                {
                    path: 'houserent',
                    name: 'SearchHouseRent',
                    component: SearchHouseRent
                },
            ]
        },
          
    ]
});