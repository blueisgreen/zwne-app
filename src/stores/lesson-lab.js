import { defineStore } from 'pinia'
import {
  createLesson,
  fetchAllLessons,
  fetchLesson,
  fetchLessonContent,
  updateLesson,
  updateContent,
  deleteLesson,
} from '../api'
import { toAWSDateTime } from '../components/modelTools'
import { LessonStatus } from '../models'

export const useLessonLabStore = defineStore('lessonLab', {
  state: () => ({
    lessonIndex: {},
    lessonContentIndex: {},
  }),

  getters: {
    lesson(state) {
      return (id) => {
        const cached = state.lessonIndex[id]
        if (!cached) {
          console.warn('lesson with ID not found in cache', id)
        }
        return cached
      }
    },
    lessonContent(state) {
      return (id) => {
        const cached = state.lessonContentIndex[id]
        if (!cached) {
          console.warn('content for lesson not found in cache', id)
        }
        return cached
      }
    },
    lessonIdList(state) {
      return Object.keys(state.lessonIndex)
    },
    lessonList(state) {
      return state.lessonIdList.map((id) => state.lessonIndex[id])
    },
  },

  actions: {
    cacheLesson(lesson) {
      if (!lesson || !lesson.id) {
        console.warn('Cannot cache null lesson or lesson with null ID', lesson)
        return
      }
      this.lessonIndex[lesson.id] = lesson
    },
    cacheLessonContent(lessonId, content) {
      if (!lessonId || !content) {
        console.warn('Need a lesson ID and some content to cache', {
          lessonId,
          content,
        })
        return
      }
      this.lessonContentIndex[lessonId] = content
    },
    removeLessonFromCache(id) {
      if (this.lessonIndex[id]) {
        delete this.lessonIndex[id]
      }
      if (this.lessonContentIndex[id]) {
        delete this.lessonContentIndex[id]
      }
    },
    async spawnLesson(title) {
      console.log('spawnLesson', title)
      const freshlyMinted = await createLesson(title)
      this.cacheLesson(freshlyMinted)
    },
    async loadLessons() {
      console.log('loadLessons')
      const lessons = await fetchAllLessons()
      lessons.forEach((lesson) => this.cacheLesson(lesson))
    },
    async loadLesson(id) {
      console.log('loadLesson', id)
      const lesson = await fetchLesson(id)
      this.cacheLesson(lesson)
    },
    async loadLessonContent(id) {
      console.log('loadLessonContent', id)
      const lesson = await fetchLessonContent(id)
      this.cacheLessonContent(lesson)
    },
    async saveLesson(deltas) {
      console.log('saveLesson', deltas)
      const next = await updateLesson(deltas)
      this.cacheLesson(next)
    },
    async saveContent(id, contentToSave) {
      console.log('saveLesson', { id, contentUpdate: contentToSave })
      const next = await updateContent(id, contentToSave)
      this.cacheLessonContent(next)
    },
    async publishLesson(id) {
      console.log('publishLesson', id)
      await saveLesson(id, {
        publishedAt: toAWSDateTime(new Date()),
        status: LessonStatus.PUBLISHED,
      })
    },
    async retractLesson(id) {
      console.log('retractLesson', id)
      await saveLesson(id, {
        publishedAt: null,
        status: LessonStatus.DRAFT,
      })
    },
    async archiveLesson(id) {
      console.log('archiveLesson', id)
      await saveLesson(id, {
        archivedAt: toAWSDateTime(new Date()),
        status: LessonStatus.ARCHIVED,
      })
    },
    async reviveLesson(id) {
      // TODO: think through lifecycle, and purpose and logic of in-review
      console.log('reviveLesson', id)
      await saveLesson(id, {
        archivedAt: null,
        status: LessonStatus.IN_REVIEW,
      })
    },
    async purgeLesson(id) {
      console.log('purgeLesson', id)
      const deleted = await deleteLesson(id)
      this.removeLessonFromCache(id)
    },
  },
})
