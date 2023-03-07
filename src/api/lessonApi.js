const now = new Date()
const sample = [
  {
    id: 'pile1',
    revision: 1,
    title: 'The First Chain Reaction',
    subtitle: 'What happens when you pile up enough uranium.',
    version: 1,
    categories: ['science'],
    createdAt: now,
    updatedAt: now,
    publishedAt: null,
    archivedAt: null,
  },
  {
    id: 'pwr1',
    revision: 1,
    title: 'Pressurized Water Reactors (PWRs)',
    subtitle: 'An excellent way to product lots of electricity.',
    version: 1,
    categories: ['nuclear_power_plants'],
    createdAt: now,
    updatedAt: now,
    publishedAt: null,
    archivedAt: null,
  },
]

export function getLessonPlans(success = true) {
  return new Promise(function (resolve, reject) {
    if (success) {
      resolve(sample)
    } else {
      reject('Error')
    }
  })
}

export function getLessonContent(lessonId) {
  return new Promise(function (resolve, reject) {
    resolve('<p>Replace me with pithy explanations.</p>')
  })
}

export async function simulateApiCall(callback) {
  return setTimeout(() => {
    callback()
  }, 1000)
}
