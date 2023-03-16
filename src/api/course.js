import { API, graphqlOperation } from 'aws-amplify'
import { listCourses, getCourse } from '../graphql/queries'
import { createCourse, updateCourse, deleteCourse } from '../graphql/mutations'

/**
 * Attempts to persist a new course based on given values.
 * @param {*} given
 * @returns Course
 */
export async function goCreateCourse(given) {
  const { name } = given
  const results = await API.graphql(
    graphqlOperation(createCourse, { input: { name } })
  )
  return mapCreateCourseToCourse(results.data.createCourse)
}

function mapCreateCourseToCourse(createCourse) {
  return {
    id: createCourse.id,
    name: createCourse.name,
    description: createCourse.description,
    objectives: createCourse.objectives,
    status: createCourse.status,
    level: createCourse.level,
    tags: createCourse.tags,
    notes: createCourse.notes,
    trailhead: createCourse.trailhead,
    archivedAt: createCourse.archivedAt,
    createdAt: createCourse.createdAt,
    updatedAt: createCourse.updatedAt,
  }
}
