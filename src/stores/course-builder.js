import { defineStore } from 'pinia'
import { generateRandomKey } from 'components/modelHelper'

const now = new Date()
const starterLessons = {
  abc1: {
    id: 'abc1',
    title: 'What is an atom?',
    subtitle: 'About what an atom is',
    version: 3,
    publishedAt: now,
    content: '<p>Think small. Now go smaller. And smaller.</p>',
  },
  def2: {
    id: 'def2',
    title: 'Elements',
    subtitle: 'Elements are particular kinds of atoms',
    version: 5,
    publishedAt: now,
    content:
      '<p>Hydrogen, helium, lithium, beryllium, boron, carbon, nitrogen, oxygen, and so on.</p>',
  },
  ghi3: {
    id: 'ghi3',
    title: 'Radioactive Isotopes',
    subtitle: 'Some elements have trouble holding themselves together',
    version: 2,
    publishedAt: now,
    content: '<p>Iodine, thorium, uranium, plutonium, polonium, and so on.</p>',
  },
}
const starterCourses = {
  pGvcoU2WHUGo: {
    id: 'pGvcoU2WHUGo',
    name: 'Atomic Fundamentals',
    description: 'Get to know the building blocks of everything',
    trailhead: 'abc1',
    lessons: ['abc1', 'def2', 'ghi3'],
    lessonPathMap: {
      abc1: {
        next: 'def2',
      },
      def2: {
        next: 'ghi3',
      },
      ghi3: {
        next: null,
      },
      state: 'active',
    },
  },
}

export const useCourseBuilderStore = defineStore('courseBuilder', {
  state: () => ({
    courses: ['pGvcoU2WHUGo'],
    courseIndex: starterCourses,
    lessonPlans: ['abc1', 'def2', 'ghi3'],
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
      console.log(course)
      this.courseIndex[course.id] = course
      this.courses.push(course.id)
    },
    createCourse(name, description, lessons) {
      const trailhead = lessons.length > 0 ? lessons[0] : null
      const newCourse = {
        id: generateRandomKey(),
        name,
        description,
        lessons,
        trailhead,
      }
      this.addCourseToStore(newCourse)
    },
  },
})
