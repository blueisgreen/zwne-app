import { DataStore } from 'aws-amplify'
import { Course, CourseStatusOptions } from '../models'
import { toAWSDateTime } from '../components/modelTools'

/**
  Work through DataStore instead of GraphQL directly. DataStore adds local storage and automatic data syncing. Seems redundant with Pinia in caching aspect. Is automatic syncing worth it?
 */

/**
 * Attempts to persist a new course based on given values.
 * @param {*} given
 * @returns Course
 */
export async function createCourse(name) {
  console.log('goCreateCourse')
  try {
    const course = await DataStore.save(
      new Course({
        name,
        status: CourseStatusOptions.CLOSED,
      })
    )
    console.log('Course saved', course)
    return course
  } catch (err) {
    console.log('Error saving course', err)
  }
}

export async function saveCourse(updates) {
  const {
    id,
    name,
    description,
    objectives,
    level,
    tags,
    notes,
    status,
    archivedAt,
  } = updates
  const original = await DataStore.query(Course, id)

  console.log('courseDS.saveCourse', updates)
  console.log('from:', original)

  const updatedCourse = await DataStore.save(
    Course.copyOf(original, (updated) => {
      updated.name = name
      updated.description = description
      updated.objectives = objectives
      updated.level = level
      if (tags) {
        updated.tags = [...tags]
      }
      updated.notes = notes
      updated.status = status
      updated.archivedAt = archivedAt
    })
  )
  console.log('updated course => ', updatedCourse)
  return updatedCourse
}

async function changeCourseStatus(id, toStatus, archivedAt) {
  const original = await DataStore.query(Course, id)
  const updatedCourse = await DataStore.save(
    Course.copyOf(original, (updated) => {
      updated.status = toStatus
      updated.archivedAt = archivedAt
    })
  )
  console.log('updated course => ', updatedCourse)
  return updatedCourse
}

export async function openCourse(id) {
  const course = await changeCourseStatus(id, CourseStatusOptions.OPEN)
  return course
}

export async function closeCourse(id) {
  const course = await changeCourseStatus(id, CourseStatusOptions.CLOSED)
  return course
}

export async function archiveCourse(id) {
  const archievedAt = toAWSDateTime(new Date())
  const course = await changeCourseStatus(
    id,
    CourseStatusOptions.ARCHIVED,
    archievedAt
  )
  return course
}

export async function reviveCourse(id) {
  const course = await changeCourseStatus(id, CourseStatusOptions.CLOSED)
  return course
}

/**
 * Retrieves a list of courses.
 * @returns [Course]
 */
export async function fetchCourses() {
  console.log('fetchCourses')
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
  console.log('fetchCourse')
  try {
    const course = await DataStore.query(Course, id)
    console.log('Found', course)
    return course
  } catch (err) {
    console.log('Error fetching courses', err)
  }
}

/**
 * Wipes out a course. Kersplat!
 * @param {*} id
 */
export async function deleteCourse(id) {
  try {
    const toDelete = await DataStore.query(Course, id)
    DataStore.delete(toDelete, (course) =>
      course.status.ne(CourseStatusOptions.OPEN)
    )
    return true
  } catch (err) {
    console.error(err)
    return false
  }
}
