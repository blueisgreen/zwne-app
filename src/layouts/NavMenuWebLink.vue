<template>
  <q-item clickable tag="a" :href="link" :target="spawn ? '_blank' : null">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    default: 'To the Web...',
  },
  icon: {
    type: String,
    default: 'fa-solid fa-cloud',
  },
  link: {
    type: String,
    default: null,
  },
  spawn: {
    type: Boolean,
    default: false,
  },
})
</script>
