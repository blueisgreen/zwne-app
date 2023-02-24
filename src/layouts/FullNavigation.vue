<template>
  <q-list>
    <q-item-label header> The Experience </q-item-label>
    <nav-route-link
      v-for="link in insideLinks"
      :key="link.title"
      v-bind="link"
    />
  </q-list>
  <div>&nbsp;</div>
  <q-separator />
  <q-list>
    <q-item-label header> Insider Views </q-item-label>
    <nav-route-link
      v-for="link in priviledgedLinks"
      :key="link.title"
      v-bind="link"
    />
  </q-list>
  <div>&nbsp;</div>
  <q-separator />
  <q-list>
    <q-item-label header> Outside World </q-item-label>
    <nav-web-link
      v-for="link in outsideLinks"
      :key="link.title"
      v-bind="link"
    />
  </q-list>
</template>

<script setup>
import NavRouteLink from 'src/layouts/NavMenuRouteLink.vue'
import NavWebLink from 'layouts/NavMenuWebLink.vue'
import {
  insideLinks,
  priviledgedLinks,
  outsideLinks,
} from 'src/layouts/navLinks.js'
</script>

<style lang="scss" scoped></style>
