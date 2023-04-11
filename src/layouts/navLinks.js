export { insideLinks, priviledgedLinks, outsideLinks }

const insideLinks = [
  {
    title: 'Welcome',
    caption: 'Get started here',
    icon: 'fa-solid fa-home',
    route: 'home',
    exact: true,
  },
  {
    title: 'Nuclear Learning',
    caption: 'Short lessons about nuclear power',
    icon: 'fa-solid fa-atom',
    route: 'lessons',
  },
  {
    title: 'Fun and Games',
    caption: 'Simulators, converters and more',
    icon: 'fa-solid fa-robot',
    route: 'toys',
  },
  {
    title: 'Give Feedback',
    caption: 'Offer Zanzibar feedback and suggestions',
    icon: 'fa-regular fa-comment',
    route: 'feedback',
  },
  {
    title: 'Your Account',
    caption: 'Your profile and preferences',
    icon: 'fa-solid fa-gear',
    route: 'account',
  },
  {
    title: 'About Us',
    caption: 'Credits, contact info, and legal stuff',
    icon: 'fa-solid fa-circle-info',
    route: 'about',
  },
]
const priviledgedLinks = [
  {
    title: 'Lesson Lab',
    caption: 'Where knowledge is mixed and bottled',
    icon: 'school',
    route: 'lessonLab',
  },
  {
    title: 'User Support',
    caption: 'How can we help you?',
    icon: 'fa-solid fa-life-ring',
    route: 'support',
  },
  {
    title: 'Administration',
    caption: 'Controls for site admins',
    icon: 'fa-solid fa-screwdriver-wrench',
    route: 'admin',
  },
]
const outsideLinks = [
  {
    title: 'The Making Of…',
    caption: 'Essays about creating this experience',
    icon: 'fa-solid fa-rss',
    link: 'https://zanzisworld.substack.com/',
  },
  {
    title: 'Community',
    caption: "The Zanzi's World Community",
    icon: 'fa-solid fa-people-group',
    link: 'https://zanzisworldofnuclearpower.locals.com/',
    spawn: true,
  },
  {
    title: 'Twitter',
    caption: '@ZanzibarNuclear',
    icon: 'fa-brands fa-twitter',
    link: 'https://twitter.com/ZanzibarNuclear',
    spawn: true,
  },
]
