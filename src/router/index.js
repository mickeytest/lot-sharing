import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Relation from '@/components/Relation'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/relation',
      name: 'Relation',
      component: Relation
    }
  ]
})
