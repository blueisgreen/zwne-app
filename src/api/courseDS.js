import { DataStore } from 'aws-amplify'
import { Course, CourseStatusOptions } from '../models'

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
        status: 'CLOSED',
      })
    )
    console.log('Course saved', course)
    return course
  } catch (err) {
    console.log('Error saving course', err)
  }
}

export async function saveCourse(updates) {
  const { id, name, description, objectives, level, tags, notes } = updates
  const original = await DataStore.query(Course, id)

  const updatedCourse = await DataStore.save(
    Course.copyOf(original, (updated) => {
      updated.name = name
      updated.description = description
      updated.objectives = objectives
      updated.level = level
      updated.tags = [...tags]
      updated.notes = notes
    })
  )
  return updatedCourse
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
