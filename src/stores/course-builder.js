import { defineStore } from 'pinia'
import { generateRandomKey } from 'src/components/modelTools.js'
import {
  goCreateCourse,
  fetchCourses,
  fetchCourse,
  goUpdateCourse,
  goDeleteCourse,
  goCreateLesson,
  fetchLessons,
  fetchLesson,
  goUpdateLesson,
  goDeleteLesson,
} from '../api'
import { starterLessons } from './offline-data'

const buildLessonPathMap = (lessonList) => {
  const pathMap = {}
  let previous = null
  lessonList.map((lessonId, index) => {
    if (index > 0) {
      pathMap[previous] = { next: lessonId }
    }
    previous = lessonId
  })
  pathMap[previous] = { next: '--the-end--' }
  return pathMap
}

export const useCourseBuilderStore = defineStore('courseLab', {
  state: () => ({
    courses: [],
    courseIndex: {},
    lessonPlans: [],
    lessonPlanIndex: {},
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
      this.courseIndex[course.id] = course
      if (!this.courses.includes(course.id)) {
        this.courses.push(course.id)
      }
    },
    removeCourseFromStore(id) {
      delete this.courseIndex.id
      const index = this.courses.indexOf(id)
      if (index > -1) {
        this.courses.splice(index, 1)
      }
    },
    async spawnCourse(name = 'a suitable name') {
      const newCourse = await goCreateCourse({ name })
      newCourse.tags = [] // TODO: add to returned payload
      newCourse.lessons = [] // TODO: add to returned payload
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
      const course = await fetchCourse(id)
      console.log('Retrieved course => ' + JSON.stringify(course))
      if (course) {
        this.addCourseToStore(course)
      }
    },
    async updateCourse(updates) {
      const current = this.course(updates.id)
      if (!current) {
        console.error('out of sync for update => ' + JSON.stringify(updates))
        return
      }
      const updated = await goUpdateCourse({
        ...updates,
        _version: current._version,
      })
      this.addCourseToStore(updated)
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
    openCourse(id) {
      this.course(id).status = 'open'
    },
    closeCourse(id) {
      this.course(id).status = 'closed'
    },
    archiveCourse(id) {
      const course = this.course(id)
      course.status = 'archived'
      course.archivedAt = new Date()
    },
    reviveCourse(id) {
      const course = this.course(id)
      course.status = 'closed'
      course.archivedAt = null
    },
    addLessonToStore(lesson) {
      console.log('adding lesson: ' + JSON.stringify(lesson))
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
      console.log('Retrieved lesson => ' + JSON.stringify(lesson))
      if (lesson) {
        this.addLessonToStore(lesson)
      }
    },
    async updateLesson(updates) {
      console.log('updateLesson')
      const current = this.lessonPlan(updates.id)
      if (!current) {
        console.error('out of sync for update => ' + JSON.stringify(updates))
        return
      }
      const updated = await goUpdateLesson({
        ...updates,
        _version: current._version,
      })
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
    saveLessonPlan(updates) {}, // TODO: investigate how save lesson is working
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
