import { API } from 'aws-amplify'
import {
  listCoursesWithLimitedInfo,
  getCourseWithLessonPlans,
  getCourseForUpdate,
  createCourseWithName,
  listLessonPathSteps,
} from './customQueries'
// import { listLessonPathSteps } from 'src/graphql/queries'
import {
  updateCourse,
  deleteCourse,
  createLessonPathStep,
  updateLessonPathStep,
  deleteLessonPathStep,
} from '../graphql/mutations'
import { CourseStatusOptions } from '../models'
import { toAWSDateTime } from '../components/modelTools'

export async function fetchLessonPathSteps(courseId) {
  console.log('fetchCourses')
  try {
    const results = await API.graphql({
      query: listLessonPathSteps,
      variables: { courseId },
    })
    console.log('lesson steps', results)
    return results.data.listLessonPathSteps
  } catch (err) {
    console.error(err)
  }
}

export async function addLessonPathStep(courseId, fromLesson, toLesson) {
  console.log('goCreateCourse')
  try {
    const results = await API.graphql({
      query: createLessonPathStep,
      variables: { courseId, fromLesson, toLesson },
    })
    return results.data.createLessonPathStep
  } catch (err) {
    console.error(err)
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

async function getCourseNow(id) {
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

export async function patchCourse(id, deltas) {
  try {
    const original = await getCourseNow(id)
    const updated = await goSaveCourse({ ...original, ...deltas })
    return updated
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
  return await patchCourse(id, { status: CourseStatusOptions.OPEN })
}

export async function closeCourse(id) {
  return await patchCourse(id, { status: CourseStatusOptions.CLOSED })
}

export async function archiveCourse(id) {
  const archivedAt = toAWSDateTime(new Date())
  return await patchCourse(id, {
    status: CourseStatusOptions.ARCHIVED,
    archivedAt,
  })
}

export async function reviveCourse(id) {
  return await patchCourse(id, {
    status: CourseStatusOptions.CLOSED,
    archivedAt: null,
  })
}
