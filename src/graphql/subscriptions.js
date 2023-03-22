/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateLessonPathStep = /* GraphQL */ `
  subscription OnCreateLessonPathStep(
    $filter: ModelSubscriptionLessonPathStepFilterInput
  ) {
    onCreateLessonPathStep(filter: $filter) {
      id
      courseId
      fromLesson
      toLesson
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateLessonPathStep = /* GraphQL */ `
  subscription OnUpdateLessonPathStep(
    $filter: ModelSubscriptionLessonPathStepFilterInput
  ) {
    onUpdateLessonPathStep(filter: $filter) {
      id
      courseId
      fromLesson
      toLesson
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteLessonPathStep = /* GraphQL */ `
  subscription OnDeleteLessonPathStep(
    $filter: ModelSubscriptionLessonPathStepFilterInput
  ) {
    onDeleteLessonPathStep(filter: $filter) {
      id
      courseId
      fromLesson
      toLesson
      createdAt
      updatedAt
    }
  }
`;
export const onCreateLesson = /* GraphQL */ `
  subscription OnCreateLesson($filter: ModelSubscriptionLessonFilterInput) {
    onCreateLesson(filter: $filter) {
      id
      title
      subtitle
      version
      categories
      content
      archivedAt
      publishedAt
      courses {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateLesson = /* GraphQL */ `
  subscription OnUpdateLesson($filter: ModelSubscriptionLessonFilterInput) {
    onUpdateLesson(filter: $filter) {
      id
      title
      subtitle
      version
      categories
      content
      archivedAt
      publishedAt
      courses {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteLesson = /* GraphQL */ `
  subscription OnDeleteLesson($filter: ModelSubscriptionLessonFilterInput) {
    onDeleteLesson(filter: $filter) {
      id
      title
      subtitle
      version
      categories
      content
      archivedAt
      publishedAt
      courses {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateCourse = /* GraphQL */ `
  subscription OnCreateCourse($filter: ModelSubscriptionCourseFilterInput) {
    onCreateCourse(filter: $filter) {
      id
      name
      description
      objectives
      status
      level
      tags
      notes
      trailhead
      archivedAt
      lessons {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCourse = /* GraphQL */ `
  subscription OnUpdateCourse($filter: ModelSubscriptionCourseFilterInput) {
    onUpdateCourse(filter: $filter) {
      id
      name
      description
      objectives
      status
      level
      tags
      notes
      trailhead
      archivedAt
      lessons {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCourse = /* GraphQL */ `
  subscription OnDeleteCourse($filter: ModelSubscriptionCourseFilterInput) {
    onDeleteCourse(filter: $filter) {
      id
      name
      description
      objectives
      status
      level
      tags
      notes
      trailhead
      archivedAt
      lessons {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateLessonCourse = /* GraphQL */ `
  subscription OnCreateLessonCourse(
    $filter: ModelSubscriptionLessonCourseFilterInput
  ) {
    onCreateLessonCourse(filter: $filter) {
      id
      lessonId
      courseId
      lesson {
        id
        title
        subtitle
        version
        categories
        content
        archivedAt
        publishedAt
        createdAt
        updatedAt
      }
      course {
        id
        name
        description
        objectives
        status
        level
        tags
        notes
        trailhead
        archivedAt
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateLessonCourse = /* GraphQL */ `
  subscription OnUpdateLessonCourse(
    $filter: ModelSubscriptionLessonCourseFilterInput
  ) {
    onUpdateLessonCourse(filter: $filter) {
      id
      lessonId
      courseId
      lesson {
        id
        title
        subtitle
        version
        categories
        content
        archivedAt
        publishedAt
        createdAt
        updatedAt
      }
      course {
        id
        name
        description
        objectives
        status
        level
        tags
        notes
        trailhead
        archivedAt
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteLessonCourse = /* GraphQL */ `
  subscription OnDeleteLessonCourse(
    $filter: ModelSubscriptionLessonCourseFilterInput
  ) {
    onDeleteLessonCourse(filter: $filter) {
      id
      lessonId
      courseId
      lesson {
        id
        title
        subtitle
        version
        categories
        content
        archivedAt
        publishedAt
        createdAt
        updatedAt
      }
      course {
        id
        name
        description
        objectives
        status
        level
        tags
        notes
        trailhead
        archivedAt
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
