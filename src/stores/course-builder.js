import { defineStore } from 'pinia'
import { generateRandomKey } from 'src/components/modelTools.js'
import {
  goCreateCourse,
  fetchCourses,
  fetchCourse,
  goUpdateCourse,
  goDeleteCourse,
} from '../api/course'
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

export const useCourseBuilderStore = defineStore('courseBuilder', {
  state: () => ({
    courses: [],
    courseIndex: {},
    lessonPlans: ['abc1', 'def2', 'ghi3', 'xyz13'],
    lessonPlanIndex: starterLessons,
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
    async loadCourses() {
      const courses = await fetchCourses()
      if (courses) {
        courses.forEach((course) => this.addCourseToStore(course))
      } else {
        console.log('Curious. We did not find any courses.')
      }
    },
    async spawnCourse(name = 'a suitable name') {
      const newCourse = await goCreateCourse({ name })
      newCourse.tags = []
      newCourse.lessons = []
      this.addCourseToStore(newCourse)
    },
    saveCourse(updates) {
      const { id, lessons } = updates
      const updated = { ...updates }
      updated.lessons = lessons.slice()
      updated.tags = updates.tags.slice()
      updated.trailhead = lessons.length > 0 ? lessons[0] : null
      updated.lessonPathMap = buildLessonPathMap(lessons)
      this.courseIndex[id] = updated
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
      this.lessonPlans.push(lesson.id)
    },
    spawnLesson(title = 'a suitable title') {
      const now = new Date()
      const newLesson = {
        id: generateRandomKey(),
        title,
        subtitle: 'provide more context',
        version: 1,
        categories: [],
        createdAt: now,
        updatedAt: now,
        publishedAt: null,
        archivedAt: null,
        content: '<p>Focus on one idea.</p>',
      }
      this.addLessonToStore(newLesson)
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
