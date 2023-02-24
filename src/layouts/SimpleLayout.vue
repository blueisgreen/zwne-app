<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-light-blue-3 text-blue-grey-9">
        <q-btn
          flat
          dense
          round
          icon="fa-solid fa-atom"
          aria-label="Home"
          :to="{ name: 'home' }"
        />

        <q-toolbar-title>
          Zanzibar's World of Elemental Energy
        </q-toolbar-title>

        <div>
          <q-btn label="Sign In" :to="{ name: 'account' }" />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
