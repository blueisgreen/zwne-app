<template>
  <q-page padding>
    <lesson-frame>
      <template #title>{{ lessonTitle }}</template>
      <template #image><q-img :src="lessonImage" /></template>
      <div v-html="lessonContent" />
    </lesson-frame>
  </q-page>
</template>

<script setup>
import LessonFrame from 'src/pages/lessons/LessonFrame.vue'
const lessonTitle = 'How Fission Works'
const lessonImage =
  'https://cdn.zanzisworld.com/images/PWR_nuclear_power_plant_diagram.svg'
const lessonContent =
  '<p>\
        Fission happens when high-energy neutrons are shot into atoms that are \
        fit to burst. Uranium is just such an atom. It is so big that adding a \
        neutron at high speed splits the dang thing in two, release extra energy \
        and more high-energy neutrons in the process. \
      </p> \
\
      <p>Looks like we have a nice chain reaction.</p> \
\
      <p> \
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod \
        tempor incididunt ut labore et dolore magna aliqua. Egestas diam in arcu \
        cursus. Pellentesque id nibh tortor id aliquet lectus proin nibh. Eros \
        donec ac odio tempor orci dapibus ultrices in. Dictum at tempor commodo \
        ullamcorper a. Neque volutpat ac tincidunt vitae. Amet consectetur \
        adipiscing elit ut aliquam purus sit. Arcu bibendum at varius vel \
        pharetra vel turpis nunc. Donec ultrices tincidunt arcu non sodales \
        neque sodales. Diam volutpat commodo sed egestas egestas fringilla \
        phasellus faucibus. Sodales neque sodales ut etiam sit amet nisl. Velit \
        dignissim sodales ut eu sem integer vitae justo. Elit scelerisque mauris \
        pellentesque pulvinar pellentesque. Elit at imperdiet dui accumsan sit \
        amet nulla facilisi. Elementum pulvinar etiam non quam lacus suspendisse \
        faucibus. Id interdum velit laoreet id donec. \
      </p> \
 \
      <p> \
        Erat imperdiet sed euismod nisi porta lorem mollis. Nisl nisi \
        scelerisque eu ultrices vitae auctor eu. Commodo ullamcorper a lacus \
        vestibulum sed arcu. Convallis convallis tellus id interdum velit \
        laoreet id donec. Suspendisse faucibus interdum posuere lorem ipsum \
        dolor. Ultrices dui sapien eget mi proin. Ac tincidunt vitae semper quis \
        lectus nulla at volutpat. Lacus vel facilisis volutpat est velit \
        egestas. Amet aliquam id diam maecenas ultricies mi eget mauris \
        pharetra. Non curabitur gravida arcu ac tortor. Viverra ipsum nunc \
        aliquet bibendum enim facilisis gravida neque. Arcu risus quis varius \
        quam. Arcu dictum varius duis at. Mattis rhoncus urna neque viverra \
        justo nec ultrices. Massa sapien faucibus et molestie ac. Condimentum \
        mattis pellentesque id nibh tortor id. \
      </p>'
</script>

<style lang="scss" scoped></style>
