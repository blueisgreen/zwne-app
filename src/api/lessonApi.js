import { API } from 'aws-amplify'
import { getLessonFull, listPublishedLessons } from '../graphql/custom'

export const fetchPublishedLessons = async () => {
  const allLessonPlans = await API.graphql({
    query: listPublishedLessons,
  })
  return allLessonPlans.data.listLessonPlans.items
}

export const fetchFullLesson = async (id) => {
  const fullLesson = await API.graphql({
    query: getLessonFull,
    variables: { id },
  })
  return fullLesson.data.getLessonPlan
}
