import { defineStore } from 'pinia'
import { generateRandomKey } from 'src/components/modelTools.js'

const now = new Date()
const starterLessons = {
  abc1: {
    id: 'abc1',
    title: 'What is an atom?',
    subtitle: 'About what an atom is',
    version: 3,
    categories: ['science'],
    publishedAt: now,
    content: '<p>Think small. Now go smaller. And smaller.</p>',
  },
  def2: {
    id: 'def2',
    title: 'Elements',
    subtitle: 'Elements are particular kinds of atoms',
    version: 5,
    categories: ['science'],
    publishedAt: now,
    content:
      '<p>Hydrogen, helium, lithium, beryllium, boron, carbon, nitrogen, oxygen, and so on.</p>',
  },
  ghi3: {
    id: 'ghi3',
    title: 'Radioactive Isotopes',
    subtitle: 'Some elements have trouble holding themselves together',
    version: 2,
    categories: ['science', 'safety'],
    publishedAt: null,
    content: '<p>Iodine, thorium, uranium, plutonium, polonium, and so on.</p>',
  },
  xyz13: {
    id: 'xyz13',
    title: 'Bad (Re)actors',
    subtitle: 'Do not build your power plant this way.',
    version: 13,
    categories: ['nuclear_power_plants', 'perspective', 'engineering'],
    publishedAt: null,
    archivedAt: now,
    content: '<p>Do this if you want things to go badly. Very badly.</p>',
  },
}
const starterCourses = {
  pGvcoU2WHUGo: {
    id: 'pGvcoU2WHUGo',
    name: 'Atomic Fundamentals',
    description: 'Get to know the building blocks of everything',
    objectives: 'Support lofty dreams of human progress.',
    level: 'beginner',
    tags: ['science', 'elements'],
    notes: 'Extensive notes to self by the author.',
    lessons: ['abc1', 'def2', 'ghi3'],
    trailhead: 'abc1',
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
    },
    status: 'open',
    createdAt: now,
    updatedAt: now,
  },
  oGUHW2UocvGp: {
    id: 'oGUHW2UocvGp',
    name: 'Fundamentals Atomics',
    description: 'Build with everything you know',
    objectives: 'Support lofty dreams of human progress.',
    level: 'beginner',
    tags: ['perspective', 'particle-physics'],
    notes: 'Extensive notes to self by the author.',
    lessons: ['ghi3', 'abc1', 'def2'],
    trailhead: 'ghi3',
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
    },
    status: 'closed',
    createdAt: now,
    updatedAt: now,
  },
  blargypants123: {
    id: 'blargypants123',
    name: 'PWRs Are a Powerhouse, Literally',
    description:
      'What reactor design has delivered the most electricity to the world? You guessed it.',
    objectives: 'Share the wonders of pressurized water reactors.',
    level: 'intermediate',
    tags: ['nuclear-power-plants', 'PWRs', 'gen3'],
    notes: 'Give people a good feeling about the success of PWRs.',
    lessons: ['abc1', 'def2'],
    trailhead: 'abc1',
    lessonPathMap: {
      abc1: {
        next: 'def2',
      },
      def2: {
        next: null,
      },
    },
    status: 'open',
    createdAt: now,
    updatedAt: now,
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
    courses: ['pGvcoU2WHUGo', 'oGUHW2UocvGp', 'blargypants123'],
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
    spawnCourse(name = 'a suitable name') {
      const newCourse = {
        id: generateRandomKey(),
        name,
        description: 'what this is about',
        objectives: 'what the student will learn',
        status: 'closed',
        level: '',
        tags: [],
        lessons: [],
        notes: 'for course designer',
        trailhead: '',
        lessonPathMap: {},
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      this.addCourseToStore(newCourse)
    },
    saveCourse(updates) {
      console.log('saving: ' + JSON.stringify(updates))
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
