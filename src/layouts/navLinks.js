export { insideLinks, outsideLinks }

const insideLinks = [
  {
    title: 'Welcome',
    caption: 'Get started here',
    icon: 'home',
    route: 'home',
    exact: true,
  },
  {
    title: 'Nuclear Learning',
    caption: 'Short lessons about nuclear power',
    icon: 'school',
    route: 'lessons',
  },
  {
    title: 'Fun and Games',
    caption: 'Simulators, converters and more',
    icon: 'smart_toy',
    route: 'toys',
  },
  {
    title: 'Give Feedback',
    caption: 'Offer Zanzibar feedback and suggestions',
    icon: 'rate_review',
    route: 'feedback',
    groupWithAccess: 'Members',
  },
  {
    title: 'Your Account',
    caption: 'Your profile and preferences',
    icon: 'manage_accounts',
    route: 'account',
  },
  {
    title: 'About Us',
    caption: 'Credits, contact info, and legal stuff',
    icon: 'info',
    route: 'about',
  },
  {
    title: 'Lesson Lab',
    caption: 'Where knowledge is mixed and bottled',
    icon: 'science',
    route: 'lessonLab',
    groupWithAccess: 'Editors',
  },
  {
    title: 'User Support',
    caption: 'How can we help you?',
    icon: 'help_outline',
    route: 'support',
    groupWithAccess: 'Members',
  },
  {
    title: 'Administration',
    caption: 'Controls for site admins',
    icon: 'admin_panel_settings',
    route: 'admin',
    groupWithAccess: 'Admins',
  },
]
const outsideLinks = [
  {
    title: "The Making Of Zanzi's World",
    caption: 'On Substack',
    icon: 'rss_feed',
    link: 'https://zanzisworld.substack.com/',
  },
  {
    title: "Zanzi's World Community",
    caption: 'On Locals',
    icon: 'groups',
    link: 'https://zanzisworldofnuclearpower.locals.com/',
    spawn: true,
  },
  {
    title: '@ZanzibarNuclear',
    caption: 'Follow on Twitter',
    icon: 'flutter_dash',
    link: 'https://twitter.com/ZanzibarNuclear',
    spawn: true,
  },
]
