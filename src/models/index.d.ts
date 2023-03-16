import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";

export enum CourseStatusOptions {
  CLOSED = "CLOSED",
  OPEN = "OPEN",
  ARCHIVED = "ARCHIVED"
}

export enum CourseLevel {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
  EXPERT = "EXPERT",
  ALL = "ALL"
}



type EagerLessonPathStep = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<LessonPathStep, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly courseId?: string | null;
  readonly fromLesson?: string | null;
  readonly toLesson?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyLessonPathStep = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<LessonPathStep, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly courseId?: string | null;
  readonly fromLesson?: string | null;
  readonly toLesson?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type LessonPathStep = LazyLoading extends LazyLoadingDisabled ? EagerLessonPathStep : LazyLessonPathStep

export declare const LessonPathStep: (new (init: ModelInit<LessonPathStep>) => LessonPathStep) & {
  copyOf(source: LessonPathStep, mutator: (draft: MutableModel<LessonPathStep>) => MutableModel<LessonPathStep> | void): LessonPathStep;
}

type EagerLesson = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Lesson, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title?: string | null;
  readonly subtitle?: string | null;
  readonly version?: number | null;
  readonly categories?: (string | null)[] | null;
  readonly content?: string | null;
  readonly archivedAt?: string | null;
  readonly publishedAt?: string | null;
  readonly courses?: (LessonCourse | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyLesson = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Lesson, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title?: string | null;
  readonly subtitle?: string | null;
  readonly version?: number | null;
  readonly categories?: (string | null)[] | null;
  readonly content?: string | null;
  readonly archivedAt?: string | null;
  readonly publishedAt?: string | null;
  readonly courses: AsyncCollection<LessonCourse>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Lesson = LazyLoading extends LazyLoadingDisabled ? EagerLesson : LazyLesson

export declare const Lesson: (new (init: ModelInit<Lesson>) => Lesson) & {
  copyOf(source: Lesson, mutator: (draft: MutableModel<Lesson>) => MutableModel<Lesson> | void): Lesson;
}

type EagerCourse = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Course, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly description?: string | null;
  readonly objectives?: string | null;
  readonly status?: CourseStatusOptions | keyof typeof CourseStatusOptions | null;
  readonly level?: CourseLevel | keyof typeof CourseLevel | null;
  readonly tags?: (string | null)[] | null;
  readonly notes?: string | null;
  readonly trailhead?: string | null;
  readonly archivedAt?: string | null;
  readonly lessons?: (LessonCourse | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCourse = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Course, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly description?: string | null;
  readonly objectives?: string | null;
  readonly status?: CourseStatusOptions | keyof typeof CourseStatusOptions | null;
  readonly level?: CourseLevel | keyof typeof CourseLevel | null;
  readonly tags?: (string | null)[] | null;
  readonly notes?: string | null;
  readonly trailhead?: string | null;
  readonly archivedAt?: string | null;
  readonly lessons: AsyncCollection<LessonCourse>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Course = LazyLoading extends LazyLoadingDisabled ? EagerCourse : LazyCourse

export declare const Course: (new (init: ModelInit<Course>) => Course) & {
  copyOf(source: Course, mutator: (draft: MutableModel<Course>) => MutableModel<Course> | void): Course;
}

type EagerLessonCourse = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<LessonCourse, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly lessonId?: string | null;
  readonly courseId?: string | null;
  readonly lesson: Lesson;
  readonly course: Course;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyLessonCourse = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<LessonCourse, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly lessonId?: string | null;
  readonly courseId?: string | null;
  readonly lesson: AsyncItem<Lesson>;
  readonly course: AsyncItem<Course>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type LessonCourse = LazyLoading extends LazyLoadingDisabled ? EagerLessonCourse : LazyLessonCourse

export declare const LessonCourse: (new (init: ModelInit<LessonCourse>) => LessonCourse) & {
  copyOf(source: LessonCourse, mutator: (draft: MutableModel<LessonCourse>) => MutableModel<LessonCourse> | void): LessonCourse;
}