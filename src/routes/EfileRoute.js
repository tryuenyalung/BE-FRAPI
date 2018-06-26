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

router.get('/:efileId', 
    // GenericValidator.validateObjectId,
    EfileController.findEfileById
)
 
 
//find all the pending recipients for specific user
router.get('/pending/:userId', 
    EfileController.findAllPendingEfileById
)

//find all public efile that has been published
router.get('/published/public', 
    EfileController.findAllPublicPublishedEfile
)

//find all rejected efile the user has
router.get('/rejected/:userId', 
    EfileController.findAllRejectedEfileByUserId
)

router.get('/published/private/user/:userId', 
    EfileController.findAllPrivatePublishedEfileByUserId
)

// approve the efile
router.put('/approve/:efileId', 
    EfileController.approveEfile
)

// jwt in the interceptor
// router.post('/reject/:efileId', 
   
// )

// jwt in the interceptor
// router.get('/publish/:efileId', 
   
// )




// router.get('/search', 
//     UserValidator.validateQueryString,
//     UserController.searchQuery
// )
          

router.post("/",
    EfileValidator.postReqValidate,
    EfileController.createEfile
)

router.put('/:efileId', 
    // GenericValidator.validateObjectId,
    EfileController.updateEfile
)

router.delete('/:efileId', 
    // GenericValidator.validateObjectId,
    EfileController.deleteEfile
)


export default router
