import { defineStore } from 'pinia'
import { fetchPublishedLessons, fetchFullLesson } from '../api'

export const useViewingStore = defineStore('viewing', {
  state: () => ({
    lessonIndex: {},
  }),

  getters: {
    lesson: (state) => {
      return (id) => {
        return state.lessonIndex[id]
      }
    },
    published: (state) => {
      const published = []
      const ids = Object.keys(state.lessonIndex)
      console.log('published', { ids, index: state.lessonIndex })
      ids.forEach((id) => {
        const candidate = state.lessonIndex[id]
        if (candidate.status === 'PUBLISHED') {
          published.push(candidate)
        }
      })
      return published
    },
  },

  actions: {
    cacheLesson(lesson) {
      this.lessonIndex[lesson.id] = lesson
    },
    async loadPublished() {
      const lessons = await fetchPublishedLessons()
      lessons.forEach((lesson) => this.cacheLesson(lesson))
    },
    async loadLesson(id) {
      const lesson = await fetchFullLesson(id)
      this.cacheLesson(lesson)
    },
  },
})
