import path from 'path'
import crypto from 'crypto'
import mongoose from 'mongoose'
import multer from 'multer'
import GridFsStorage from 'multer-gridfs-storage'

import keys from './../keys'

const mlab = keys.USERS_DB
 



 
// stores the file to a specific bucket from the bucketlist
const storage = new GridFsStorage({

    url: mlab,

    file: (req, file) => {
      
      let bucketName = req.headers.bucket
      let ownerId = req.headers.owner_id
  
      
 
      return new Promise((resolve, reject) => {
        
        // create unique filename
        crypto.randomBytes(16, (err, buf) => {
          
            if (err) { return reject(err) }

          
            const filename = buf.toString('hex') + path.extname(file.originalname)
            const fileInfo = {
                filename: filename,
                metadata: {
                  owner: ownerId,
                  image_tag: req.body.image_tag,
                  isDeleted: false
                },
                bucketName: bucketName
            }

            resolve(fileInfo)
        })
      })
    }
})

export const upload = multer( {storage} )
