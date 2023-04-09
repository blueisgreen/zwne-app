<template>
  <authenticator>
    <template v-slot="{ user }">
      <div class="text-h2">Hello {{ user.username }}!</div>
      <div class="q-pt-md q-pl-xs text-subtitle1">
        Thanks for being a member. Let's learn about nuclear energy.
      </div>
    </template>
  </authenticator>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { Hub } from 'aws-amplify'
import { Auth } from 'aws-amplify'
import { useUserStore } from 'stores/user-store'
import { Authenticator } from '@aws-amplify/ui-vue'
import '@aws-amplify/ui-vue/styles.css'

const userStore = useUserStore()
const hubListenerCancelToken = ref(null)

const onAuthEvent = (payload) => {
  console.log('auth payload', payload)
  if (payload.event === 'signIn') {
    Auth.currentAuthenticatedUser()
      .then((user) => userStore.cacheUser(user))
      .catch((err) => console.log(err))
    console.log('now stop listening to auth events')
    hubListenerCancelToken.value()
  }
}

// listen until log-in event happens?
onMounted(() => {
  hubListenerCancelToken.value = Hub.listen('auth', (data) => {
    const { payload } = data
    onAuthEvent(payload)
  })
})

// consider stopping once log-in event happens
onUnmounted(() => {
  console.log('stop listening for auth events')
  hubListenerCancelToken.value()
})
</script>

<style lang="scss" scoped></style>
