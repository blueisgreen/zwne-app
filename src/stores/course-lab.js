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
    courses(state) {
      return Object.keys(state.courseIndex)
    },
    courseCount(state) {
      return state.courses.length
    },
    courseList(state) {
      return state.courses.map((courseId) => state.courseIndex[courseId])
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
    courseLessonIds: (state) => {
      return (courseId) => {
        return state.lessonCouresJoins(courseId).map((join) => join.lessonId)
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
    addCourseToStore(course, joins) {
      console.log('addCourseToStore', course)
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
    removeCourseFromStore(courseId) {
      if (this.courseIndex[courseId]) {
        delete this.courseIndex[courseId]
      }
      if (this.lessonCourseJoinsIndex[courseId]) {
        delete this.lessonCourseJoinsIndex[courseId]
      }
    },
    async spawnCourse(name = 'a suitable name') {
      const newCourse = await goCreateCourse(name)
      this.addCourseToStore(newCourse)
    },
    async loadCourses() {
      // TODO: find way to prevent refetching when already in store
      const courses = await fetchCourses()
      if (courses) {
        courses.forEach((course) => {
          if (!course._deleted) {
            this.addCourseToStore(course)
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
      this.addCourseToStore(course, joins)
      return course
    },
    async onSaveCourse(courseUpdates) {
      console.log('course-builder.onSaveCourse', courseUpdates)
      const courseId = courseUpdates.id
      const updated = await saveCourse(courseId, courseUpdates)
      if (updated) {
        this.addCourseToStore(updated)
      }
    },
    async syncLessonsForCourse(courseId, nextLessons) {
      console.log('syncLessonsForCourse', { courseId, nextLessons })
      const originalLessonIds = this.courseLessonIds(courseId)
      const alt = this.courseLessonIdsIndex[courseId]

      console.log('originalLessonIds', originalLessonIds)
      console.log('alt', alt)

      const lessonsToAdd = difference(nextLessons, originalLessonIds)
      const lessonsToRemove = difference(originalLessonIds, nextLessons)

      console.log('differences', { lessonsToAdd, lessonsToRemove })

      lessonsToAdd.forEach(async (lessonId) => {
        await addLessonCourse(courseId, lessonId)
      })

      lessonsToRemove.forEach(async (lessonId) => {
        console.log('intend to remove lessonCourse(s) for', lessonId)
        const lessonCourseJoins = this.lessonCourseJoinsForLesson(
          courseId,
          lessonId
        )
        lessonCourseJoins.forEach((join) => removeLessonCourse(join))
      })

      if (lessonsToAdd.length || lessonsToRemove.length) {
        await this.loadCourse(courseId, true)
      }
    },
    async rebuildLessonPath(courseId, nextLessons) {
      const originalPath = this.courseLessonPath(courseId)
      const nextPathSteps = []

      // if different, delete and redo, or try to adjust?

      // iterate through current step path items
      // nextPathSteps.forEach((nextStep) => {
      //   // update existing as needed
      //   const currentFromStep = originalPath[nextStep.from]
      //   if (currentFromStep) {
      //     if (currentFromStep.to !== nextStep.to) {
      //       console.log('update step', {
      //         currentFromStep,
      //         nextStep,
      //       })
      //       // TODO: call API
      //     } else {
      //       console.log('step has not changed', {
      //         currentFromStep,
      //         nextStep,
      //       })
      //     }
      //   } else {
      //     // add new step
      //     console.log('add step', nextStep)
      //     // TODO: call API
      //   }
      // })
    },
    async onSaveCourseLessons(courseId, lessonIdList) {
      console.log('course-builder.onSaveCourseLessons', {
        courseId,
        lessonIdList,
      })

      // guard against bad arguments
      if (!courseId || !lessonIdList || !Array.isArray(lessonIdList)) {
        console.warn('forgot to pass course ID or proper list of lesson IDs')
        return
      }

      await this.syncLessonsForCourse(courseId, lessonIdList)
      await this.rebuildLessonPath(courseId, lessonIdList)

      console.log('finished processing course lessons and path')
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
      this.addCourseToStore(course)
    },
    async closeCourse(id) {
      const course = await closeCourse(id)
      this.addCourseToStore(course)
    },
    async archiveCourse(id) {
      const course = await archiveCourse(id)
      this.addCourseToStore(course)
    },
    async reviveCourse(id) {
      const course = await reviveCourse(id)
      this.addCourseToStore(course)
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
      const newLesson = await goCreateLesson({ title })
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
