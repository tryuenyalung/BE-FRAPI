import express from 'express'
import * as FileController from './../controllers/FileController'
import * as FileUpload from './../services/GridFsStorage'
import * as FileStream from './../services/GridFsStream'



import mongoose from 'mongoose'
import path from 'path'
import Grid from 'gridfs-stream'

import keys from './../keys'


const router = express.Router()

router.get('/', FileStream.findAll)
       
 
 
router.get('/:filename', FileStream.findOne)

router.post(
    "/",
    FileUpload.upload.single('file'),
    FileController.upload
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






 
