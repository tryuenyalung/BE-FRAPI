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
      
      let bucketName = req.query.bucket
      let ownerId = req.query.id
      let tag = req.query.tag
  
      
 
      return new Promise((resolve, reject) => {
        
        // create unique filename
        crypto.randomBytes(16, (err, buf) => {
          
            if (err) { return reject(err) }

          
            const filename = buf.toString('hex') + path.extname(file.originalname)
            const fileInfo = {
                filename: filename,
                metadata: {
                  owner: ownerId,
                  tag: tag,
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
