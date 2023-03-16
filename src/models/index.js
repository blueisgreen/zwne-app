// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const CourseStatusOptions = {
  "CLOSED": "CLOSED",
  "OPEN": "OPEN",
  "ARCHIVED": "ARCHIVED"
};

const CourseLevel = {
  "BEGINNER": "BEGINNER",
  "INTERMEDIATE": "INTERMEDIATE",
  "ADVANCED": "ADVANCED",
  "EXPERT": "EXPERT",
  "ALL": "ALL"
};

const { LessonPathStep, Lesson, Course, LessonCourse } = initSchema(schema);

export {
  LessonPathStep,
  Lesson,
  Course,
  LessonCourse,
  CourseStatusOptions,
  CourseLevel
};