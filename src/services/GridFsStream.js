import mongoose from 'mongoose'
import path from 'path'
import Grid from 'gridfs-stream'
import * as PaginationService from './Pagination'

import keys from './../keys'


const mlab = keys.USERS_DB
const conn = mongoose.createConnection(mlab)
let gfs


conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo)
})

// list of valid file extensions
const fileExtList = keys.FILE_EXT_LIST

// check if valid file extension and fetch it on a dedicated bucket
let getExtForBucket =(fileExt)=> {
  let bucket = fileExtList[fileExt]
  return bucket ? bucket : "uploads"
}


export const findOne=(bucket)=>{
  
   return (req,res)=>{
  
        const fileName = {filename: req.params.filename}
    
        gfs.collection( bucket )
        
        const cbFindFile = (err, file) =>{
            const readstream = gfs.createReadStream(fileName)
            // return error msg
            // readstream.on('error', (err) => res.status(404).send(keys.FILE_ERR_MSG))
            readstream.on('error', (err) => res.status(404).send(keys.FILE_ERR_MSG))
            // return file
            readstream.pipe(res)
        }

        gfs.files.findOne(fileName, cbFindFile)
   }
}

// export const findOne =(req,res,bucket)=>{
  
//     const fileExt = path.extname(req.params.filename)
//     const bucketName = bucket
//     const fileName = {filename: req.params.filename}

//     // select a bucket base on file extension
//     gfs.collection( bucketName )
    
//     gfs.files.findOne(fileName, (err, file) =>{
//         const readstream = gfs.createReadStream(fileName)
//         // return error msg
//         readstream.on('error', (err) => res.status(404).send(keys.FILE_ERR_MSG))
//         // return file
//         readstream.pipe(res)

//     })

// }

// gfs.files.find({ filename: 'myImage.png' }).toArray(function (err, files) {
//     if (err) ...
//     console.log(files);
//   })
 

export const findAllFilesByOwner =(req,res)=>{
    const page = req.query.page
    const limit = req.query.limit

    const bucket = req.headers.bucket
    const fileOwner = { metadata: {owner: req.headers.owner_id} }

    // choose a bucket to search files
    gfs.collection( bucket )
    

    const cbFindFile =(err, files)=>  {
        err ? res.status(400).send(err) :
        res.json( PaginationService.paginate(files, page, limit) )
    }

    gfs.files.find(fileOwner).toArray(cbFindFile)

}



export const findAll =(req,res)=>{
    const page = req.query.page
    const limit = req.query.limit
    const file_type = req.headers.file_type

    gfs.collection( file_type )
    // gfs.collection( "fileType")
  
    const fileOwner = {metadata: {owner: "ownerId"}}

    const cbFindFile =(err, files)=>  {
        err ? res.status(400).send(err) :
        res.json( PaginationService.paginate(files, page, limit) )
    }

    gfs.files.find(fileOwner).toArray(cbFindFile)

}



 

 //findByUser
 //header file_type
 //header user?