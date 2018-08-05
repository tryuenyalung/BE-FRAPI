import mongoose from 'mongoose'
import path from 'path'
import Grid from 'gridfs-stream'
import * as PaginationService from './Pagination'

import keys from './../keys'
import { BADSTR } from 'dns';


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
    const bucket = req.query.bucket
    const tag = req.query.tag
    const owner_id = req.query.id

    gfs.collection( bucket )

    const fileOwner = {
        'metadata.owner': owner_id , 
        'metadata.tag': new RegExp( tag, 'i') ,
        'metadata.isDeleted': false
    }

    const cbFindFile =(err, files)=>  {
        err ? res.status(400).send(err) :
        res.json( PaginationService.paginate(files, page, limit) )
    }

    gfs.files.find(fileOwner).toArray(cbFindFile)

}



export const deactivateFile =(req,res)=>{
    const bucket = req.query.bucket
    const filename = req.query.filename

    gfs.collection( bucket )

    const cbdeactivate = (err, updated) => { 
        err ? res.status(400).send("err") : res.status(200).send({message:"file deactivated"})
    }

    gfs.files.update({ filename: filename}, { $set: { 'metadata.isDeleted': true } }, cbdeactivate)

}

// db.open()
//     // !!!!!!!!!
//     // !WARNING! THIS DROPS THE CURRENT DATABASE
//     // !!!!!!!!!
//     .then(() => db.dropDatabase())
//     .then(() => {
//         const gfs = Grid(db, mongo);

//         // create my_file
//         return new Promise((resolve, reject) => {
//             gfs.createWriteStream({ filename: 'my_file.txt' })
//                 .once('finish', resolve)
//                 .once('error', reject)
//                 .end('hello world');
//         })
//             // find my_file
//             .then(() => gfs.files.findOne({ filename: 'my_file.txt'})
//             .then(file => console.log('should find file:', !!file)))
//             // rename my_file to my_renamed_file
//             .then(() => gfs.files.update(
//                 { filename: 'my_file.txt'},
//                 { $set: { filename: 'my_renamed_file.txt' } }
//             )
//             .then(res => console.log('should have modified:', res.result.nModified === 1)))
//             // should not find my_file
//             .then(() => gfs.files.findOne({ filename: 'my_file.txt'})
//             .then(file => console.log('should not find: ', !file)))
//             // should find my_renamed_file
//             .then(() => gfs.files.findOne({ filename: 'my_renamed_file.txt'})
//             .then(file => console.log('should find renamed:', !!file)))
//     })
//     .catch(console.error);



export const findAll =(req,res)=>{
    const page = req.query.page
    const limit = req.query.limit
    const bucket = req.query.bucket
    const image_tag = req.query.tag
    const owner_id = req.query.id

    gfs.collection( bucket )
    // gfs.collection( "fileType")
  
    // const fileOwner = {
    //     metadata: {
    //         owner: "5b61c8a8d0902c000414ccd6", req.headers.owner_id
    //         image_tag: "weee"
    //     }
    // }

    const fileOwner = {
        'metadata.owner': owner_id , 
        'metadata.image_tag': new RegExp( image_tag, 'i') ,
        'metadata.isDeleted': false
    }

    const cbFindFile =(err, files)=>  {
        err ? res.status(400).send(err) :
        res.json( PaginationService.paginate(files, page, limit) )
    }

    // {
    //     'metadata.section': 'my-blog'
    //     'metadata.published': { '$lt': datetime.utcnow() } }

    gfs.files.find(fileOwner).toArray(cbFindFile)
 
}



 

 //findByUser
 //header file_type
 //header user?