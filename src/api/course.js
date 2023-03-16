import { API, graphqlOperation } from 'aws-amplify'
import { listCourses, getCourse } from '../graphql/queries'
import { createCourse, updateCourse, deleteCourse } from '../graphql/mutations'

function mapDataToCourse(data) {
  console.log('mapping course data => ' + JSON.stringify(data))
  return {
    id: data.id,
    name: data.name || '',
    description: data.description || '',
    objectives: data.objectives || '',
    status: data.status || '',
    level: data.level || '',
    tags: data.tags || [],
    notes: data.notes || '',
    lessons: [],
    trailhead: data.trailhead,
    archivedAt: data.archivedAt,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  }
}

/**
 * Attempts to persist a new course based on given values.
 * @param {*} given
 * @returns Course
 */
export async function goCreateCourse(given) {
  const { name } = given
  const results = await API.graphql(
    graphqlOperation(createCourse, { input: { name } })
  )
  return mapDataToCourse(results.data.createCourse)
}

/**
 * Retrieves a list of courses.
 * @returns
 */
export async function fetchCourses() {
  let out = null
  try {
    const results = await API.graphql(graphqlOperation(listCourses))
    out = results.data.listCourses.items.map((data) => mapDataToCourse(data))
  } catch (err) {
    console.error(err)
  }
  return out
}

/**
 * Retrieves a course instance.
 * @returns
 */
export async function fetchCourse(id) {
  const results = await API.graphql(
    graphqlOperation(getCourse, { input: { id } })
  )
  console.log(JSON.stringify(results))
  return results.data
}

/**
 * Update course information.
 * @param {*} given
 * @returns
 */
export async function goUpdateCourse(given) {
  const { id, name, description, objectives, notes, status, level } = given
  const results = await API.graphql(
    graphqlOperation(updateCourse, {
      input: { id, name, description, objectives, notes, status, level },
    })
  )
  return mapDataToCourse(results.data.createCourse)
}

/**
 * Wipes out a course. Kersplat!
 * @param {*} id
 */
export async function goDeleteCourse(id) {
  await API.graphql(graphqlOperation(deleteCourse, { input: { id } }))
}
