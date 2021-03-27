import express from 'express'
import users from './users'
import bears from './bears'
import books from './books'

import authenticate from '@app/libs/authentication-middleware'

let router = express.Router()

router.use('/users', users)
router.use('/bears', bears)
router.use('/books', books)

router.use(authenticate)

export default router
