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
import PostListsController from '#controllers/post_lists_controller'
import PageListsController from '#controllers/page_lists_controller'

router.on('/').renderInertia('home')

router.get('login', [LoginViewsController]).as('login.view')
router.post('login', [LoginStoresController]).as('login.store')
router.get('logout', [LogoutViewsController]).as('logout.view')

router.group(() => {
  router.get('/', [DashboardViewsController]).as('dashboard.view')
  router.get('pages', [PageListsController]).as('page.list')
  router.get('posts', [PostListsController]).as('post.list')
})
.prefix('admin')
.middleware(middleware.auth())