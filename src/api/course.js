import { API, graphqlOperation } from 'aws-amplify'
import { listCourses, getCourse } from '../graphql/queries'
import { createCourse, updateCourse, deleteCourse } from '../graphql/mutations'

function mapDataToCourse(data) {
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
    _version: data._version,
    _deleted: data._deleted,
    _lastChangedAt: data._lastChangedAt,
  }
}

/**
 * Attempts to persist a new course based on given values.
 * @param {*} given
 * @returns Course
 */
export async function goCreateCourse(given) {
  try {
    const { name } = given
    const results = await API.graphql(
      graphqlOperation(createCourse, {
        input: { name, status: 'CLOSED', level: 'BEGINNER' },
      })
    )
    return mapDataToCourse(results.data.createCourse)
  } catch (err) {
    console.error(err)
  }
}

/**
 * Retrieves a list of courses.
 * @returns
 */
export async function fetchCourses() {
  try {
    const results = await API.graphql(graphqlOperation(listCourses))
    const out = results.data.listCourses.items.map((data) =>
      mapDataToCourse(data)
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
export async function fetchCourse(id) {
  try {
    const results = await API.graphql(
      graphqlOperation(getCourse, { input: { id } })
    )
    console.log(JSON.stringify(results))
    return results.data
  } catch (err) {
    console.error(err)
  }
}

/**
 * Update course information.
 * @param {*} given
 * @returns
 */
export async function goUpdateCourse(given) {
  console.log('goUpdateCourse')
  console.log('given => ' + JSON.stringify(given))
  const { id, name, description, objectives, notes, status, level, _version } =
    given
  const changes = {
    id,
    name,
    description,
    objectives,
    notes,
    status,
    level,
    _version,
  }
  console.log('changes => ' + JSON.stringify(changes))
  try {
    const results = await API.graphql({
      query: updateCourse,
      variables: { input: changes },
    })
    console.log('returned from update => ' + JSON.stringify(results))
    return mapDataToCourse(results.data.updateCourse)
  } catch (err) {
    console.error(err)
  }
}

/**
 * Wipes out a course. Kersplat!
 * @param {*} id
 */
export async function goDeleteCourse(id) {
  try {
    const result = await API.graphql(
      graphqlOperation(deleteCourse, { input: { id } })
    )
    return true
  } catch (err) {
    console.error(err)
  }
}
