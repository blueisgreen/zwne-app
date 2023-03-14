<template>
  <q-footer reveal elevated>
    <q-toolbar>
      <q-toolbar-title>
        <div class="copyright-text">
          &copy; 2021-{{ year }}
          <a href="https://www.happyspiritenterprises.com">Happy Spirit Enterprises</a>
        </div>
      </q-toolbar-title>
      <router-link :to="{ name: 'legal' }">Privacy Policy</router-link>
      <span class="q-pl-sm"
        ><router-link :to="{ name: 'legal' }">Terms of Use</router-link></span
      >
    </q-toolbar>
  </q-footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<style scoped>
.copyright-text {
  font-size: small;
  color: white;
}
a:link {
  color: white;
}
a:visited {
  color: white;
}
a:hover {
  color: white;
}
a:active {
  color: white;
}
</style>
