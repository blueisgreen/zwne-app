/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createLessonStep = /* GraphQL */ `
  mutation CreateLessonStep(
    $input: CreateLessonStepInput!
    $condition: ModelLessonStepConditionInput
  ) {
    createLessonStep(input: $input, condition: $condition) {
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
export const updateLessonStep = /* GraphQL */ `
  mutation UpdateLessonStep(
    $input: UpdateLessonStepInput!
    $condition: ModelLessonStepConditionInput
  ) {
    updateLessonStep(input: $input, condition: $condition) {
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
export const deleteLessonStep = /* GraphQL */ `
  mutation DeleteLessonStep(
    $input: DeleteLessonStepInput!
    $condition: ModelLessonStepConditionInput
  ) {
    deleteLessonStep(input: $input, condition: $condition) {
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
export const createLessonPath = /* GraphQL */ `
  mutation CreateLessonPath(
    $input: CreateLessonPathInput!
    $condition: ModelLessonPathConditionInput
  ) {
    createLessonPath(input: $input, condition: $condition) {
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
export const updateLessonPath = /* GraphQL */ `
  mutation UpdateLessonPath(
    $input: UpdateLessonPathInput!
    $condition: ModelLessonPathConditionInput
  ) {
    updateLessonPath(input: $input, condition: $condition) {
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
export const deleteLessonPath = /* GraphQL */ `
  mutation DeleteLessonPath(
    $input: DeleteLessonPathInput!
    $condition: ModelLessonPathConditionInput
  ) {
    deleteLessonPath(input: $input, condition: $condition) {
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
export const createLessonPlan = /* GraphQL */ `
  mutation CreateLessonPlan(
    $input: CreateLessonPlanInput!
    $condition: ModelLessonPlanConditionInput
  ) {
    createLessonPlan(input: $input, condition: $condition) {
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
export const updateLessonPlan = /* GraphQL */ `
  mutation UpdateLessonPlan(
    $input: UpdateLessonPlanInput!
    $condition: ModelLessonPlanConditionInput
  ) {
    updateLessonPlan(input: $input, condition: $condition) {
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
export const deleteLessonPlan = /* GraphQL */ `
  mutation DeleteLessonPlan(
    $input: DeleteLessonPlanInput!
    $condition: ModelLessonPlanConditionInput
  ) {
    deleteLessonPlan(input: $input, condition: $condition) {
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
