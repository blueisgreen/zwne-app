<template>
  <q-page flex flex-center>
    <div v-for="fontFamily in fontFamilies" :key="fontFamily" :class="fontFamily">
      <div class="text-subtitle2">{{ fontFamily }}</div>
      <div class="text-center text-h1">{{ title }}</div>
      <div class="text-center text-subtitle1 q-pt-lg q-px-md">
        {{ subtitle }}
      </div>
      <div class="q-pa-md">{{ content }}</div>
      <q-separator spaced />
    </div>
  </q-page>
</template>

<script setup>
const title = "Welcome to Zanzibar's World"
const subtitle =
  'Explore the world of nuclear power, the most effective source of energy to help us thrive.'
const content =
  'Call me Zanzi. Let me show you everything we know about nuclear power. Call me Zanzi. Let me show you everything we know about nuclear power. Call me Zanzi. Let me show you everything we know about nuclear power.'

const fontFamilies = [
  'BlargyPants (default)',
  'rubik-pixels',
  'berkshire-swash',
  'tilt-prism',
  'eb-garamond',
]
</script>

<style lang="scss" scoped></style>
