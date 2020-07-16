import Vue from 'vue'
import Home from '../App.vue'
import DashBoardPage from '../views/DashBoardPage.vue'
import KgManager from '../views/KgManager'
import KgEdit from '../views/KgEdit.vue'
import Vocabulary from '../views/Vocabulary.vue'
import AgentManager from '../views/AgentManager.vue'
import DialogueStatistics from '../views/DialogueStatistics.vue'
import OperationLog from '../views/OperationLog.vue'
import AccountManage from "../views/AccountManage"
import SensitiveVocab from '../views/SensitiveVocab.vue'
import QAmanager from '../views/QAmanager.vue'
import CrawlerList from '../views/CrawlerList.vue'
import CrawlerNew from '../views/CrawlerNew.vue'
import IndexPage from '../views/IndexPage.vue'
import Login from '../views/Login.vue'
//import QAimport from '../views/QAimport.vue'
//import uploadExcel from '../views/uploadExcel.vue'


import test from '../views/test.vue';

import Left from '../views/Left'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import hello from '../views/hello'
const routes = [
    {
        path: '/',
        redirect: '/indexpage',
        meta: {
            keepAlive: false
          }
    }, {
        path: '/indexpage',
        name:'IndexPage',
        component: IndexPage
    }, {
        path: '/login',
        name:'Login',
        component: Login,
        meta: {
            keepAlive: false
          }
    }, {
        path: '/test',
        component: test,
    }, {
        path: '/dashboard',
        name: 'dashboard',
        component: DashBoardPage,
        meta: {
            keepAlive: true,
            requireAuth: true
          }
   
    }, {
        path: '/logs',
        name: 'logs',
        component: OperationLog,
        meta: {
            keepAlive: true
          }

    }, {
        path: '/userinfo',
        name: 'userinfo',
        component: AccountManage,
        meta: {
            keepAlive: true
          }
  
    }, {
        path: '/KgManager',
        name: 'KgManager',
        component: KgManager,
        meta: {
            keepAlive: true
          }
 
    }, {
        path: '/agent',
        name: 'AgentManager',
        component: AgentManager,
        meta: {
            keepAlive: true
          }

    }, {
        path: '/vocabulary',
        name: 'Vocabulary',
        component: Vocabulary,
        meta: {
            keepAlive: true
          }

    }, {
        path: '/dialogue',
        name: 'dialogue',
        component: DialogueStatistics,
        meta: {
            keepAlive: true
          }

    }, {
        path: '/hello',
        name: 'hello',
        component: hello,
        meta: {
            keepAlive: true
          }

    }, {
        path: '/SensitiveVocab',
        name: 'SensitiveVocab',
        component: SensitiveVocab,
        meta: {
            keepAlive: true
          }

    }, {
        path: '/QAmanager',
        name: 'QAmanager',
        component: QAmanager,
        meta: {
            keepAlive: true
          }

    }, {
        path: '/KgEdit',
        name: 'KgEdit',
        component: KgEdit,
        meta: {
            keepAlive: true
          }
 
    }, {
        path: '/CrawlerList',
        name: 'CrawlerList',
        component: CrawlerList,
        meta: {
            keepAlive: true
          }

    }, {
        path: '/CrawlerNew',
        name: 'CrawlerNew',
        component: CrawlerNew,
        meta: {
            keepAlive: true
          }

    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router