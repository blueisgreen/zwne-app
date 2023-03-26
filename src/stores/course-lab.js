import { defineStore } from 'pinia'
import {
  createCourse,
  fetchCourses,
  fetchCourse,
  saveCourse,
  openCourse,
  closeCourse,
  archiveCourse,
  reviveCourse,
  deleteCourse,
  createLesson,
  fetchLessons,
  fetchLessonsForCourse,
  fetchLesson,
  saveLesson,
  addLessonToCourse,
  removeLessonFromCourse,
  publishLesson,
  retractLesson,
  archiveLesson,
  reviveLesson,
  goDeleteLesson,
} from '../api'
import { difference } from 'components/modelTools'

export const useCourseLabStore = defineStore('courseLab', {
  state: () => ({
    courseIndex: {},
    lessonIndex: {},
  }),
  getters: {
    cachedCourseIds(state) {
      return Object.keys(state.courseIndex)
    },
    cachedCourseList(state) {
      return state.cachedCourseIds.map((id) => state.courseIndex[id])
    },
    cachedCourse: (state) => {
      return (id) => {
        return state.courseIndex[id]
      }
    },
    cachedLessonIds(state) {
      return Object.keys(state.lessonIndex)
    },
    cachedLessonList(state) {
      return state.lessonPlans.map((planId) => state.lessonIndex[planId])
    },
    cachedLesson: (state) => {
      return (lessonId) => {
        return state.lessonIndex[lessonId]
      }
    },
  },
  actions: {
    cacheCourse(course) {
      console.log('cacheCourse', course)
      const { id } = course
      if (!course) {
        console.warn('Not caching - course is null')
        return
      } else if (!id) {
        console.warn('Not caching - course has no ID')
      }
      this.courseIndex[id] = course
    },
    removeCourseFromCache(courseId) {
      console.log('removeCourseFromCache', courseId)
      if (this.courseIndex[courseId]) {
        delete this.courseIndex[courseId]
      }
    },

    cacheLesson(lesson) {
      console.log('cacheLesson', lesson)
      const { id } = lesson
      if (!lesson) {
        console.warn('Not caching - lesson is null')
        return
      } else if (!id) {
        console.warn('Not caching - lesson has no ID')
      }
      this.lessonIndex[id] = lesson
    },
    removeLessonFromCache(lessonId) {
      console.log('removeLessonFromCache', lessonId)
      if (this.lessonIndex[lessonId]) {
        delete this.lessonIndex[lessonId]
      }
    },

    async spawnCourse(name = 'a suitable name') {
      console.log('spawnCourse', name)
      const newborn = await createCourse(name)
      this.cacheCourse(newborn)
    },
    async loadCourses() {
      console.log('loadCourses')
      const courses = await fetchCourses()
      if (courses) {
        courses.forEach((course) => this.cacheCourse(course))
      } else {
        console.log('Curious. We did not find any courses.')
      }
    },
    async loadCourse(courseId) {
      console.log('loadCourse', courseId)
      const course = await fetchCourse(courseId)
      this.cacheCourse(course)
    },
    async onSaveCourse(deltas) {
      console.log('onSaveCourse', deltas)
      const { id, lessonPath } = deltas

      const startingPath = this.course(id).lessonPath || []

      await this.syncLessonsForCourse(courseId, startingPath, lessonPath)

      const afterSave = await saveCourse(id, deltas)
      if (afterSave) {
        this.cacheCourse(afterSave)
      }
    },
    async syncLessonsForCourse(courseId, startingPath, nextPath) {
      console.log('syncLessonsForCourse', { courseId, startingPath, nextPath })

      const startingIds = [...new Set(nextPath)]
      const nextIds = [...new Set(nextPath)]

      const lessonsToAdd = difference(nextIds, startingIds)
      const lessonsToRemove = difference(startingIds, nextIds)
      console.log('differences', { lessonsToAdd, lessonsToRemove })

      // FIXME: make sure API methods work correctly with new schema
      lessonsToAdd.forEach(async (lessonId) => {
        const result = await addLessonToCourse(courseId, lessonId)
      })
      lessonsToRemove.forEach(async (lessonId) => {
        await removeLessonFromCourse(lessonId)
      })
    },
    async onDeleteCourse(id) {
      console.log('deleteCourse', id)

      // FIXME: true purge has to remove all associations with the course: lessonCourse, lessonPath

      const isDeleted = await deleteCourse(id)
      if (isDeleted) {
        this.removeCourseFromCache(id)
      } else {
        console.log('failed to delete')
      }
    },
    async handleOpenCourse(id) {
      const course = await openCourse(id)
      this.cacheCourse(course)
    },
    async handleCloseCourse(id) {
      const course = await closeCourse(id)
      this.cacheCourse(course)
    },
    async handleArchiveCourse(id) {
      const course = await archiveCourse(id)
      this.cacheCourse(course)
    },
    async handleReviveCourse(id) {
      const course = await reviveCourse(id)
      this.cacheCourse(course)
    },

    // ------------------
    // -- Lesson actions
    // ------------------

    async spawnLesson(title = 'a suitable title') {
      const newborn = await createLesson(title)
      this.cacheLesson(newborn)
    },
    async loadLessons() {
      console.log('loadLessons')
      // TODO: find way to prevent refetching when already in store
      const lessons = await fetchLessons()
      if (lessons) {
        lessons.forEach((lesson) => this.cacheLesson(lesson))
      } else {
        console.log('Curious. We did not find any lessons.')
      }
    },
    async loadLessonsForCourse(courseId) {
      console.log('loadLessonsForCourse', courseId)
      const lessons = await fetchLessonsForCourse(courseId)
      if (lessons) {
        lessons.forEach((lesson) => this.cacheLesson(lesson))
      } else {
        console.log('No lessons found for course.')
      }
    },
    async loadLesson(lessonId) {
      console.log('loadLesson', lessonId)
      const lesson = await fetchLesson(lessonId)
      this.cacheLesson(lesson)
    },
    async onSaveLesson(deltas) {
      console.log('onSaveLesson', deltas)
      const afterSave = await saveLesson(deltas)
      this.cacheLesson(afterSave)
    },
    async deleteLesson(id) {
      console.log('deleteLesson', id)
      const deleted = await goDeleteLesson(id)
      if (deleted) {
        // FIXME: does this cause trouble with associated course
        this.removeLessonFromCache(id)
      } else {
        console.log('failed to delete')
      }
    },
    async handlePublishLesson(id) {
      const after = await publishLesson(id)
      this.cacheLesson(after)
    },
    async handleRetractLesson(id) {
      const after = await retractLesson(id)
      this.cacheLesson(after)
    },
    // TODO: implement revisioning
    // async handleReviseLesson(id) {
    //   const after = await reviseLesson(id)
    //   this.cacheLesson(after)
    // },
    async handleArchiveLesson(id) {
      const after = await archiveLesson(id)
      this.cacheLesson(after)
    },
    async handleReviveLesson(id) {
      const after = await reviveLesson(id)
      this.cacheLesson(after)
    },
  },
})
