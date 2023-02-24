<template>
  <q-page padding>
    <div class="text-h1 q-pt-lg q-pb-md text-primary">Your Account</div>
    <div class="text-subtitle1 q-pb-lg text-blue-10">
      Your identity, public profile, subscriptions and preferences.
    </div>
    <hr />
    <div class="q-pa-md text-center">
      <div class="text-h2">Who Are You?</div>
      <amplify-auth-widget />
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
import AmplifyAuthWidget from 'src/pages/account/AmplifyAuthWidget.vue'
</script>

<style lang="scss" scoped></style>
