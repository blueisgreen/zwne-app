import { API } from 'aws-amplify'
import { listLessonPathSteps, addLessonCourse } from './customQueries'
// import { listLessonPathSteps } from 'src/graphql/queries'
import {
  deleteLessonCourse,
  createLessonPathStep,
  updateLessonPathStep,
  deleteLessonPathStep,
  createLessonCourse,
} from '../graphql/mutations'

export async function addCourseLesson(courseId, lessonId) {
  console.log('addCourseLesson')
  try {
    const results = await API.graphql({
      query: addLessonCourse,
      variables: { input: { courseId, lessonId } },
    })
    console.log('lesson-course', results)
    return results.data.createLessonCourse
  } catch (err) {
    console.error(err)
  }
}

export async function removeCourseLesson(lessonCourseId) {
  console.log('removeCourseLesson')
  try {
    const results = await API.graphql({
      query: deleteLessonCourse,
      variables: { input: { id, lessonCourseId } },
    })
    console.log('lesson-course', results)
    return results.data.createLessonCourse
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

export async function fetchLessonPath(courseId) {
  console.log('fetchLessonPath')
  try {
    const results = await API.graphql({
      query: listLessonPathSteps,
      variables: { courseId },
    })
    console.log('lesson steps', results)
    return results.data.listLessonPathSteps.items
  } catch (err) {
    console.error(err)
  }
}
