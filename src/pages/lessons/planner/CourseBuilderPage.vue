<template>
  <q-page padding>
    <q-card style="width: 45%" bordered>
      <q-card-section>
        <div class="text-h6">Lessons</div>
      </q-card-section>
      <q-separator inset />
      <q-card-section>
        <q-scroll-area style="height: 500px">
          <q-list>
            <q-item
              v-for="plan in courseBuilder.lessonPlanList"
              :key="plan.id"
              dense
              clickable
            >
              <q-item-section>
                <q-item-label>{{ plan.title }}</q-item-label>
                <q-item-label caption>{{ plan.subtitle }}</q-item-label>
                <q-item-label lines="2"
                  ><span v-html="plan.content"
                /></q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { useCourseBuilderStore } from 'stores/course-builder.js'

const courseBuilder = useCourseBuilderStore()
const path = {
  name: 'All About Atoms',
  trailhead: 'abc1',
}
</script>

<style lang="scss" scoped></style>
