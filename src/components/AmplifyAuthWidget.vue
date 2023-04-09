<template>
  <authenticator>
    <template v-slot="{ user }">
      <div class="text-h2">Hello {{ user.username }}!</div>
      <div class="q-pt-md q-pl-xs text-subtitle1">
        Thanks for being a member. Let's learn about nuclear energy.
      </div>
    </template>
  </authenticator>
</template>

<script setup>
import { Authenticator } from '@aws-amplify/ui-vue'
import '@aws-amplify/ui-vue/styles.css'
</script>

<style lang="scss" scoped></style>
