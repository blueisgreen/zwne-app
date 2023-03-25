import { API } from 'aws-amplify'
import { listLessons, getLesson } from '../graphql/queries'
import { createLesson, updateLesson, deleteLesson } from '../graphql/mutations'
import { createLessonWithTitle } from './customQueries'

/**
 * Attempts to persist a new lesson based on given values.
 * @param {*} given
 * @returns Lesson
 */
export async function goCreateLesson(lessonTitle) {
  console.log('goCreateLesson')
  try {
    const results = await API.graphql({
      query: createLessonWithTitle,
      variables: { title: lessonTitle },
    })
    return results.data.createLesson
  } catch (err) {
    console.error(err)
  }
}

/**
 * Retrieves a list of lessons.
 * @returns
 */
export async function fetchLessons() {
  console.log('fetchLessons')
  try {
    const results = await API.graphql({ query: listLessons })
    const out = results.data.listLessons.items
    return out
  } catch (err) {
    console.error(err)
  }
}

/**
 * Retrieves a lesson instance.
 * @returns
 */
export async function fetchLesson(id) {
  console.log('Fetching lesson with ID => ' + id)
  try {
    const results = await API.graphql({ query: getLesson, variables: { id } })
    return results.data.getLesson
  } catch (err) {
    console.error(err)
  }
}

/**
 * Update lesson information.
 * @param {*} given
 * @returns
 */
export async function goUpdateLesson(given) {
  const { id, title, subtitle, categories, content } = given
  const changes = {
    id,
    title,
    subtitle,
    categories,
    content,
  }
  try {
    console.log('lessonAPI.goUpdateLesson: given=' + JSON.stringify(changes))
    const results = await API.graphql({
      query: updateLesson,
      variables: { input: changes },
    })
    return results.data.updateLesson
  } catch (err) {
    console.error(err)
  }
}

/**
 * Wipes out a lesson. Kersplat!
 * @param {*} id
 */
export async function goDeleteLesson(id) {
  try {
    const result = await API.graphql({
      query: deleteLesson,
      variables: { input: { id } },
    })
    return true
  } catch (err) {
    console.error(err)
  }
}
