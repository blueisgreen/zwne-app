import { defineStore } from 'pinia'
import {
  goCreateCourse,
  fetchCourses,
  fetchCourse,
  saveCourse,
  openCourse,
  closeCourse,
  archiveCourse,
  reviveCourse,
  goDeleteCourse,
  fetchLessonCoursesForCourse,
  addLessonCourse,
  removeLessonCourse,
  goCreateLesson,
  fetchLessons,
  fetchLesson,
  goUpdateLesson,
  goDeleteLesson,
} from '../api'
import { difference } from 'components/modelTools'

export const useCourseLabStore = defineStore('courseLab', {
  state: () => ({
    courseIndex: {},
    lessonCourseJoinsIndex: {},
    lessonPlans: [],
    lessonPlanIndex: {},
  }),
  getters: {
    courseIds(state) {
      return Object.keys(state.courseIndex)
    },
    courseCount(state) {
      return state.courseIds.length
    },
    courseList(state) {
      return state.courseIds.map((courseId) => state.courseIndex[courseId])
    },
    course: (state) => {
      return (courseId) => {
        return state.courseIndex[courseId]
      }
    },
    lessonCourseJoins: (state) => {
      return (courseId) => {
        return state.lessonCourseJoinsIndex[courseId] || []
      }
    },
    lessonCourseJoinForLesson: (state) => {
      return (courseId, lessonId) => {
        const joins = state.lessonCourseJoinsIndex[courseId]
        const joinOut = joins.find((join) => join.lessonId === lessonId)
        return joinOut
      }
    },
    courseLessonIds: (state) => {
      return (courseId) => {
        return state.lessonCourseJoins(courseId).map((join) => join.lessonId)
      }
    },
    planCount(state) {
      return state.lessonPlans.length
    },
    lessonPlanList(state) {
      return state.lessonPlans.map((planId) => state.lessonPlanIndex[planId])
    },
    lessonPlan: (state) => {
      return (lessonId) => {
        return state.lessonPlanIndex[lessonId]
      }
    },
  },
  actions: {
    cacheCourseInStore(course, joins) {
      console.log('cacheCourseInStore', { course, joins })
      // course is required
      if (!course) {
        return
      }

      const courseId = course.id
      this.courseIndex[courseId] = course

      // may have lessons
      if (course.lessons?.items?.length) {
        console.log('with lessons', course.lessons.items)
        course.lessons.items.forEach((item) => {
          const { lesson } = item
          this.addLessonToStore(lesson)
        })
      }

      // should have joins to match lessons - needed for verification, delete
      if (joins) {
        console.log('with lesson joins', joins)
        this.lessonCourseJoinsIndex[courseId] = joins
      }
    },
    cacheLessonCourseInStore(courseId, join) {
      console.log('cacheLessonCourseInStore', { courseId, join })
      if (!this.lessonCourseJoinsIndex[courseId]) {
        this.lessonCourseJoinsIndex[courseId] = []
      }
      this.lessonCourseJoinsIndex[courseId].push(join)
    },
    removeCourseFromStore(courseId) {
      console.log('removeCourseFromStore', courseId)
      if (this.courseIndex[courseId]) {
        delete this.courseIndex[courseId]
      }
      if (this.lessonCourseJoinsIndex[courseId]) {
        delete this.lessonCourseJoinsIndex[courseId]
      }
    },
    removeLessonCourseJoinFromStore(courseId, lessonId) {
      console.log('removeLessonCourseJoinFromStore', { courseId, lessonId })
      const joins = this.lessonCourseJoinsIndex[courseId]
      const indexOfJoin = joins.findIndex((join) => join.lessonId === lessonId)
      joins.splice(indexOfJoin, 0)
    },
    async spawnCourse(name = 'a suitable name') {
      const newCourse = await goCreateCourse(name)
      this.cacheCourseInStore(newCourse)
    },
    async loadCourses() {
      // TODO: find way to prevent refetching when already in store
      const courses = await fetchCourses()
      if (courses) {
        courses.forEach((course) => {
          if (!course._deleted) {
            this.cacheCourseInStore(course)
          }
        })
      } else {
        console.log('Curious. We did not find any courses.')
      }
    },
    async loadCourse(courseId, refresh = false) {
      const cached = this.course(courseId)
      if (!refresh && cached) {
        console.log('loadCourse: found in cache', cached)
        return cached
      }
      console.log('loadCourse: %s', refresh ? 'forcing refresh' : 'not cached')

      const course = await fetchCourse(courseId)
      const joins = await fetchLessonCoursesForCourse(courseId)
      this.cacheCourseInStore(course, joins)
      return course
    },
    async onSaveCourse(courseUpdates) {
      console.log('onSaveCourse', courseUpdates)
      const { id, lessonPath } = courseUpdates
      await this.syncLessonsForCourse(id, lessonPath)
      const updated = await saveCourse(id, courseUpdates)
      if (updated) {
        this.cacheCourseInStore(updated)
      }
      await this.loadCourse(id)
    },
    async syncLessonsForCourse(courseId, lessonPath) {
      console.log('syncLessonsForCourse', { courseId, lessonPath })

      // make sure we have the right lessons attached to the course
      const nextLessonIds = [...new Set(lessonPath)]
      const startLessonIds = this.courseLessonIds(courseId)

      const lessonsToAdd = difference(nextLessonIds, startLessonIds)
      const lessonsToRemove = difference(startLessonIds, nextLessonIds)
      console.log('differences', { lessonsToAdd, lessonsToRemove })

      lessonsToAdd.forEach(async (lessonId) => {
        const result = await addLessonCourse(courseId, lessonId)
      })
      lessonsToRemove.forEach(async (lessonId) => {
        const joinToRemove = this.lessonCourseJoinForLesson(courseId, lessonId)
        await removeLessonCourse(joinToRemove.id)
      })
    },
    async deleteCourse(id) {
      console.log('deleteCourse', id)

      // FIXME: true purge has to remove all associations with the course: lessonCourse, lessonPath

      const isDeleted = await goDeleteCourse(id)
      if (isDeleted) {
        this.removeCourseFromStore(id)
      } else {
        console.log('failed to delete')
      }
    },
    async openCourse(id) {
      const course = await openCourse(id)
      this.cacheCourseInStore(course)
    },
    async closeCourse(id) {
      const course = await closeCourse(id)
      this.cacheCourseInStore(course)
    },
    async archiveCourse(id) {
      const course = await archiveCourse(id)
      this.cacheCourseInStore(course)
    },
    async reviveCourse(id) {
      const course = await reviveCourse(id)
      this.cacheCourseInStore(course)
    },

    // ------------------
    // -- Lesson actions
    // ------------------

    addLessonToStore(lesson) {
      console.log('addLessonToStore', lesson)
      this.lessonPlanIndex[lesson.id] = lesson
      if (!this.lessonPlans.includes(lesson.id)) {
        this.lessonPlans.push(lesson.id)
      }
    },
    removeLessonFromStore(id) {
      delete this.lessonPlanIndex.id
      const index = this.lessonPlans.indexOf(id)
      if (index > -1) {
        this.courses.splice(index, 1)
      }
    },
    async spawnLesson(title = 'a suitable title') {
      const newLesson = await goCreateLesson(title)
      this.addLessonToStore(newLesson)
    },
    async loadLessons() {
      // TODO: find way to prevent refetching when already in store
      // TODO: load lesson plans without content; only fetch content as needed
      const lessons = await fetchLessons()
      if (lessons) {
        lessons.forEach((lesson) => {
          if (!lesson._deleted) {
            this.addLessonToStore(lesson)
          }
        })
      } else {
        console.log('Curious. We did not find any lessons.')
      }
    },
    async loadLesson(id, refresh = false) {
      console.log('loadLesson', { id, refresh })
      const cached = this.lessonPlan(id)
      if (!refresh && cached) {
        return cached
      }
      const lesson = await fetchLesson(id)
      console.log('Retrieved lesson => ', lesson)
      if (lesson) {
        this.addLessonToStore(lesson)
      }
      return lesson
    },
    async updateLesson(updates) {
      console.log('updateLesson', updates)
      const next = await goUpdateLesson(updates)
      this.addLessonToStore(next)
    },
    async deleteLesson(id) {
      console.log('deleteLesson', id)
      const isDeleted = await goDeleteLesson(id)
      if (isDeleted) {
        this.removeLessonFromStore(id)
      } else {
        console.log('failed to delete')
      }
    },
    saveLessonContent(lessonId, revision) {
      const lesson = this.lessonPlan(lessonId)
      lesson.content = revision
    },
    publishLesson(id) {
      const lesson = this.lessonPlan(id)
      lesson.publishedAt = new Date()
      lesson.updatedAt = new Date()
    },
    reviseLesson(id) {
      const lesson = this.lessonPlan(id)
      lesson.publishedAt = null
      lesson.createdAt = new Date()
      lesson.updatedAt = new Date()
      lesson.version++
    },
    retractLesson(id) {
      const lesson = this.lessonPlan(id)
      lesson.publishedAt = null
      lesson.updatedAt = new Date()
    },
    archiveLesson(id) {
      const lesson = this.lessonPlan(id)
      lesson.publishedAt = null
      lesson.archivedAt = new Date()
      lesson.updatedAt = new Date()
    },
    reviveLesson(id) {
      const lesson = this.lessonPlan(id)
      lesson.archivedAt = null
      lesson.updatedAt = new Date()
    },
  },
})
