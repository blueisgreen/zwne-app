<template>
  <q-page padding>
    <div class="text-h1 q-pt-lg q-pb-md text-primary">Your Account</div>
    <div class="text-subtitle1 q-pb-lg text-blue-10">
      Your identity, public profile, subscriptions and preferences.
    </div>
    <hr />
    <div class="q-pa-md text-center">
      <div class="text-h2">Auth Widget</div>
      <auth-widget />
    </div>
    <hr />
    <div class="text-h2">Your Profile</div>
    <hr />
    <div class="text-h2">Membership Status</div>
    <hr />
    <div class="text-h2">Preferences</div>
  </q-page>
</template>

<script setup>
import { onMounted } from 'vue'
import { useUserStore } from 'stores/user-store'
import { Auth } from 'aws-amplify'
import AuthWidget from 'components/AmplifyAuthWidget.vue'

const userStore = useUserStore()

onMounted(() => {
  Auth.currentAuthenticatedUser()
    .then((user) => userStore.cacheUser(user))
    .catch((err) => console.log(err))
  Auth.currentSession()
    .then((data) => userStore.cacheSession(data))
    .catch((err) => console.log(err))
})
</script>

<style lang="scss" scoped></style>
