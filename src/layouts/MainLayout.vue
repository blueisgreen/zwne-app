<template>
  <q-layout view="hHh Lpr fFf">
    <q-header reveal elevated>
      <q-toolbar class="glossy">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-avatar size="lg">
          <img src="/icons/favicon-128x128.png" />
        </q-avatar>
        <q-toolbar-title> Zanzibar's World of Nuclear Energy </q-toolbar-title>
        <div>
          on Quasar <q-badge>v{{ $q.version }}</q-badge>
        </div>
        <q-separator vertical spaced />
        <div>
          <q-btn
            :label="signedIn ? 'Sign Out' : 'Sign In'"
            @click="toggleSignedIn"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <full-navigation />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <common-footer />
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import FullNavigation from 'layouts/FullNavigation.vue'
import CommonFooter from 'layouts/CommonFooter.vue'

const signedIn = ref(false)
const toggleSignedIn = () => {
  signedIn.value = !signedIn.value
}
const leftDrawerOpen = ref(false)
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<style lang="scss" scoped></style>
