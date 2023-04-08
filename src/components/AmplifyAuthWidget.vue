<template>
  <authenticator>
    <template v-slot="{ user }">
      <h1>Hello {{ user.username }}!</h1>
      <div class="text-subtitle1">You are so logged in. Use it to the max.</div>
    </template>
  </authenticator>
</template>

<script setup>
import { Authenticator } from '@aws-amplify/ui-vue'
import '@aws-amplify/ui-vue/styles.css'
</script>

<style lang="scss" scoped></style>
