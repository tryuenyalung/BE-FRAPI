import mongoose from 'mongoose'
import path from 'path'
import Grid from 'gridfs-stream'

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


export const findOne =(req,res)=>{
  
    const fileExt = path.extname(req.params.filename)
    const fileName = {filename: req.params.filename}

    // select a bucket base on file extension
    gfs.collection( getExtForBucket(fileExt) )
    
    gfs.files.findOne(fileName, (err, file) =>{
        const readstream = gfs.createReadStream(fileName)
        // return error msg
        readstream.on('error', (err) => res.status(404).send(keys.FILE_ERR_MSG))
        // return file
        readstream.pipe(res)

    })

}

// gfs.files.find({ filename: 'myImage.png' }).toArray(function (err, files) {
//     if (err) ...
//     console.log(files);
//   })
 
 

export const findAll =(req,res)=>{
    
    gfs.collection( "images")
    // gfs.collection( "fileType")
  
    const fileOwner = {metadata: {owner: "ownerId"}}
    gfs.files.find(fileOwner).toArray( (err, files) =>  res.json(files) )

}



 

 