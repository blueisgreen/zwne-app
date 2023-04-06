/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateLessonStep = /* GraphQL */ `
  subscription OnCreateLessonStep(
    $filter: ModelSubscriptionLessonStepFilterInput
  ) {
    onCreateLessonStep(filter: $filter) {
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
export const onUpdateLessonStep = /* GraphQL */ `
  subscription OnUpdateLessonStep(
    $filter: ModelSubscriptionLessonStepFilterInput
  ) {
    onUpdateLessonStep(filter: $filter) {
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
export const onDeleteLessonStep = /* GraphQL */ `
  subscription OnDeleteLessonStep(
    $filter: ModelSubscriptionLessonStepFilterInput
  ) {
    onDeleteLessonStep(filter: $filter) {
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
export const onCreateLessonPath = /* GraphQL */ `
  subscription OnCreateLessonPath(
    $filter: ModelSubscriptionLessonPathFilterInput
  ) {
    onCreateLessonPath(filter: $filter) {
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
export const onUpdateLessonPath = /* GraphQL */ `
  subscription OnUpdateLessonPath(
    $filter: ModelSubscriptionLessonPathFilterInput
  ) {
    onUpdateLessonPath(filter: $filter) {
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
export const onDeleteLessonPath = /* GraphQL */ `
  subscription OnDeleteLessonPath(
    $filter: ModelSubscriptionLessonPathFilterInput
  ) {
    onDeleteLessonPath(filter: $filter) {
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
export const onCreateLessonPlan = /* GraphQL */ `
  subscription OnCreateLessonPlan(
    $filter: ModelSubscriptionLessonPlanFilterInput
  ) {
    onCreateLessonPlan(filter: $filter) {
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
export const onUpdateLessonPlan = /* GraphQL */ `
  subscription OnUpdateLessonPlan(
    $filter: ModelSubscriptionLessonPlanFilterInput
  ) {
    onUpdateLessonPlan(filter: $filter) {
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
export const onDeleteLessonPlan = /* GraphQL */ `
  subscription OnDeleteLessonPlan(
    $filter: ModelSubscriptionLessonPlanFilterInput
  ) {
    onDeleteLessonPlan(filter: $filter) {
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
