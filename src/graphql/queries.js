/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getLessonStep = /* GraphQL */ `
  query GetLessonStep($id: ID!) {
    getLessonStep(id: $id) {
      id
      FromLesson {
        id
        title
        subtitle
        synopsis
        objective
        status
        content
        cover
        publishedAt
        archivedAt
        createdAt
        updatedAt
      }
      ToLesson {
        id
        title
        subtitle
        synopsis
        objective
        status
        content
        cover
        publishedAt
        archivedAt
        createdAt
        updatedAt
      }
      transitionPrompt
      lessonpathID
      createdAt
      updatedAt
      lessonStepFromLessonId
      lessonStepToLessonId
    }
  }
`;
export const listLessonSteps = /* GraphQL */ `
  query ListLessonSteps(
    $filter: ModelLessonStepFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLessonSteps(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        transitionPrompt
        lessonpathID
        createdAt
        updatedAt
        lessonStepFromLessonId
        lessonStepToLessonId
      }
      nextToken
    }
  }
`;
export const lessonStepsByLessonpathID = /* GraphQL */ `
  query LessonStepsByLessonpathID(
    $lessonpathID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelLessonStepFilterInput
    $limit: Int
    $nextToken: String
  ) {
    lessonStepsByLessonpathID(
      lessonpathID: $lessonpathID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        transitionPrompt
        lessonpathID
        createdAt
        updatedAt
        lessonStepFromLessonId
        lessonStepToLessonId
      }
      nextToken
    }
  }
`;
export const getLessonPath = /* GraphQL */ `
  query GetLessonPath($id: ID!) {
    getLessonPath(id: $id) {
      id
      LessonPlan {
        id
        title
        subtitle
        synopsis
        objective
        status
        content
        cover
        publishedAt
        archivedAt
        createdAt
        updatedAt
      }
      FirstStep {
        id
        transitionPrompt
        lessonpathID
        createdAt
        updatedAt
        lessonStepFromLessonId
        lessonStepToLessonId
      }
      LessonSteps {
        nextToken
      }
      createdAt
      updatedAt
      lessonPathLessonPlanId
      lessonPathFirstStepId
    }
  }
`;
export const listLessonPaths = /* GraphQL */ `
  query ListLessonPaths(
    $filter: ModelLessonPathFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLessonPaths(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        updatedAt
        lessonPathLessonPlanId
        lessonPathFirstStepId
      }
      nextToken
    }
  }
`;
export const getLessonPlan = /* GraphQL */ `
  query GetLessonPlan($id: ID!) {
    getLessonPlan(id: $id) {
      id
      title
      subtitle
      synopsis
      objective
      status
      content
      cover
      publishedAt
      archivedAt
      createdAt
      updatedAt
    }
  }
`;
export const listLessonPlans = /* GraphQL */ `
  query ListLessonPlans(
    $filter: ModelLessonPlanFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLessonPlans(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        subtitle
        synopsis
        objective
        status
        content
        cover
        publishedAt
        archivedAt
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
