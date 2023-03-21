import { API, graphqlOperation } from 'aws-amplify'
import {
  listCourses,
  getCourse,
  getLesson,
  lessonCoursesByCourseId,
} from '../graphql/queries'
import { getCourseWithLessons } from './customQueries'
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
  console.log('Fetching course with ID => ', id)
  try {
    // const results = await API.graphql(graphqlOperation(getCourse, { id }))
    const results = await API.graphql({ query: getCourse, variables: { id } })
    console.log('results', results)
    return mapDataToCourse(results.data.getCourse)
  } catch (err) {
    console.error(err)
  }
}

export async function fetchCourseWithLessonPlans(id) {
  try {
    const results = await API.graphql({
      query: getCourseWithLessons,
      variables: { id },
    })
    console.log('results', results)
    return results
  } catch (err) {
    console.error(err)
  }
}

/* FIXME: avoid multiple trips */
export async function fetchLessonsForCourse(courseId) {
  console.log('fetchLessonsForCourse', courseId)
  let lessonIds = []
  try {
    const lessonCourses = await API.graphql({
      query: lessonCoursesByCourseId,
      variables: { courseId },
    })
    console.log('lessonCourses', lessonCourses)
    const { items } = lessonCourses.data.lessonCoursesByCourseId
    lessonIds = items.map((lessonCourse) => lessonCourse.lessonId)

    // TODO: try to return lesson plans instead of just IDs; maybe lazy loading is fine
    // async (lessonCourse) =>
    //   await API.graphql({
    //     query: getLesson,
    //     variables: { id: lessonCourse.lessonId },
    //   })
    console.log('lesson IDs', lessonIds)
    return lessonIds
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
