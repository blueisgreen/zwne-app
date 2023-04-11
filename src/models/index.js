// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const LessonStatus = {
  "DRAFT": "DRAFT",
  "IN_REVIEW": "IN_REVIEW",
  "PUBLISHED": "PUBLISHED",
  "ARCHIVED": "ARCHIVED"
};

const { LessonStep, LessonPath, LessonPlan } = initSchema(schema);

export {
  LessonStep,
  LessonPath,
  LessonPlan,
  LessonStatus
};