/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import LoginViewsController from '#controllers/login_views_controller'
import router from '@adonisjs/core/services/router'

router.on('/').renderInertia('home')

router.get('login', [LoginViewsController]).as('login.view')
router.get('post', [LoginViewsController]).as('login.store')
