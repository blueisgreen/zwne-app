<template>
  <q-item clickable tag="a" :exact="exact" :to="{ name: route }">
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
    default: 'Try it.',
  },
  icon: {
    type: String,
    default: 'fa-solid fa-star',
  },
  route: {
    type: String,
    default: null,
  },
  exact: {
    type: Boolean,
    default: false,
  },
})
</script>
