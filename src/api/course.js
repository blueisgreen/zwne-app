import { API, graphqlOperation } from 'aws-amplify'
import {
  listCourses,
  getCourse,
  getLesson,
  lessonCoursesByCourseId,
} from '../graphql/queries'
import {
  listCoursesWithLimitedInfo,
  getCourseWithLessonPlans,
  createCourseWithName,
} from './customQueries'
import { updateCourse, deleteCourse } from '../graphql/mutations'

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
export async function goCreateCourse(courseName) {
  console.log('goCreateCourse')
  try {
    const results = await API.graphql({
      query: createCourseWithName,
      variables: { name: courseName },
    })
    return results.data.createCourse
  } catch (err) {
    console.error(err)
  }
}

/**
 * Retrieves a list of courses.
 * @returns
 */
export async function fetchCourses() {
  console.log('fetchCourses')
  try {
    const results = await API.graphql({
      query: listCoursesWithLimitedInfo,
    })
    console.log('courses', results)
    const out = results.data.listCourses.items.filter((item) => !item._deleted)
    return out
  } catch (err) {
    console.error(err)
  }
}

/**
 * Retrieves a specific course, including lesson plans if any.
 * @returns Course
 */
export async function fetchCourse(id) {
  try {
    const results = await API.graphql({
      query: getCourseWithLessonPlans,
      variables: { id },
    })
    return results.data.getCourse
  } catch (err) {
    console.error(err)
  }
}

/**
 * Update course information.
 * @param {*} given
 * @returns
 */
export async function goSaveCourse(deltas) {
  console.log('saveCourse', deltas)
  try {
    const results = await API.graphql({
      query: updateCourse,
      variables: { input: deltas },
    })
    return results.data.updateCourse
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
    console.log('Deleted item => ', result)
    return true
  } catch (err) {
    console.error(err)
  }
}

export async function openCourse(id) {
  console.log('openCourse: not implemented')
}

export async function closeCourse(id) {
  console.log('openCourse: not implemented')
}

export async function archiveCourse(id) {
  console.log('openCourse: not implemented')
}

export async function reviveCourse(id) {
  console.log('openCourse: not implemented')
}
