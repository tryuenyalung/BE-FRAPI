import mongoose from 'mongoose'
import path from 'path'
import Grid from 'gridfs-stream'
import * as PaginationService from './Pagination'
import _ from 'lodash'
import keys from './../keys'
import {
    BADSTR
} from 'dns';
import {
    copyFile
} from 'fs';


const mlab = keys.USERS_DB
const conn = mongoose.createConnection(mlab)
let gfs


conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo)
})

// list of valid file extensions
const fileExtList = keys.FILE_EXT_LIST

// check if valid file extension and fetch it on a dedicated bucket
let getExtForBucket = (fileExt) => {
    let bucket = fileExtList[fileExt]
    return bucket ? bucket : "uploads"
}


export const findOne = (bucket) => {

    return (req, res) => {
        
        const fileName = {
            filename: req.params.filename
        }

        gfs.collection(bucket)

        const cbFindFile = (err, file) => {
            const readstream = gfs.createReadStream(fileName)
             
            res.setHeader('Content-Type', file.contentType)
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


export const findAllFilesByOwner = (req, res) => {
    const page = req.query.page
    const limit = req.query.limit
    const bucket = req.query.bucket
    const tag = req.query.tag
    const name = req.query.name
    const owner_id = req.query.id

    gfs.collection(bucket)

    const fileOwner = {
        'metadata.owner': owner_id,
        'metadata.name': new RegExp(name, 'i'),
        'metadata.tag': new RegExp(tag, 'i'),
        'metadata.isDeleted': false
    }

    const cbFindFile = (err, files) => {
        err ? res.status(400).send(err) :
            res.json(PaginationService.paginate(files, page, limit))
    }

    gfs.files.find(fileOwner).toArray(cbFindFile)

}


export const findAllSharedFilesByUserId = (req, res) => {
    const page = req.query.page
    const limit = req.query.limit
    const bucket = req.query.bucket
    const tag = req.query.tag
    const name = req.query.name
    const sharedUser_id = req.query.id
    gfs.collection(bucket)

    const fileOwner = {
        'metadata.tag': new RegExp(tag, 'i'),
        'metadata.name': new RegExp(name, 'i'),
        'metadata.sharedUser': { 
             $elemMatch:{
                //any record on arrays of object containing the id will be displayed
                id : sharedUser_id
            }
        },
             
        'metadata.isDeleted': false
    }


    const cbFindFile = (err, files) => {
        err ? res.status(400).send(err) :
            res.json(PaginationService.paginate(files, page, limit))
    }

    gfs.files.find(fileOwner).toArray(cbFindFile)

}






export const deactivateFile = (req, res) => {

    const config = {
        queryString: req.query,
        validQueryString: ['bucket', 'filename'],
        UPDATE_METADATA: {
            'metadata.isDeleted': true
        }
    }

    validatingQueryString(config)
        .then(x => deactivatingFile(x))
        .then(x => res.status(200).send(x))
        .catch(err => res.status(400).send(err))



    //PROMISE
    const deactivatingFile = (data) => {
        return new Promise((resolve, reject) => {

            gfs.collection(data.queryString.bucket)

            const cbDeactivateFile = (err, updated) =>
                err ? reject("error on updating metadata") : resolve({
                    message: "file deactivated"
                })

            gfs.files.update({
                filename: data.queryString.filename
            }, {
                $set: data.UPDATE_METADATA
            }, cbDeactivateFile)

        })
    }

}


export const updateFile = (req, res) => {
    //PROMISE
    const updatingFile = (data) => {
        return new Promise((resolve, reject) => {

            gfs.collection(data.bucket)

            const cbUpdateFile = (err, updated) =>
                err ? reject("error on updating metadata") : resolve({
                    message: "updated shared users"
                })
 
            gfs.files.update({
                filename: data.filename
            }, {
                $set: data.UPDATE_METADATA
            }, cbUpdateFile)

        })
    }

    const config = {
        bucket: req.body.bucket,
        filename: req.body.filename,
        UPDATE_METADATA: {
            'metadata.sharedUser': req.body.sharedUser,
            'metadata.name': req.body.name,
            'metadata.tag': req.body.tag
        }
    }

    return updatingFile(config)
        .then(x => res.status(200).send(x))
        .catch(err => res.status(400).send(err))

}



//REUSABLE PROMISE
let validatingQueryString = (data) => {

    let msg = ""

    return new Promise((resolve, reject) => {

        data.validQueryString.forEach(x => {
                if (x in data.queryString === false) msg = ` ${msg + x}, `
            })

            !_.isEmpty(msg) ? reject({
                "error": `missing query strings :${msg}`
            }) : resolve(data)

    })
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



export const findAll = (req, res) => {
    const page = req.query.page
    const limit = req.query.limit
    const bucket = req.query.bucket
    const image_tag = req.query.tag
    const owner_id = req.query.id

    gfs.collection(bucket)
    // gfs.collection( "fileType")

    // const fileOwner = {
    //     metadata: {
    //         owner: "5b61c8a8d0902c000414ccd6", req.headers.owner_id
    //         image_tag: "weee"
    //     }
    // }

    const fileOwner = {
        'metadata.owner': owner_id,
        'metadata.image_tag': new RegExp(image_tag, 'i'),
        'metadata.isDeleted': false
    }

    const cbFindFile = (err, files) => {
        err ? res.status(400).send(err) :
            res.json(PaginationService.paginate(files, page, limit))
    }

    // {
    //     'metadata.section': 'my-blog'
    //     'metadata.published': { '$lt': datetime.utcnow() } }

    gfs.files.find(fileOwner).toArray(cbFindFile)

}





//findByUser
//header file_type
//header user?