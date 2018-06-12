import express from 'express'
import * as EfileController from './../controllers/EfileController'
import * as GenericValidator from './../validators/GenericValidator'
import * as EfileValidator from './../validators/EfileValidator'


const router = express.Router()

 
router.get('/', 
    //check if it has query page=number
    EfileController.paginatedEfile, 
    EfileController.findAllEfiles
)

router.get('/:id', 
    GenericValidator.validateObjectId,
    EfileController.findEfileById
)
 
 
//find all the pending recipients for specific user
router.get('/pending/:id', 
    EfileController.findAllPendingEfileById
)

//find all public efile that has been published
router.get('/published/public', 
    EfileController.findAllPublicPublishedEfile
)


router.get('/published/private/user/:userId', 
    EfileController.findAllPrivatePublishedEfile
)

//approve the efile
router.get('/approve/:id', 
    EfileController.approveEfile
)

// jwt in the interceptor
router.post('/reject/:efileId', 
   
)

// jwt in the interceptor
router.get('/publish/:efileId', 
   
)




// router.get('/search', 
//     UserValidator.validateQueryString,
//     UserController.searchQuery
// )
          

router.post("/",
    EfileValidator.postReqValidate,
    EfileController.createEfile
)

router.put('/:id', 
    GenericValidator.validateObjectId,
    EfileController.updateEfile
)

router.delete('/:id', 
    GenericValidator.validateObjectId,
    EfileController.deleteEfile
)


export default router
