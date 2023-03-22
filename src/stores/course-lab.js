import { defineStore } from 'pinia'
import {
  goCreateCourse,
  fetchCourses,
  fetchCourse,
  goSaveCourse,
  patchCourse,
  goDeleteCourse,
  openCourse,
  closeCourse,
  archiveCourse,
  reviveCourse,
  goCreateLesson,
  fetchLessons,
  fetchLesson,
  goUpdateLesson,
  goDeleteLesson,
} from '../api'

export const useCourseLabStore = defineStore('courseLab', {
  state: () => ({
    courses: [],
    courseIndex: {},
    courseLessonsIndex: {},
    lessonPlans: [],
    lessonPlanIndex: {},
    lessonPathByCourseIndex: {
      courseA: {
        path: ['lesson1', 'lesson2'],
        lesson1: {
          to: 'lesson2',
        },
        lesson2: {
          end: true,
        },
      },
    },
    activeCourse: '',
  }),
  getters: {
    courseCount(state) {
      return state.courses.length
    },
    planCount(state) {
      return state.lessonPlans.length
    },
    courseList(state) {
      return state.courses.map((id) => state.courseIndex[id])
    },
    course: (state) => {
      return (id) => {
        return state.courseIndex[id]
      }
    },
    courseLessonIds: (state) => {
      return (id) => {
        return state.courseLessonsIndex[id] || []
      }
    },
    courseLessons: (state) => {
      return (id) => {
        const ids = state.courseLessonsIndex[id] || []
        return ids.map((lessonId) => state.lessonPlanIndex[lessonId])
      }
    },
    courseLessonPath: (state) => {
      return (id) => {
        return state.lessonPathByCourseIndex[id] || {}
      }
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
    addCourseToStore(course) {
      console.log('addCourseToStore', course)
      this.courseIndex[course.id] = course
      if (!this.courses.includes(course.id)) {
        this.courses.push(course.id)
      }
      this.courseLessonsIndex[course.id] = []
      if (course.lessons?.items?.length) {
        console.log('with lessons', course.lessons.items)
        course.lessons.items.forEach((item) => {
          const { lesson } = item
          this.addLessonToStore(lesson)
          this.courseLessonIds(course.id).push(lesson.id)
        })
      }
    },
    patchCourseInStore(id, changes) {
      // TODO: implement me
    },
    removeCourseFromStore(id) {
      delete this.courseIndex.id
      delete this.courseLessonIndex.id
      const index = this.courses.indexOf(id)
      if (index > -1) {
        this.courses.splice(index, 1)
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
    async loadCourse(id, refresh = false) {
      const cached = this.course(id)
      if (!refresh && cached) {
        return cached
      }
      console.log('loadCourse: %s', refresh ? 'forcing refresh' : 'not cached')
      const course = await fetchCourse(id)
      if (course) {
        this.addCourseToStore(course)
      }
      return course
    },
    async onSaveCourse(courseUpdates) {
      console.log('course-builder.onSaveCourse', courseUpdates)
      const courseId = courseUpdates.id
      const updated = await patchCourse(courseId, courseUpdates)
      if (updated) {
        this.addCourseToStore(updated)
      }
    },
    async onSaveCourseLessons(courseId, lessonIdList) {
      console.log('course-builder.onSaveCourseLessons', {
        courseId,
        lessonIdList,
      })
      // do nothing if list if null; use empty array to mean no lessons
      if (!courseId || !lessonIdList) {
        console.warn('forgot to pass course ID or list of lesson IDs')
        return
      }

      const originalLessonIds = this.courseLessonIds(courseId)
      const originalPath = this.courseLessonPath(courseId)
      const nextPathSteps = []

      if (!originalLessonIds.length && !lessonIdList) {
        console.log('no lessons and nothing changed; do nothing')
        return
      }

      // iterate through lessonIdList
      const pathLength = lessonIdList.length
      lessonIdList.forEach((from, index) => {
        if (!originalLessonIds.includes(from)) {
          // if not already on course, add it
          console.log('adding lesson to course', from)
          // TODO: call API
        }
        // add to step path items
        const to = index < pathLength - 1 ? lessonIdList[index + 1] : null
        const step = { from, to, end: !to }
        console.log('add to step path', step)
        nextPathSteps.push(step)
      })

      // iterate through current step path items
      nextPathSteps.forEach((nextStep) => {
        // update existing as needed
        const currentFromStep = originalPath[nextStep.from]
        if (currentFromStep) {
          if (currentFromStep.to !== nextStep.to) {
            console.log('update step', {
              currentFromStep,
              nextStep,
            })
            // TODO: call API
          } else {
            console.log('step has not changed', {
              currentFromStep,
              nextStep,
            })
          }
        } else {
          // add new step
          console.log('add step', nextStep)
          // TODO: call API
        }
      })

      // remove unused step path items
      // TODO: build list of unused steps

      // remove lessons that are no longer associated
      // TODO: build list of unused lessons

      console.log('finished processing lessons and path')
    },
    async deleteCourse(id) {
      const course = this.course(id)
      const isDeleted = await goDeleteCourse(id, course._version)
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
      console.log('loadLesson')
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
      console.log('updateLesson')
      console.log('Given updates => ', updates)
      const current = this.lessonPlan(updates.id)
      if (!current) {
        console.error('out of sync for update => ', updates)
        return
      }
      const combined = { ...updates, _version: current._version }
      console.log('Combined updates => ', combined)
      const updated = await goUpdateLesson(combined)
      this.addLessonToStore(updated)
    },
    async deleteLesson(id) {
      const lesson = this.lessonPlan(id)
      const isDeleted = await goDeleteLesson(id, lesson._version)
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
