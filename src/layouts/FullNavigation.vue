<template>
  <q-list>
    <q-item-label header> The Experience </q-item-label>
    <nav-route-link v-for="link in filteredInsideLinks" :key="link.title" v-bind="link" />
  </q-list>
  <div>&nbsp;</div>
  <q-separator />
  <q-list>
    <q-item-label header> Outside World </q-item-label>
    <nav-web-link v-for="link in outsideLinks" :key="link.title" v-bind="link" />
  </q-list>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import NavRouteLink from 'src/layouts/NavMenuRouteLink.vue'
import NavWebLink from 'layouts/NavMenuWebLink.vue'
import { insideLinks, outsideLinks } from 'src/layouts/navLinks.js'
import { useUserStore } from 'stores/user-store'

const router = useRouter()
const user = useUserStore()

const filteredInsideLinks = computed(() => {
  return insideLinks.filter((menuItem) => {
    return !menuItem.groupWithAccess || user.isInGroup(menuItem.groupWithAccess)
  })
})

onMounted(() => {
  console.log('router', router)
  console.log('routes', router.getRoutes())
  // routes.forEach((route) => console.log('', route))
})
</script>

<style lang="scss" scoped></style>
