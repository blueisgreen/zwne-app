<template>
  <div class="q-pa-md">
    <q-btn-dropdown class="glossy" color="secondary" label="Who">
      <div class="row no-wrap q-pa-md">
        <div class="column">
          <div class="text-h6 q-mb-md">Groups</div>
          <div>
            {{ groups }}
          </div>
        </div>

        <q-separator vertical inset class="q-mx-lg" />

        <div class="column items-center">
          <q-avatar size="72px">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>

          <div class="text-subtitle1 q-mt-md q-mb-xs">
            {{ userStore.username }}
          </div>

          <q-btn
            color="primary"
            label="Sign Out"
            @click="signOut"
            push
            size="sm"
            v-close-popup
          />
        </div>
      </div>
    </q-btn-dropdown>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from 'stores/user-store'
import { Auth } from 'aws-amplify'

const userStore = useUserStore()
const groups = computed(() => {
  return userStore.groups && userStore.groups.length
    ? userStore.groups.join(', ')
    : 'None'
})

const signOut = async () => {
  try {
    await Auth.signOut()
    userStore.signOut()
  } catch (error) {
    console.log('error signing out: ', error)
  }
}
</script>

<style lang="scss" scoped></style>
