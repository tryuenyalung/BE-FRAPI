import express from 'express'
import * as FileController from './../controllers/FileController'
import * as FileUpload from './../services/GridFsStorage'
import * as FileStream from './../services/GridFsStream'
import * as PdfService from './../services/PdfService'
import * as FileValidator from './../validators/FileValidator'
import keys from './../keys'



// import mongoose from 'mongoose'
// import path from 'path'
// import Grid from 'gridfs-stream'
// import keys from './../keys'
 

const router = express.Router()

// router.get('/', FileStream.findAll)
router.get('/pdf/download/:id', PdfService.downloadPdf)
router.get('/', FileStream.findAllFilesByOwner)

router.get('/sharedFile', FileStream.findAllSharedFilesByUserId)

router.get('/delete', FileStream.deactivateFile)

router.get('/signature/:filename', FileStream.findOne(keys.BUCKET.SIGNATURE) )
router.get('/image/:filename', FileStream.findOne(keys.BUCKET.IMAGE) )
router.get('/profile/:filename', FileStream.findOne(keys.BUCKET.PROFILE) )
router.get('/document/:filename', FileStream.findOne(keys.BUCKET.DOCUMENT) )
router.get('/presentation/:filename', FileStream.findOne(keys.BUCKET.PRESENTATION) )
router.get('/spreadsheet/:filename', FileStream.findOne(keys.BUCKET.SPREADSHEET) )
router.get('/pdf/:filename', FileStream.findOne(keys.BUCKET.PDF) )

router.post( "/",
    // FileController.validateFile,
    FileUpload.upload.single('file'),
    FileController.sendResponse
)

router.put( "/",
    FileValidator.validateFileUpdate,
    FileStream.updateFile
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






 
