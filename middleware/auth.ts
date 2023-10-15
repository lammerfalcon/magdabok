import { useSupabaseUser } from '#imports'

export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser()
  if (process.server) {
    if (to.path === '/login') {
      if (user.value)
        return navigateTo('/')
    }
    if (to.path !== '/login') {
      if (!user.value)
        return navigateTo('/login')
    }
  }

  // if (user.value && to.path === '/login')
  //   return navigateTo('/')
  // if (to.path !== '/')
  //   return navigateTo('/')
})
