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
import PostListsController from '#controllers/contents/post_lists_controller'
import PageListsController from '#controllers/contents/page_lists_controller'
import PageListApiController from '#controllers/contents/api/page_lists_api_controller'
import PageEditsController from '#controllers/contents/page_edits_controller'
import PageUpdateApiController from '#controllers/contents/api/page_update_api_controller'

router.on('/').renderInertia('home')

router.get('login', [LoginViewsController]).as('login.view')
router.post('login', [LoginStoresController]).as('login.store')
router.get('logout', [LogoutViewsController]).as('logout.view')

router.group(() => {
  router.get('/', [DashboardViewsController]).as('dashboard.view')

  router.get('pages', [PageListsController]).as('pages.list')
  router.get('api/pages', [PageListApiController]).as('pages.get')

  router.get('pages/:id', [PageEditsController]).as('pages.edit')
  router.put('pages/:id', [PageUpdateApiController]).as('pages.update')

  router.get('posts', [PostListsController]).as('posts.list')
})
.prefix('admin')
.middleware(middleware.auth())