import path from 'path'
import crypto from 'crypto'
import mongoose from 'mongoose'
import multer from 'multer'
import GridFsStorage from 'multer-gridfs-storage'

import keys from './../keys'

const mlab = keys.USERS_DB
 
const bucketList = keys.BUCKET_LIST

// check the file extension and the bucket for it
const getBucket =(fileType)=> {
  let bucket = bucketList[fileType]
  return bucket ? bucket : "uploads"
}

// stores the file to a specific bucket from the bucketlist
const storage = new GridFsStorage({
    url: mlab,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        
        // create unique filename
        crypto.randomBytes(16, (err, buf) => {
          
            if (err) { return reject(err) }

          
            const filename = buf.toString('hex') + path.extname(file.originalname)
            const fileInfo = {
                filename: filename,
                metadata: {
                  owner: "ownerId"
                },
                bucketName: getBucket(file.mimetype)
            }

            resolve(fileInfo)
        })
      })
    }
})

export const upload = multer( {storage} )
