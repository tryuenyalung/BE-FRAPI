import express from 'express'
import * as UserController from './../controllers/UserController'
import * as AuthController from './../controllers/AuthController'
import * as UserValidator from './../validators/UserValidator'


const router = express.Router()

 
router.get('/', 
    UserController.paginatedUser, //check if it has query page=number
    UserController.findAllUsers
)

router.get('/search', 
    UserValidator.validateQueryString,
    UserController.searchQuery
)
          

router.post("/",
    UserValidator.validateUsers,// validates the req body
    UserController.addUser
)

router.post("/login",
    AuthController.authUser
)

router.put('/:id', 
    UserValidator.validateObjectId,
    UserController.updateUser
)

router.delete('/:id', 
    UserValidator.validateObjectId,
    UserController.deleteUser
)


export default router
