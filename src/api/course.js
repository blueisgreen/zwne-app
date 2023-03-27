import { API } from 'aws-amplify'
import {
  listCourseMarkers,
  createCourseWithName,
  getCourseForUpdate,
  deleteCourseAbridged,
} from './customQueries'
import { getCourse, lessonsByCourseID } from '../graphql/queries'
import { updateCourse } from '../graphql/mutations'
import { CourseStatusOptions } from '../models'
import { toAWSDateTime } from '../components/modelTools'

/**
 * Attempts to persist a new course based on given values.
 * @param {String} courseName
 * @returns Course
 */
export async function createCourse(courseName) {
  console.log('createCourse', courseName)
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
      query: listCourseMarkers,
    })
    return results.data.listCourses.items
  } catch (err) {
    console.error(err)
  }
}

/**
 * Retrieves a specific course, including lesson plans if any.
 * @returns Course
 */
export async function fetchCourse(id) {
  console.log('fetchCourse', id)
  try {
    const results = await API.graphql({
      query: getCourse,
      variables: { id },
    })
    console.log('course', results)
    return results.data.getCourse
  } catch (err) {
    console.error(err)
  }
}

export async function fetchCourseLessons(courseID) {
  console.log('fetchCourse', courseID)
  try {
    const results = await API.graphql({
      query: lessonsByCourseID,
      variables: { courseID },
    })
    return results.data.lessonsByCourseID.items
  } catch (err) {
    console.error(err)
  }
}

async function getCourseNow(id) {
  console.log('getCourseNow', id)
  try {
    const original = await API.graphql({
      query: getCourseForUpdate,
      variables: { id },
    })
    return original.data.getCourse
  } catch (err) {
    console.error(err)
  }
}

async function goSaveCourse(deltas) {
  console.log('goSaveCourse', deltas)
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
 * Applies changes to existing course info. LessonCourse joins are
 * ignored. Update changes to LessonCourse joins separately
 * @param {*} id
 * @param {*} deltas
 * @returns
 */
export async function saveCourse(id, deltas) {
  console.log('saveCourse', { id, deltas })
  try {
    const original = await getCourseNow(id)
    const updated = await goSaveCourse({ ...original, ...deltas })
    return updated
  } catch (err) {
    console.error(err)
  }
}

/**
 * Move course to open status.
 * @param {*} id
 * @returns
 */
export async function openCourse(id) {
  console.log('openCourse', id)
  return await saveCourse(id, {
    status: CourseStatusOptions.OPEN,
    statusChangedAt: toAWSDateTime(new Date()),
  })
}

/**
 * Move course to closed status.
 * @param {*} id
 * @returns
 */
export async function closeCourse(id) {
  console.log('closeCourse', id)
  return await saveCourse(id, {
    status: CourseStatusOptions.CLOSED,
    statusChangedAt: toAWSDateTime(new Date()),
  })
}

/**
 * Move course to archived status.
 * @param {*} id
 * @returns
 */
export async function archiveCourse(id) {
  console.log('archiveCourse', id)
  const archivedAt = toAWSDateTime(new Date())
  return await saveCourse(id, {
    status: CourseStatusOptions.ARCHIVED,
    statusChangedAt: toAWSDateTime(new Date()),
  })
}

export async function reviveCourse(id) {
  console.log('reviveCourse', id)
  return await saveCourse(id, {
    status: CourseStatusOptions.CLOSED,
    statusChangedAt: toAWSDateTime(new Date()),
  })
}

/**
 * Wipes out a course. Kersplat!
 * @param {*} id
 */
export async function deleteCourse(id) {
  console.log('deleteCourse', id)
  try {
    const result = await API.graphql({
      query: deleteCourseAbridged,
      variables: { input: { id } },
    })
    console.log('Deleted course', result)
    return true
  } catch (err) {
    console.error(err)
  }
}
