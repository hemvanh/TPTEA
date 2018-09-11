import pgCats from 'pages/Pgcats'
import pgStore from 'pages/store'
import pgHome from 'pages/home'
import pgCustomer from 'pages/customer'
import layoutCustomer from 'layouts/customer'
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
        path: 'categories',
        component: pgCats,
      },
      {
        path: 'stores',
        component: pgStore,
      },
      {
        path: 'customer',
        component: layoutCustomer,
        children: [
          {
            path: '',
            component: pgCustomer,
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
