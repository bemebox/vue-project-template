import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../components/Dashboard.vue'
import Profile from '../components/Profile.vue'
import NotFound from '../components/404NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
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
