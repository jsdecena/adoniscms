/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import LoginStoresController from '#controllers/login_stores_controller'
import LoginViewsController from '#controllers/login_views_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import DashboardViewsController from '#controllers/dashboard_views_controller'
import LogoutViewsController from '#controllers/logout_views_controller'

router.on('/').renderInertia('home')

router.get('login', [LoginViewsController]).as('login.view')
router.post('login', [LoginStoresController]).as('login.store')
router.get('logout', [LogoutViewsController]).as('logout.view')

router.group(() => {
  router.get('/', [DashboardViewsController]).as('dashboard.view')
})
.prefix('admin')
.middleware(middleware.auth())