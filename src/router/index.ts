import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    name: 'start',
    path: '/:restoId',
    component: () => import ('../views/StartPage.vue'),
    props: true
  },
  {
    name: 'home',
    path: '/:restoId/home',
    component: () => import ('../views/HomePage.vue'),
    props: true
  },
  {
    name: 'rubrique',
    path: '/:restoId/rubrique/:rubriqueId',
    component: () => import ('../views/RubriquePage.vue'),
    props: true
  },
  {
    name: 'panier',
    path: '/:restoId/panier',
    component: () => import ('../views/PanierPage.vue'),
    props: true
  },
  {
    name: 'PageNotFound',
    path: '/404',
    component: () => import ('../views/NotfoundPage.vue')
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
