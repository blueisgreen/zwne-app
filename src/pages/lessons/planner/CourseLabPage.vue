<template>
  <q-page padding>
    <div class="text-h3">Course Laboratory</div>
    <div class="text-subtitle1">Where idealized knowledge sharing is discovered</div>
    <div>
      <q-btn :to="{ name: 'courseBuilder' }" no-caps color="primary"
        >Work with Courses</q-btn
      >
    </div>
    <q-separator spaced />
    <div>
      <q-btn :to="{ name: 'lessonPlanner' }" no-caps color="primary"
        >Work with Lessons</q-btn
      >
    </div>
    <q-separator spaced />
    <div>
      <q-btn no-caps flat disabled>Work with images, video -- not implemented</q-btn>
    </div>
    <div>
      <q-btn no-caps flat disabled>Work with Quizzes -- not implemented</q-btn>
    </div>
  </q-page>
</template>

<script setup></script>

<style lang="scss" scoped></style>
