// keep these handy for offline work (no API access)

const now = new Date()

export const starterCourses = {
  pGvcoU2WHUGo: {
    id: 'pGvcoU2WHUGo',
    name: 'Atomic Fundamentals',
    description: 'Get to know the building blocks of everything',
    objectives: 'Support lofty dreams of human progress.',
    level: 'beginner',
    tags: ['science', 'elements'],
    notes: 'Extensive notes to self by the author.',
    lessons: ['abc1', 'def2', 'ghi3'],
    trailhead: 'abc1',
    lessonPathMap: {
      abc1: {
        next: 'def2',
      },
      def2: {
        next: 'ghi3',
      },
      ghi3: {
        next: null,
      },
    },
    status: 'open',
    createdAt: now,
    updatedAt: now,
  },
  oGUHW2UocvGp: {
    id: 'oGUHW2UocvGp',
    name: 'Fundamentals Atomics',
    description: 'Build with everything you know',
    objectives: 'Support lofty dreams of human progress.',
    level: 'beginner',
    tags: ['perspective', 'particle-physics'],
    notes: 'Extensive notes to self by the author.',
    lessons: ['ghi3', 'abc1', 'def2'],
    trailhead: 'ghi3',
    lessonPathMap: {
      abc1: {
        next: 'def2',
      },
      def2: {
        next: null,
      },
      ghi3: {
        next: 'abc1',
      },
    },
    status: 'closed',
    createdAt: now,
    updatedAt: now,
  },
  blargypants123: {
    id: 'blargypants123',
    name: 'PWRs Are a Powerhouse, Literally',
    description:
      'What reactor design has delivered the most electricity to the world? You guessed it.',
    objectives: 'Share the wonders of pressurized water reactors.',
    level: 'intermediate',
    tags: ['nuclear-power-plants', 'PWRs', 'gen3'],
    notes: 'Give people a good feeling about the success of PWRs.',
    lessons: ['abc1', 'def2'],
    trailhead: 'abc1',
    lessonPathMap: {
      abc1: {
        next: 'def2',
      },
      def2: {
        next: null,
      },
    },
    status: 'open',
    createdAt: now,
    updatedAt: now,
  },
}

export const starterLessons = {
  abc1: {
    id: 'abc1',
    title: 'What is an atom?',
    subtitle: 'About what an atom is',
    version: 3,
    categories: ['science'],
    publishedAt: now,
    content: '<p>Think small. Now go smaller. And smaller.</p>',
  },
  def2: {
    id: 'def2',
    title: 'Elements',
    subtitle: 'Elements are particular kinds of atoms',
    version: 5,
    categories: ['science'],
    publishedAt: now,
    content:
      '<p>Hydrogen, helium, lithium, beryllium, boron, carbon, nitrogen, oxygen, and so on.</p>',
  },
  ghi3: {
    id: 'ghi3',
    title: 'Radioactive Isotopes',
    subtitle: 'Some elements have trouble holding themselves together',
    version: 2,
    categories: ['science', 'safety'],
    publishedAt: null,
    content: '<p>Iodine, thorium, uranium, plutonium, polonium, and so on.</p>',
  },
  xyz13: {
    id: 'xyz13',
    title: 'Bad (Re)actors',
    subtitle: 'Do not build your power plant this way.',
    version: 13,
    categories: ['nuclear_power_plants', 'perspective', 'engineering'],
    publishedAt: null,
    archivedAt: now,
    content: '<p>Do this if you want things to go badly. Very badly.</p>',
  },
}
