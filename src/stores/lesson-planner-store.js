import { defineStore } from 'pinia'
import { getLessonPlans, getLessonContent } from '../api/lessonApi'
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
    activeContentDraft: '',
  }),

  getters: {
    lessonOptions() {
      return this.lessonOptionIds.map((id) => this.lessonPlans[id])
    },
    selectedLesson() {
      return this.selectedPlanId ? this.lessonPlans[this.selectedPlanId] : null
    },
    isDraftDirty() {
      return (
        this.isSelected &&
        this.activeContentDraft != this.selectedLesson.content
      )
    },
    isSelected() {
      return this.selectedPlanId != null
    },
    hasLesson: (state) => {
      return (lessonId) => {
        return state.lessonPlans[lessonId] != null
      }
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
      try {
        const plans = await getLessonPlans()
        if (plans) {
          this.loadLessonPlans(plans)
        }
      } catch (err) {
        alert(err)
      }
    },
    async fetchLessonContent(id) {
      // TODO: use API to get content
      if (!this.hasLesson(id)) {
        await this.fetchLessonPlans()
      }
      if (!this.lessonPlans[id].content) {
        try {
          const content = await getLessonContent(id)
          this.loadLessonContent(id, content)
        } catch (err) {
          alert(err)
        }
      }
    },
    async prepLessonForEdit(lessonId) {
      await this.fetchLessonContent(lessonId)
      this.selectLesson(lessonId)
      this.activeContentDraft = this.selectedLesson.content
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
      plan.categories = this.selectedPlanChanges.categories
      plan.updatedAt = new Date()
      this.clearPlanEdits()
    },
    saveContentChanges() {
      // TODO: use API to persist
      this.selectedLesson.content = this.activeContentDraft
    },
  },
})
