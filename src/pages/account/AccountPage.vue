<template>
  <q-page padding>
    <div class="text-h1 q-pt-lg q-pb-md text-primary">Your Account</div>
    <div class="text-subtitle1 q-pb-lg text-blue-10">
      Your online identity, public profile, and preferences.
    </div>
    <q-separator spaced inset />
    <div class="q-pa-md">
      <div v-if="!isSignedIn" class="text-h4 text-weight-medium">
        Who are you?
      </div>
      <div class="q-mt-lg">
        <auth-widget />
      </div>
    </div>
    <div v-if="isSignedIn">
      <q-separator spaced inset />
      <div class="q-pa-md">
        <div class="text-h4 text-weight-medium">Your Profile</div>
        <div class="row q-pt-md">
          <div class="col-2 field-label">Username:</div>
          <div class="col">{{ userStore.username }}</div>
        </div>
        <div class="row q-pt-md">
          <div class="col-2 field-label">Email address:</div>
          <div class="col">
            {{ userStore.email }}
            <q-icon
              v-if="isEmailVerified"
              name="check"
              color="primary"
              size="1.5em"
            />
            <span v-else>?</span>
          </div>
        </div>
        <div class="row q-pt-md">
          <div class="col-2 field-label">Membership:</div>
          <div class="col">Active and awesome!</div>
        </div>
      </div>
      <q-separator spaced inset />
      <div class="q-pa-md">
        <div class="text-h4 text-weight-medium">Preferences</div>
        <div class="row q-pt-md">
          <div class="col-2 field-label">Communication:</div>
          <div class="col">
            We will only contact you about news in Zanzibar's World.
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, onUpdated, computed } from 'vue'
import { useUserStore } from 'stores/user-store'
import { Auth } from 'aws-amplify'
import AuthWidget from 'components/AmplifyAuthWidget.vue'

const userStore = useUserStore()
const isSignedIn = computed(() => {
  return userStore.isSignedIn
})
const isEmailVerified = computed(() => {
  return userStore.emailVerified
})

onUpdated(() => {
  Auth.currentAuthenticatedUser()
    .then((user) => userStore.cacheUser(user))
    .catch((err) => console.log(err))
})
onMounted(() => {
  Auth.currentAuthenticatedUser()
    .then((user) => userStore.cacheUser(user))
    .catch((err) => console.log(err))
})
</script>

<style lang="scss" scoped>
.field-label {
  font-weight: bold;
  color: $secondary;
}
</style>
