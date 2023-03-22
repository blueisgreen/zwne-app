import { API } from 'aws-amplify'
import { listLessonPathSteps, createLessonCourse } from './customQueries'
import { lessonCoursesByCourseId } from 'src/graphql/queries'
import {
  deleteLessonCourse,
  createLessonPathStep,
  updateLessonPathStep,
  deleteLessonPathStep,
} from '../graphql/mutations'

export async function fetchLessonCourses(courseId) {
  console.log('fetchLessonCourses', courseId)
  try {
    const results = await API.graphql({
      query: lessonCoursesByCourseId,
      variables: { courseId },
    })
    console.log('lesson-courses', results)
    return results.data.lessonCoursesByCourseId.items
  } catch (err) {
    console.error(err)
  }
}

export async function addLessonCourse(courseId, lessonId) {
  console.log('addLessonCourse')
  try {
    const results = await API.graphql({
      query: createLessonCourse,
      variables: { input: { courseId, lessonId } },
    })
    console.log('lesson-course', results)
    return results.data.createLessonCourse
  } catch (err) {
    console.error(err)
  }
}

export async function removeLessonCourse(join) {
  console.log('removeLessonCourse')
  try {
    const results = await API.graphql({
      query: deleteLessonCourse,
      variables: { input: { id: join.id, _version: join._version } },
    })
    console.log('lesson-course', results)
    return results.data.deleteLessonCourse
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

export async function saveLessonPathStep(stepId, from, to) {
  console.log('updateLessonPathStep')
  try {
    const results = await API.graphql({
      query: updateLessonPathStep,
      variables: { input: { id: stepId, from, to } },
    })
    console.log('lesson steps', results)
    return results.data.listLessonPathSteps.items
  } catch (err) {
    console.error(err)
  }
}
export async function removeLessonPathStep(stepId) {
  console.log('removeLessonPathStep')
  try {
    const results = await API.graphql({
      query: deleteLessonPathStep,
      variables: { input: { id: stepId } },
    })
    console.log('lesson steps', results)
    return results.data.listLessonPathSteps.items
  } catch (err) {
    console.error(err)
  }
}
