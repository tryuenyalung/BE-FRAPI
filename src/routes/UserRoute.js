import express from 'express'
import * as UserController from './../controllers/UserController'
import * as AuthController from './../controllers/AuthController'
import * as UserValidator from './../validators/UserValidator'
import * as GenericValidator from './../validators/GenericValidator'


const router = express.Router()

router.get('/', 
    // AuthController.verifyToken,
    UserController.paginatedUser, //check if it has query page=number
    UserController.findAllUsers
)

router.get('/search', 
    UserValidator.validateQueryString,
    UserController.searchQuery
)

router.get('/:userId', 
    // GenericValidator.validateObjectId,
    UserController.findUserById
)
 
router.post("/",
    UserValidator.validateUsers,// validates the req body
    UserController.addUser
)

router.post("/login",
    AuthController.authUser
)

router.put('/:userId', 
    // GenericValidator.validateObjectId,
    UserController.updateUser
)

router.put('/password/:userId', 
    // GenericValidator.validateObjectId,
    UserController.updateUserPassword
)

router.delete('/:userId', 
    // GenericValidator.validateObjectId,
    UserController.deleteUser
)


export default router
