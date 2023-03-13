import { defineStore } from 'pinia'
import { generateRandomKey } from 'src/components/modelTools.js'

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
  xyz13: {
    id: 'xyz13',
    title: 'Bad (Re)actors',
    subtitle: 'Do not build your power plant this way.',
    version: 13,
    publishedAt: null,
    archivedAt: new Date(),
    content: '<p>Do this if you want things to go badly. Very badly.</p>',
  },
}
const starterCourses = {
  pGvcoU2WHUGo: {
    id: 'pGvcoU2WHUGo',
    name: 'Atomic Fundamentals',
    description: 'Get to know the building blocks of everything',
    trailhead: 'abc1',
    status: 'available',
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
  oGUHW2UocvGp: {
    id: 'oGUHW2UocvGp',
    name: 'Fundamentals Atomics',
    description: 'Build with everything you know',
    status: 'hidden',
    trailhead: 'ghi3',
    lessons: ['ghi3', 'abc1', 'def2'],
    lessonPathMap: {
      abc1: {
        next: 'def2',
      },
      def2: {
        next: null,
      },
      ghi3: {
        next: 'abc1',
      },
      state: 'active',
    },
  },
}
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
    courses: ['pGvcoU2WHUGo', 'oGUHW2UocvGp'],
    courseIndex: starterCourses,
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
      console.log('adding course: ' + JSON.stringify(course))
      this.courseIndex[course.id] = course
      this.courses.push(course.id)
    },
    createCourse(name, description, lessons = []) {
      const trailhead = lessons.length > 0 ? lessons[0] : null
      const lessonPathMap = buildLessonPathMap(lessons)
      const newCourse = {
        id: generateRandomKey(),
        name,
        description,
        status: 'hidden',
        lessons: lessons.slice(),
        trailhead,
        lessonPathMap,
      }
      this.addCourseToStore(newCourse)
    },
    spawnCourse() {
      this.createCourse(
        'A Course is a Course, of Course',
        'What is this about?'
      )
    },
    saveCourse(id, name, description, lessons) {
      const trailhead = lessons.length > 0 ? lessons[0] : null
      const lessonPathMap = buildLessonPathMap(lessons)
      const updated = {
        id,
        name,
        description,
        lessons: lessons.slice(),
        trailhead,
        lessonPathMap,
      }
      this.courseIndex[id] = updated
    },
    addLessonToStore(lesson) {
      console.log('adding lesson: ' + JSON.stringify(lesson))
      this.lessonPlanIndex[lesson.id] = lesson
      this.lessonPlans.push(lesson.id)
    },
    spawnLesson() {
      const newLesson = {
        id: generateRandomKey(),
        title: 'A Title',
        subtitle: 'A sub-title',
        version: 1,
        publishedAt: null,
        content: 'something worth learning',
      }
      this.addLessonToStore(newLesson)
    },
  },
})
