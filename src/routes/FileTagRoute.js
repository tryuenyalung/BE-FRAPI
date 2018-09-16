import express from 'express'
import * as FileTagController from './../controllers/FileTagController'
import keys from './../keys'



// import mongoose from 'mongoose'
// import path from 'path'
// import Grid from 'gridfs-stream'
// import keys from './../keys'
 

const router = express.Router()

router.get('/', FileTagController.findAllFileTags)
// router.get('/', FileStream.findAllFilesByOwner)

// router.get('/sharedFile', FileStream.findAllSharedFilesByUserId)

// router.get('/delete', FileStream.deactivateFile)

// router.get('/signature/:filename', FileStream.findOne(keys.BUCKET.SIGNATURE) )
// router.get('/image/:filename', FileStream.findOne(keys.BUCKET.IMAGE) )
// router.get('/profile/:filename', FileStream.findOne(keys.BUCKET.PROFILE) )
// router.get('/document/:filename', FileStream.findOne(keys.BUCKET.DOCUMENT) )
// router.get('/presentation/:filename', FileStream.findOne(keys.BUCKET.PRESENTATION) )
// router.get('/spreadsheet/:filename', FileStream.findOne(keys.BUCKET.SPREADSHEET) )

router.post( "/",
    // FileController.validateFile,
    FileTagController.addFileTag
)



export default router






 
