import express from 'express'
import users from './users'

import authenticate from '@app/libs/authentication-middleware'

let router = express.Router()

router.use('/users', users)

router.use(authenticate)

export default router
