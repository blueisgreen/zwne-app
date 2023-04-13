<template>
  <q-page padding>
    <q-toolbar class="q-gutter-sm">
      <q-toolbar-title>
        <div class="text-h2 text-primary berkshire-swash">Lesson Lab</div>
        <div class="text-caption text-secondary berkshire-swash q-pl-xs">
          Where idealized knowledge sharing is discovered
        </div>
      </q-toolbar-title>
      <q-btn :to="{ name: 'lessonLab' }" color="primary" no-caps dense label="Lessons" />
      <q-btn :to="{ name: 'lessonMedia' }" color="primary" no-caps dense label="Media" />
    </q-toolbar>
    <router-view />
  </q-page>
</template>

<script setup></script>

<style lang="scss" scoped></style>
