import { API, graphqlOperation } from 'aws-amplify'
import { listLessons, getLesson } from '../graphql/queries'
import { createLesson, updateLesson, deleteLesson } from '../graphql/mutations'

function mapDataToLesson(data) {
  if (!data) {
    return null
  }
  return {
    id: data.id,
    title: data.title || '',
    subtitle: data.subtitle || '',
    version: data.version || 1,
    categories: data.categories || [],
    publishedAt: data.publishedAt,
    archivedAt: data.archivedAt,
    content: data.content,
    updatedAt: data._lastChangedAt,
  }
}

/**
 * Attempts to persist a new lesson based on given values.
 * @param {*} given
 * @returns Lesson
 */
export async function goCreateLesson(given) {
  console.log('goCreateLesson')
  try {
    const { title } = given
    const results = await API.graphql(
      graphqlOperation(createLesson, {
        input: { title },
      })
    )
    return mapDataToLesson(results.data.createLesson)
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
    // TODO: filter deleted items during fetch
    const variables = {}
    //   filter: {
    //     _deleted: {
    //       eq: false,
    //     },
    //   },
    // }
    const results = await API.graphql({ query: listLessons, variables })
    const out = results.data.listLessons.items.map((data) =>
      mapDataToLesson(data)
    )
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
    console.log(JSON.stringify(results))
    return mapDataToLesson(results.data.getLesson)
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
    console.log('Updated lesson => ' + JSON.stringify(results))
    return mapDataToLesson(results.data.updateLesson)
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
    console.log('Deleted item => ' + JSON.stringify(result))
    return true
  } catch (err) {
    console.error(err)
  }
}
