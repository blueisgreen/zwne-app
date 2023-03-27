import { API } from 'aws-amplify'
import { getLesson } from '../graphql/queries'
import { updateLesson, deleteLesson } from '../graphql/mutations'
import {
  listLessonMarkers,
  listLessonMarkersForCourse,
  createLessonWithTitle,
} from './customQueries'

/**
 * Attempts to persist a new lesson based on given values.
 * @param {*} given
 * @returns Lesson
 */
export async function createLesson(title) {
  console.log('createLesson', title)
  try {
    const results = await API.graphql({
      query: createLessonWithTitle,
      variables: { title },
    })
    return results.data.createLesson
  } catch (err) {
    console.error(err)
  }
}

/**
 * Retrieves a list of lessons.
 * @returns
 */
export async function fetchLessons() {
  console.log('fetchLessons')
  try {
    const results = await API.graphql({ query: listLessonMarkers })
    const out = results.data.listLessons.items
    return out
  } catch (err) {
    console.error(err)
  }
}

/**
 * Retrieves a list of lessons.
 * @returns
 */
export async function fetchLessonsForCourse(courseId) {
  console.log('fetchLessons')
  try {
    const results = await API.graphql({
      query: listLessonMarkersForCourse,
      variables: { courseId },
    })
    const out = results.data.listLessons.items
    return out
  } catch (err) {
    console.error(err)
  }
}

/**
 * Retrieves a lesson instance.
 * @returns
 */
export async function fetchLesson(id) {
  console.log('Fetching lesson with ID => ' + id)
  try {
    const results = await API.graphql({ query: getLesson, variables: { id } })
    return results.data.getLesson
  } catch (err) {
    console.error(err)
  }
}

/**
 * Update lesson information.
 * @param {*} given
 * @returns
 */
async function goSaveLesson(deltas) {
  console.log('goSaveLesson', deltas)
  try {
    const results = await API.graphql({
      query: updateLesson,
      variables: { input: deltas },
    })
    return results.data.updateLesson
  } catch (err) {
    console.error(err)
  }
}

export async function saveLesson(id, deltas) {
  console.log('saveLesson', { id, deltas })
  try {
    const original = await getLesson(id)
    const updated = await goSaveLesson({ ...original, ...deltas })
    return updated
  } catch (err) {
    console.error(err)
  }
}

/**
 * Wipes out a lesson. Kersplat!
 * @param {*} id
 */
export async function goDeleteLesson(id) {
  try {
    const result = await API.graphql({
      query: deleteLesson,
      variables: { input: { id } },
    })
    return result.data.deleteLesson
  } catch (err) {
    console.error(err)
  }
}

export async function addLessonToCourse(courseId, lessonId) {
  return await saveLesson(lessonId, {
    courseId: courseId,
  })
}

export async function removeLessonFromCourse(lessonId) {
  return await saveLesson(lessonId, {
    courseId: null,
  })
}

export async function publishLesson(lessonId) {
  return await saveLesson(lessonId, {
    publishedAt: new Date(),
  })
}

export async function retractLesson(lessonId) {
  return await saveLesson(lessonId, {
    publishedAt: null,
  })
}

// TODO: handle revisions - clone and edit copy
// export async function reviseLesson(lessonId) {
//   return await saveLesson(lessonId, {
//     publishedAt: null,
//   })
// }

export async function archiveLesson(lessonId) {
  return await saveLesson(lessonId, {
    archivedAt: new Date(),
  })
}

export async function reviveLesson(lessonId) {
  return await saveLesson(lessonId, {
    archivedAt: null,
  })
}
