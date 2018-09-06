import pgOrder from 'pages/order'
import pgStore from 'pages/store'
import pgHome from 'pages/home'
import pgMember from 'pages/member'
import layoutMember from 'layouts/member'
import pgRegister from 'pages/register'
import pgLogin from 'pages/login'
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        path: '',
        component: pgHome,
      },
      {
        path: 'orders',
        component: pgOrder,
      },
      {
        path: 'stores',
        component: pgStore,
      },
      {
        path: 'member',
        component: layoutMember,
        children: [
          {
            path: '',
            component: pgMember,
          },
          {
            path: 'login',
            component: pgLogin,
          },
          {
            path: 'register',
            component: pgRegister,
          },
        ],
      },
    ],
  },
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
  })
}

export default routes
