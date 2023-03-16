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
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
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
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        _version
        _deleted
        _lastChangedAt
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
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        _version
        _deleted
        _lastChangedAt
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
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        _version
        _deleted
        _lastChangedAt
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
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
