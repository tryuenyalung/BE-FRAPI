import express from 'express'
import * as UserController from './../controllers/UserController'
import * as UserValidator from './../validators/UserValidator'

const router = express.Router()
// const usersController = new UsersController()
 
router.get('/', UserController.findAllUsers)
            
// router.get(
//     '/:id', 
//     usersMiddleware.method,
//     usersController.method
// )

router.post(
        "/",
        UserValidator.validateUsers,
        UserController.addUser
)

// router.put(
//     '/:id', 
//     usersController.method
// )

// router.delete(
//     '/:id',
//     usersController.method
// )

export default router
