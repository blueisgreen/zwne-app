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
  <q-dialog v-model="aboutAuth">
    <q-card>
      <q-card-section>
        <div class="text-h6">Sign Up / Sign In</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <auth-widget />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue'
import FullNavigation from 'layouts/FullNavigation.vue'
import CommonFooter from 'layouts/CommonFooter.vue'
import Zanzibar from 'assets/Zanzibar.svg'
import AuthWidget from 'components/AmplifyAuthWidget.vue'

const aboutAuth = ref(false)
const signedIn = ref(false)
const toggleSignedIn = () => {
  aboutAuth.value = true
  signedIn.value = !signedIn.value
}
const leftDrawerOpen = ref(false)
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<style lang="scss" scoped></style>
