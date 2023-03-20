import { DataStore } from 'aws-amplify'
import { Course } from '../models'

/**
  Work through DataStore instead of GraphQL directly. DataStore adds local storage and automatic data syncing. Seems redundant with Pinia in caching aspect. Is automatic syncing worth it?
 */

/**
 * Attempts to persist a new course based on given values.
 * @param {*} given
 * @returns Course
 */
export async function goCreateCourse(name) {
  console.log('goCreateCourse')
  try {
    const course = await DataStore.save(
      new Course({
        name,
        status: 'CLOSED',
      })
    )
    console.log('Course saved', course)
    return course
  } catch (err) {
    console.log('Error saving course', err)
  }
}

export async function saveCourse(changes) {
  console.log('saveCourse')
  const { id, name, description, objectives, status, level, tags, notes } =
    changes
  try {
    const current = await DataStore.query(Course, id)
    const next = await DataStore.save(
      Course.copyOf(current, (updated) => {
        updated.name = name
        updated.description = description
        updated.objectives = objectives
        updated.status = status
        updated.level = level
        // updated.tags = tags
        updated.notes = notes
      })
    )
    console.log('Course saved', next)
    return course
  } catch (err) {
    console.log('Error saving course', err)
  }
}

/**
 * Retrieves a list of courses.
 * @returns [Course]
 */
export async function fetchCourses() {
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
