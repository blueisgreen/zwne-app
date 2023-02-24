<template>
  <div>
    <div class="text-h4">
      <slot name="title" />
    </div>
    <div class="row">
      <div class="col">
        <slot name="image"></slot>
      </div>
      <div class="col lesson-text">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.gap {
  padding: 1em;
}
.lesson-text {
  font-size: medium;
}
</style>
