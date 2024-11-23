import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../components/Dashboard.vue'
import NotFound from '../components/404NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
    },
    // This is the catch-all route for undefined paths (404 page)
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound, // The 404 page component
    },
  ],
})

export default router
