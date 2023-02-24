<template>
  <q-page padding>
    <q-img :src="lessonImage" />
    <div class="text-h2 q-pt-lg q-pb-md text-primary">
      The Universe Runs on Nuclear Energy
    </div>
    <div class="text-subtitle1 q-pb-lg text-blue-10">
      Everything depends on nuclear energy, so let's make the most of it.
    </div>
    <div class="text-body1 q-py-lg" v-html="lessonContent" />
    <hr />
    <div>Go big</div>
    <ul>
      <li>How the sun works</li>
      <li>How much fuel is available on the earth</li>
    </ul>
    <div>Go small</div>
    <ul>
      <li>
        Elemental particals - electrons, protons, neutrons, quarks, and more
      </li>
      <li>The structure of an atom</li>
      <li>How nuclear fission works</li>
      <li>How nuclear fusion works</li>
    </ul>
  </q-page>
</template>

<script setup>
const lessonImage =
  'https://www.nasa.gov/sites/default/files/styles/full_width/public/thumbnails/image/hubble_liller1.jpg?itok=xFAiLYn7'
const lessonContent =
  '<p class="">\
        Stars run on nuclear fusion. \
      </p> \
\
      <p>Nuclear fission heats the core of planets.</p> \
\
      <p> \
        The big bang created enough fissile material to last forever. \
        This will sustain us as long as the universe lasts, which is all \
        the time we get. 8 billion years to go? \
      </p>'
</script>

<style lang="scss" scoped></style>
