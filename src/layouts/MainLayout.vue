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
        <q-btn :to="{ name: 'home' }" dense flat>
          <q-avatar size="lg">
            <img :src="Zanzibar" alt="Zanzibar, Nuclear Hero" />
          </q-avatar>
        </q-btn>
        <q-toolbar-title> Zanzibar's World of Nuclear Energy </q-toolbar-title>
        <div>
          on Quasar <q-badge>v{{ $q.version }}</q-badge>
        </div>
        <q-separator vertical spaced />
        <div>
          <q-btn v-if="isSignedIn" label="Sign Out" @click="signOut" />
          <q-btn v-else label="Sign In / Join" @click="signUpOrJoin" />
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
  <q-dialog v-model="authDialog">
    <q-card>
      <q-card-section class="q-mt-lg">
        <auth-widget />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Auth } from 'aws-amplify'
import FullNavigation from 'layouts/FullNavigation.vue'
import CommonFooter from 'layouts/CommonFooter.vue'
import Zanzibar from 'assets/Zanzibar.svg'
import AuthWidget from 'components/AmplifyAuthWidget.vue'
import { useUserStore } from 'stores/user-store'

// left nav
const leftDrawerOpen = ref(false)
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

// join / sign in / sign out
const userStore = useUserStore()
const isSignedIn = computed(() => {
  return userStore.isSignedIn
})
const authDialog = ref(false)
const signUpOrJoin = () => {
  authDialog.value = true
}
const signOut = async () => {
  try {
    await Auth.signOut()
    userStore.signOut()
  } catch (error) {
    console.log('error signing out: ', error)
  }
}

onMounted(() => {
  Auth.currentAuthenticatedUser()
    .then((user) => userStore.cacheUser(user))
    .catch((err) => console.log(err))
})
</script>

<style lang="scss" scoped></style>
