import Vue from 'vue'
import Home from '../App.vue'
import DashBoard from '../views/DashBoardPage.vue'
import KgManager from '../views/KgManager'
import Vocabulary from '../views/Vocabulary.vue'
import AgentManager from '../views/AgentManager.vue'
import DialogueStatistics from '../views/DialogueStatistics.vue'
import OperationLog from '../views/OperationLog.vue';
import AccountManage from "../views/AccountManage";

import Left from '../views/Left'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },{
    path: '/dashboard',
    name: 'dashboard',
    component: DashBoard 
  },
  {
    path: '/logs',
    name: 'logs',
    component: OperationLog 
  },
  {
    path: '/userinfo',
    name: 'userinfo',
    component: AccountManage 
  },{
    path: '/KgManager',
    name: 'KgManager',
    component: KgManager
  },{
    path: '/agent',
    name: 'AgentManager',
    component: AgentManager
  },{
    path: '/vocabulary',
    name: 'Vocabulary',
    component: Vocabulary
  },{
    path: '/dialogue',
    name: 'dialogue',
    component: DialogueStatistics
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
