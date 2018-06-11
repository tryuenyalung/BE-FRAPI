import express from 'express'
import * as EfileController from './../controllers/EfileController'
import * as GenericValidator from './../validators/GenericValidator'



const router = express.Router()

 
router.get('/', 
    EfileController.paginatedEfile, //check if it has query page=number
    EfileController.findAllEfiles
)

router.get('/:id', 
    GenericValidator.validateObjectId,
    EfileController.findEfileById
)

// router.get('/search', 
//     UserValidator.validateQueryString,
//     UserController.searchQuery
// )
          

router.post("/",
    EfileController.createEfile
)

// router.post("/login",
//     AuthController.authUser
// )

router.put('/:id', 
    GenericValidator.validateObjectId,
    EfileController.updateEfile
)

router.delete('/:id', 
    GenericValidator.validateObjectId,
    EfileController.deleteEfile
)


export default router
