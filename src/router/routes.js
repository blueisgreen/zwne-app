const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('pages/PrimaryLandingPage.vue'),
      },
      {
        path: 'scratch',
        name: 'scratch',
        component: () => import('pages/ScratchPage.vue'),
      },
      {
        path: 'lessons',
        name: 'lessons',
        component: () => import('pages/lessons/LearningCenterPage.vue'),
      },
      {
        path: 'lessons/abcd',
        name: 'lesson-sample',
        component: () => import('pages/lessons/LessonPage.vue'),
      },
      {
        path: 'lessons/prototype',
        name: 'lesson-prototype',
        component: () => import('pages/lessons/LessonPage-proto1.vue'),
      },
      {
        path: 'lessons/scratch',
        name: 'lesson-scratch',
        component: () => import('pages/lessons/LessonScratchPage.vue'),
      },
      {
        path: 'course-lab',
        name: 'courseLab',
        component: () => import('pages/lessons/planner/CourseLabPage.vue'),
      },
      {
        path: 'course-builder',
        name: 'newCourseBuilder',
        component: () => import('pages/lessons/planner/CourseBuilderPage.vue'),
      },
      {
        path: 'course-builder/:id',
        name: 'courseBuilder',
        component: () => import('pages/lessons/planner/CourseBuilderPage.vue'),
      },
      {
        path: 'lesson-builder',
        name: 'lessonBuilder',
        component: () => import('pages/lessons/planner/LessonBuilderPage.vue'),
      },
      {
        path: 'lesson-planner/:id',
        name: 'lessonPlanner',
        component: () => import('pages/lessons/planner/LessonPlannerPage.vue'),
      },
      {
        path: 'lesson-planner/editor/:id',
        name: 'lessonEditor',
        component: () => import('pages/lessons/planner/EditLessonPage.vue'),
      },
      {
        path: 'toys',
        name: 'toys',
        component: () => import('pages/toys/SimulatorPage.vue'),
      },
      {
        path: 'feedback',
        name: 'feedback',
        component: () => import('pages/support/FeedbackPage.vue'),
      },
      {
        path: 'account',
        name: 'account',
        component: () => import('pages/account/AccountPage.vue'),
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('pages/support/AboutPage.vue'),
      },
      {
        path: 'privacy-and-terms',
        name: 'legal',
        component: () => import('pages/LegalStuffPage.vue'),
      },
      {
        path: 'support',
        name: 'support',
        component: () => import('pages/support/SupportCenterPage.vue'),
      },
      {
        path: 'admin',
        name: 'admin',
        component: () => import('pages/admin/SiteAdminPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
