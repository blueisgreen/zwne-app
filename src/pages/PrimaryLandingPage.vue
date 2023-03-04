<template>
  <q-page flex flex-center>
    <div class="text-center">
      <div class="text-h1 q-pt-lg q-pb-md text-primary">
        Welcome to Zanzibar's World
      </div>
      <div class="text-subtitle1 q-pb-lg text-blue-10">
        Explore the world of nuclear power, the most effective source of energy
        to help us thrive.
      </div>
      <q-img :src="Zanzibar" width="50%" />
      <div class="q-py-sm">
        I am Zanzibar. Let me show you everything we know about nuclear power.
      </div>
    </div>
  </q-page>
</template>

<script setup>
import Zanzibar from 'assets/Zanzibar.svg'
</script>

<style lang="scss" scoped></style>
