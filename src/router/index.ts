import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import ChannelPage from '../views/ChannelPage.vue'
import ChartPage from '../views/ChartPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/:channel',
      name: 'channel',
      component: ChannelPage,
    },
    {
      path: '/:channel/:id',
      name: 'chart',
      component: ChartPage,
    },
  ],
})

export default router
