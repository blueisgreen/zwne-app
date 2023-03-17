import { API, graphqlOperation } from 'aws-amplify'
import { listLessons, getLesson } from '../graphql/queries'
import { createLesson, updateLesson, deleteLesson } from '../graphql/mutations'

function mapDataToLesson(data) {
  // FIXME:
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
    _version: data._version,
    _deleted: data._deleted,
  }
}

/**
 * Attempts to persist a new course based on given values.
 * @param {*} given
 * @returns Course
 */
export async function goCreateLesson(given) {
  try {
    const { title } = given
    const results = await API.graphql(
      graphqlOperation(createLesson, {
        input: { title },
      })
    )
    return mapDataToCourse(results.data.createLesson)
  } catch (err) {
    console.error(err)
  }
}

/**
 * Retrieves a list of courses.
 * @returns
 */
export async function fetchLessons() {
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
 * Retrieves a course instance.
 * @returns
 */
export async function fetchLesson(id) {
  console.log('Fetching course with ID => ' + id)
  try {
    // const results = await API.graphql(graphqlOperation(getCourse, { id }))
    const results = await API.graphql({ query: getLesson, variables: { id } })
    console.log(JSON.stringify(results))
    return mapDataToLesson(results.data.getLesson)
  } catch (err) {
    console.error(err)
  }
}

/**
 * Update course information.
 * @param {*} given
 * @returns
 */
export async function goUpdateLesson(given) {
  const {
    id,
    name,
    description,
    objectives,
    status,
    level,
    tags,
    notes,
    _version,
  } = given
  const changes = {
    id,
    name,
    description,
    objectives,
    status,
    level,
    tags,
    notes,
    _version,
  }
  try {
    const results = await API.graphql({
      query: updateLesson,
      variables: { input: changes },
    })
    return mapDataToLesson(results.data.updateLesson)
  } catch (err) {
    console.error(err)
  }
}

/**
 * Wipes out a course. Kersplat!
 * @param {*} id
 */
export async function goDeleteLesson(id, _version) {
  try {
    const result = await API.graphql({
      query: deleteLesson,
      variables: { input: { id, _version } },
    })
    console.log('Deleted item => ' + JSON.stringify(result))
    return true
  } catch (err) {
    console.error(err)
  }
}
