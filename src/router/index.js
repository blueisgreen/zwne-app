import { route } from 'quasar/wrappers'
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router'
import routes from './routes'
import { useUserStore } from 'src/stores/user-store'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory

  const appRouter = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  })

  appRouter.beforeEach((to, from) => {
    console.log('we are moving', { to, from })

    const userStore = useUserStore()

    // see if auth is required and redirect as needed
    if ((to.meta.requiresAuth || to.meta.inGroup) && !userStore.isSignedIn) {
      console.log('sign in required - redirecting')
      return {
        name: 'account',
        query: { redirect: to.fullPath },
      }
    } else if (to.meta.inGroup && userStore.isSignedIn) {
      const ok = userStore.isInGroup(to.meta.inGroup)
      console.log('user is in required group?', { group: to.meta.inGroup, ok })
      if (!ok) {
        return {
          name: from.name,
        }
      }
    }

    return true
  })

  return appRouter
})
