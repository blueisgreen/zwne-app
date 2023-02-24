<template>
  <q-footer reveal elevated>
    <q-toolbar>
      <q-toolbar-title>
        <div class="copyright-text">
          &copy; 2021-{{ year }}
          <a href="https://www.happyspiritenterprises.com"
            >Happy Spirit Enterprises</a
          >
        </div>
      </q-toolbar-title>
      <q-btn flat size="sm" to="/privacy-and-terms">Privacy Policy</q-btn>
      <q-btn flat size="sm" :to="{ name: 'legal' }">Terms of Use</q-btn>
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
