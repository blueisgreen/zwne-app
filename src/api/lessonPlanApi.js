import { API } from 'aws-amplify'
import {
  createLessonPlan,
  updateLessonPlan,
  deleteLessonPlan,
} from '../graphql/mutations'
import {
  getLessonPlan,
  getLessonContent,
  listLessonPlans,
  updateLessonContent,
} from '../graphql/custom'
import { LessonStatus } from '../models'
import { maskProps } from '../components/modelTools'

const lessonPropsForUpdate = [
  'id',
  'title',
  'subtitle',
  'synopsis',
  'objective',
  'cover',
  'status',
  'publishedAt',
  'archivedAt',
]

export const createLesson = async (title) => {
  const newLessonPlan = await API.graphql({
    query: createLessonPlan,
    variables: {
      input: {
        title,
        subtitle: '',
        synopsis: '',
        objective: '',
        status: LessonStatus.DRAFT,
        content: '',
        cover: '',
      },
    },
  })
  console.log('createLessonPlan', newLessonPlan)
  return newLessonPlan.data.createLessonPlan
}

export const fetchAllLessons = async () => {
  const allLessonPlans = await API.graphql({
    query: listLessonPlans,
  })
  console.log('listLessonPlans', allLessonPlans)
  return allLessonPlans.data.listLessonPlans.items
}

export const fetchLesson = async (id) => {
  const oneLessonPlan = await API.graphql({
    query: getLessonPlan,
    variables: { id },
  })
  console.log('getLessonPlan', oneLessonPlan)
  return oneLessonPlan.data.getLessonPlan
}

export const fetchLessonContent = async (id) => {
  const oneLessonPlan = await API.graphql({
    query: getLessonContent,
    variables: { id },
  })
  console.log('getLessonContent', oneLessonPlan)
  return oneLessonPlan.data.getLessonPlan
}

export const updateLesson = async (deltas) => {
  const deltasForUpdate = maskProps(deltas, lessonPropsForUpdate)
  const updatedLessonPlan = await API.graphql({
    query: updateLessonPlan,
    variables: {
      input: deltasForUpdate,
    },
  })
  console.log('updateLessonPlan', updatedLessonPlan)
  return updatedLessonPlan.data.updateLessonPlan
}

export const updateContent = async (id, content) => {
  const updatedLessonPlan = await API.graphql({
    query: updateLessonContent,
    variables: {
      input: {
        id,
        content,
      },
    },
  })
  console.log('updateLessonPlan', updatedLessonPlan)
  return updatedLessonPlan.data.updateLessonPlan
}

export const deleteLesson = async (id) => {
  const deletedLessonPlan = await API.graphql({
    query: deleteLessonPlan,
    variables: {
      input: {
        id,
      },
    },
  })
  console.log('deleteLessonPlan', deletedLessonPlan)
  return deletedLessonPlan.data.deleteLessonPlan
}
