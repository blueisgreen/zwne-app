import { defineStore } from 'pinia'
import {
  createCourse,
  fetchCourses,
  fetchCourse,
  fetchCourseLessons,
  saveCourse,
  openCourse,
  closeCourse,
  archiveCourse,
  reviveCourse,
  deleteCourse,
  doCreateLesson,
  fetchLessons,
  fetchLessonsForCourse,
  fetchLessonsWithoutCourse,
  fetchLesson,
  saveLesson,
  addLessonToCourse,
  removeLessonFromCourse,
  publishLesson,
  retractLesson,
  archiveLesson,
  reviveLesson,
  goDeleteLesson,
  doCreateDetachedLesson,
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
      return state.cachedLessonIds.map((planId) => state.lessonIndex[planId])
    },
    cachedLesson: (state) => {
      return (lessonId) => {
        return state.lessonIndex[lessonId]
      }
    },
    lessonsWithoutCourse: (state) => {
      return state.cachedLessonList.filter((lesson) => lesson.courseID === null)
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
      const lessons = await fetchCourseLessons(courseId)
      console.log('lessons', lessons)
      if (Array.isArray(lessons)) {
        lessons.forEach((lesson) => this.cacheLesson(lesson))
      }
    },
    async handleSaveCourse(courseId, deltas) {
      console.log('onSaveCourse', { courseId, deltas })
      const afterSave = await saveCourse(courseId, deltas)
      if (afterSave) {
        this.cacheCourse(afterSave)
      }
    },
    async putLessonInPath(courseId, lessonId) {
      console.log('putLessonInPath', { courseId, lessonId })
      const pathNow = this.cachedCourse(courseId).lessonPath || []
      const pathNext = [...pathNow, lessonId]
      console.log('paths', { pathNow, pathNext })
      await this.handleSaveCourse(courseId, {
        lessonPath: pathNext,
      })
    },
    async handleDeleteCourse(id) {
      console.log('deleteCourse', id)
      // FIXME: cascade to lessons - at least detach them
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

    async spawnLesson(title = 'a suitable title', courseId) {
      console.log('spawnLesson', { title, courseId })
      let newborn = null
      if (!courseId) {
        newborn = await doCreateDetachedLesson(title)
      } else {
        newborn = await doCreateLesson(title, courseId)
        await this.putLessonInPath(courseId, newborn.id)
      }
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
    async loadLessonsWithoutCourse() {
      console.log('loadLessonsWithoutCourse')
      const lessons = await fetchLessonsWithoutCourse()
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
    async handleSaveLesson(deltas) {
      console.log('onSaveLesson', deltas)
      const afterSave = await saveLesson(deltas)
      this.cacheLesson(afterSave)
    },
    async handleAddLessonToCourse(courseId, lessonId) {
      console.log('handleAddLessonToCourse', { courseId, lessonId })
      const next = await addLessonToCourse(courseId, lessonId)
      this.cacheLesson(next)
      await this.putLessonInPath(courseId, lessonId)
    },
    async handleRemoveLessonFromCourse(lessonId) {
      console.log('handleRemoveLessonFromCourse', lessonId)
      console.warn('Not implemented -- issues with removing relationship')
      // const next = await removeLessonFromCourse(lessonId)
      // this.cacheLesson(next)
      // TODO: consider alternatives: clone-delete? how often does reassign happen?
      //   prefer many-to-many; PITA but at least possible
    },
    async handleDeleteLesson(id) {
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
