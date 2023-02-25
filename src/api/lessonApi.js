const now = new Date()
const sample = [
  {
    id: 'pile1',
    revision: 1,
    title: 'The First Chain Reaction',
    subtitle: 'What happens when you pile up enough uranium.',
    categories: ['physics'],
    createdAt: now,
    updatedAt: now,
    publishedAt: now,
  },
  {
    id: 'pwr1',
    revision: 1,
    title: 'Pressurized Water Reactors (PWRs)',
    subtitle: 'An excellent way to product lots of electricity.',
    categories: ['physics'],
    createdAt: now,
    updatedAt: now,
    publishedAt: now,
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

export function getLessonContent() {
  return new Promise(function (resolve, reject) {
    resolve(sampleContent)
  })
}
