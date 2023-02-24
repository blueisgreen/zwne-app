import { defineStore } from 'pinia'
import { generateRandomKey } from 'src/components/modelHelper'

/**
  lesson metadata
    {
      id: 'abcqwerty123',
      revision: 1,
      title: 'A lesson for the ages',
      subtitle: 'If you only learn one thing, make sure you learn this.',
      categories: ['physics'],
      createdAt: new Date(),
      updatedAt: new Date(),
      publishedAt: new Date(),
    }

  editable lesson metadata
    {
      title: 'A lesson for the ages',
      subtitle: 'If you only learn one thing, make sure you learn this.',
      categories: ['physics'],
    }
 */
export const useLessonPlannerStore = defineStore('lesson-planner', {
  state: () => ({
    lessonPlans: {},
    lessonOptionIds: [],
    selectedPlanId: null,
    selectedPlanChanges: null,
    activeContentDraft: null, // FIXME: put this on the page instead
  }),

  getters: {
    lessonOptions() {
      return this.lessonOptionIds.map((id) => this.lessonPlans[id])
    },
    selectedLesson() {
      return this.selectedPlanId ? this.lessonPlans[this.selectedPlanId] : null
    },
  },

  actions: {
    loadLessonPlans(plans) {
      plans.forEach((plan) => {
        this.lessonPlans[plan.id] = plan
        if (!this.lessonOptionIds.includes(plan.id)) {
          this.lessonOptionIds.push(plan.id)
        }
      })
    },
    loadLessonContent(id, content) {
      if (this.lessonPlans[id]) {
        this.lessonPlans[id].content = content
      }
    },
    async fetchLessonPlans() {
      // TODO: implement using API
      // try {
      //   const plans = await api.getLessonPlans()
      //   this.loadLessonPlans(plans)
      // } catch (err) {}
    },
    fetchLessonContent(id) {
      // TODO: use API to get content
      if (!this.lessonPlans[id].content) {
        this.loadLessonContent(id, "<p>Let's get this party started.</p>")
      }
    },
    selectLesson(id) {
      this.selectedPlanId = id
      this.clearPlanEdits()
    },
    clearPlanEdits() {
      this.selectedPlanChanges = null
    },
    createLesson() {
      const newLesson = {
        id: generateRandomKey(8),
        title: '',
        subtitle: '',
        categories: [],
        createdAt: null,
        updatedAt: null,
        publishedAt: null,
      }
      this.loadLessonPlans([newLesson])
      this.selectLesson(newLesson.id)
      this.editSelectedDetails()
    },
    editSelectedDetails() {
      if (this.selectedPlanId) {
        this.selectedPlanChanges = Object.assign({}, this.selectedLesson)
      }
    },
    savePlanChanges() {
      // TODO: use API to persist and refresh whole object
      const plan = this.lessonPlans[this.selectedPlanChanges.id]
      plan.title = this.selectedPlanChanges.title
      plan.subtitle = this.selectedPlanChanges.subtitle
      this.clearPlanEdits()
    },
    saveContentChanges(latest) {
      // TODO: use API to persist
      this.selectedLesson.content = latest
    },
  },
})
