export default [
  {
    path: '/',
    component: () => import('layouts/hangman-layout'),
    children: [
      {path: '', component: () => import('pages/index')}
    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
