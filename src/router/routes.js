import loDefault from 'layouts/Default'
import loAdminDefault from 'layouts/admin/Default'
import loCustomer from 'layouts/Customer'
import pgLogin from 'pages/Login'
import pgAdminLogin from 'pages/admin/Login'
import pgHome from 'pages/Home'
import pgAdminHome from 'pages/admin/Home'
import pgCategories from 'pages/Categories'
import pgMenus from 'pages/Menus'
import pgStores from 'pages/Stores'
import pgCustomer from 'pages/Customer'
import pgRegister from 'pages/Register'
import pgMenuDetail from 'pages/MenuDetail'
import pgError404 from 'pages/Error404'

const routes = [
  {
    path: '/',
    component: loDefault,
    children: [
      {
        path: '',
        component: pgHome,
      },
      {
        path: 'categories',
        component: pgCategories,
      },
      {
        path: 'menus/:catId',
        component: pgMenus,
      },
      {
        path: 'stores',
        component: pgStores,
      },
      {
        path: 'customer',
        component: loCustomer,
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
      {
        path: 'menus/:catId',
        component: pgMenus,
      },
      {
        path: 'menudetail/:menuId',
        component: pgMenuDetail,
      },
    ],
  },
  {
    path: '/admin',
    component: loAdminDefault,
    children: [
      {
        path: '',
        component: pgAdminHome,
      },
    ],
  },
  {
    path: '/admin/login',
    component: pgAdminLogin,
  },
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: pgError404,
  })
}

export default routes
