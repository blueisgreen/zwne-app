import { API, graphqlOperation } from 'aws-amplify'
import { listCourses, getCourse } from '../graphql/queries'
import { createCourse, updateCourse, deleteCourse } from '../graphql/mutations'
import { Course } from '../models'
import { DataStore } from 'aws-amplify'

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
  console.log('goCreateCourse')
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

export async function saveCourseNew(name) {
  try {
    const course = await DataStore.save(
      new Course({
        name,
      })
    )
    console.log('Course saved', course)
    return course
  } catch (err) {
    console.log('Error saving course', err)
  }
}

export async function fetchCoursesNew() {
  console.log('fetchCoursesNew')
  try {
    const courses = await DataStore.query(Course)
    console.log('Found', courses)
    return courses
  } catch (err) {
    console.log('Error fetching courses', err)
  }
}

/**
 * Retrieves a list of courses.
 * @returns
 */
export async function fetchCourses() {
  console.log('fetchCourses')
  try {
    // TODO: filter deleted items during fetch
    const variables = {}
    //   filter: {
    //     _deleted: {
    //       eq: false,
    //     },
    //   },
    // }
    const results = await API.graphql({ query: listCourses, variables })
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
  console.log('Fetching course with ID => ' + id)
  try {
    // const results = await API.graphql(graphqlOperation(getCourse, { id }))
    const results = await API.graphql({ query: getCourse, variables: { id } })
    console.log(JSON.stringify(results))
    return mapDataToCourse(results.data.getCourse)
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
      query: updateCourse,
      variables: { input: changes },
    })
    return mapDataToCourse(results.data.updateCourse)
  } catch (err) {
    console.error(err)
  }
}

/**
 * Wipes out a course. Kersplat!
 * @param {*} id
 */
export async function goDeleteCourse(id, _version) {
  try {
    const result = await API.graphql({
      query: deleteCourse,
      variables: { input: { id, _version } },
    })
    console.log('Deleted item => ' + JSON.stringify(result))
    return true
  } catch (err) {
    console.error(err)
  }
}
