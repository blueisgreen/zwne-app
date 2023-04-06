import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncItem, AsyncCollection } from "@aws-amplify/datastore";

export enum LessonStatus {
  DRAFT = "DRAFT",
  IN_REVIEW = "IN_REVIEW",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED"
}



type EagerLessonStep = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<LessonStep, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly FromLesson?: LessonPlan | null;
  readonly ToLesson?: LessonPlan | null;
  readonly transitionPrompt?: string | null;
  readonly lessonpathID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly lessonStepFromLessonId?: string | null;
  readonly lessonStepToLessonId?: string | null;
}

type LazyLessonStep = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<LessonStep, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly FromLesson: AsyncItem<LessonPlan | undefined>;
  readonly ToLesson: AsyncItem<LessonPlan | undefined>;
  readonly transitionPrompt?: string | null;
  readonly lessonpathID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly lessonStepFromLessonId?: string | null;
  readonly lessonStepToLessonId?: string | null;
}

export declare type LessonStep = LazyLoading extends LazyLoadingDisabled ? EagerLessonStep : LazyLessonStep

export declare const LessonStep: (new (init: ModelInit<LessonStep>) => LessonStep) & {
  copyOf(source: LessonStep, mutator: (draft: MutableModel<LessonStep>) => MutableModel<LessonStep> | void): LessonStep;
}

type EagerLessonPath = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<LessonPath, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly LessonPlan?: LessonPlan | null;
  readonly FirstStep?: LessonStep | null;
  readonly LessonSteps?: (LessonStep | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly lessonPathLessonPlanId?: string | null;
  readonly lessonPathFirstStepId?: string | null;
}

type LazyLessonPath = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<LessonPath, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly LessonPlan: AsyncItem<LessonPlan | undefined>;
  readonly FirstStep: AsyncItem<LessonStep | undefined>;
  readonly LessonSteps: AsyncCollection<LessonStep>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly lessonPathLessonPlanId?: string | null;
  readonly lessonPathFirstStepId?: string | null;
}

export declare type LessonPath = LazyLoading extends LazyLoadingDisabled ? EagerLessonPath : LazyLessonPath

export declare const LessonPath: (new (init: ModelInit<LessonPath>) => LessonPath) & {
  copyOf(source: LessonPath, mutator: (draft: MutableModel<LessonPath>) => MutableModel<LessonPath> | void): LessonPath;
}

type EagerLessonPlan = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<LessonPlan, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title: string;
  readonly subtitle?: string | null;
  readonly synopsis?: string | null;
  readonly objective?: string | null;
  readonly status?: LessonStatus | keyof typeof LessonStatus | null;
  readonly content?: string | null;
  readonly cover?: string | null;
  readonly publishedAt?: string | null;
  readonly archivedAt?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyLessonPlan = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<LessonPlan, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title: string;
  readonly subtitle?: string | null;
  readonly synopsis?: string | null;
  readonly objective?: string | null;
  readonly status?: LessonStatus | keyof typeof LessonStatus | null;
  readonly content?: string | null;
  readonly cover?: string | null;
  readonly publishedAt?: string | null;
  readonly archivedAt?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type LessonPlan = LazyLoading extends LazyLoadingDisabled ? EagerLessonPlan : LazyLessonPlan

export declare const LessonPlan: (new (init: ModelInit<LessonPlan>) => LessonPlan) & {
  copyOf(source: LessonPlan, mutator: (draft: MutableModel<LessonPlan>) => MutableModel<LessonPlan> | void): LessonPlan;
}