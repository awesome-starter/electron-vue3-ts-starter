import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'
import config from '@/config'

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.afterEach((to) => {
  const { title } = to.meta
  const { websiteTitle } = config
  document.title = title ? `${title} - ${websiteTitle}` : websiteTitle
})

export default router
