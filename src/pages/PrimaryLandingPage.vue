<template>
  <q-page flex flex-center>
    <div class="text-center">
      <div class="text-h1 kaushan-script q-pt-lg q-pb-md">
        Welcome to Zanzibar's World
      </div>
      <div class="text-subtitle1 q-pb-lg text-secondary">
        Explore the world of nuclear energy, the ultimate source of power for everything.
      </div>
      <q-img :src="Zanzibar" width="50%" alt="Zanzibar, Nuclear Hero" />
      <div class="q-py-sm">
        I am Zanzibar. You can call me Zanzi. Let me show you everything we know about
        nuclear energy.
      </div>
    </div>
  </q-page>
</template>

<script setup>
import Zanzibar from 'assets/Zanzibar.svg'
</script>

<style lang="scss" scoped>
.mega-title {
  font-family: 'RubikPixels';
}
</style>
