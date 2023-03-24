/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
      level
      lessonPath
      status
      statusChangedAt
      tags
      lessons {
        nextToken
      }
      notes
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
      level
      lessonPath
      status
      statusChangedAt
      tags
      lessons {
        nextToken
      }
      notes
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
      level
      lessonPath
      status
      statusChangedAt
      tags
      lessons {
        nextToken
      }
      notes
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
        level
        lessonPath
        status
        statusChangedAt
        tags
        notes
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
        level
        lessonPath
        status
        statusChangedAt
        tags
        notes
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
        level
        lessonPath
        status
        statusChangedAt
        tags
        notes
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
