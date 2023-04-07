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
        path: 'lessons/:id',
        name: 'lessonViewer',
        component: () => import('pages/lessons/LessonViewerPage.vue'),
      },
      {
        path: 'lesson-lab',
        name: 'lessonLab',
        component: () => import('pages/lessons/lab/LessonLabPage.vue'),
      },
      {
        path: 'lesson-lab/:id',
        name: 'lessonBuilder',
        component: () => import('pages/lessons/lab/LessonBuilderPage.vue'),
      },
      {
        path: 'lesson-lab/media',
        name: 'lessonMedia',
        component: () => import('pages/lessons/lab/LessonMediaPage.vue'),
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
