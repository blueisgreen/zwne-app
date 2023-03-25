import { API } from 'aws-amplify'
import {
  listCourseMarkers,
  createCourseWithName,
  getCourseWithLessonMarkers,
  getCourseForUpdate,
  deleteCourseAbridged,
  listLessonCourseJoins,
  createLessonCourseJoin,
  deleteLessonCourseJoin,
} from './customQueries'
import { updateCourse } from '../graphql/mutations'
import { CourseStatusOptions } from '../models'
import { toAWSDateTime } from '../components/modelTools'

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
      query: listCourseMarkers,
    })
    console.log('courses', results)
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
  console.log('fetchCourse')

  try {
    const results = await API.graphql({
      query: getCourseWithLessonMarkers,
      variables: { id },
    })
    console.log('getCourseWithLessons', results)
    return results.data.getCourse
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

async function goSaveCourse(deltas) {
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
 * Applies changes to existing course info. LessonCourse joins are
 * ignored. Update changes to LessonCourse joins separately
 * @param {*} id
 * @param {*} deltas
 * @returns
 */
export async function saveCourse(id, deltas) {
  try {
    // prevent null by omission
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
  const archivedAt = toAWSDateTime(new Date())
  return await saveCourse(id, {
    status: CourseStatusOptions.ARCHIVED,
    statusChangedAt: toAWSDateTime(new Date()),
  })
}

export async function reviveCourse(id) {
  return await saveCourse(id, {
    status: CourseStatusOptions.CLOSED,
    statusChangedAt: toAWSDateTime(new Date()),
  })
}

/**
 * Wipes out a course. Kersplat!
 * @param {*} id
 */
export async function goDeleteCourse(id) {
  try {
    const result = await API.graphql({
      query: deleteCourseAbridged,
      variables: { input: { id } },
    })
    console.log('Deleted item => ', result)
    return true
  } catch (err) {
    console.error(err)
  }
}

/**
 * Retrieves joins to Lesson for given Course.
 * @param {*} courseId
 * @returns
 */
export async function fetchLessonCoursesForCourse(courseId) {
  console.log('fetchLessonCourses', courseId)
  try {
    const results = await API.graphql({
      query: listLessonCourseJoins,
      variables: { filter: { courseId: { eq: courseId } } },
    })
    console.log('lesson-courses', results)
    return results.data.lessonCoursesByCourseId.items
  } catch (err) {
    console.error(err)
  }
}

/**
 * Joins given Lesson for given Course.
 * @param {*} courseId
 * @param {*} lessonId
 * @returns
 */
export async function addLessonCourse(courseId, lessonId) {
  console.log('addLessonCourse')
  try {
    const results = await API.graphql({
      query: createLessonCourseJoin,
      variables: { input: { courseId, lessonId } },
    })
    console.log('lesson-course added', results)
    return results.data.createLessonCourse
  } catch (err) {
    console.error(err)
  }
}

/**
 * Remove given LessonCourse join.
 * @param {*} joinId
 * @returns
 */
export async function removeLessonCourse(joinId) {
  console.log('removeLessonCourse')
  try {
    const results = await API.graphql({
      query: deleteLessonCourseJoin,
      variables: { input: { id: joinId } },
    })
    console.log('lesson-course removed', results)
    return results.data.deleteLessonCourse
  } catch (err) {
    console.error(err)
  }
}
