import keys from './../keys'

const bucketList = keys.BUCKET_LIST

// export const validateFile =(req, res, next)=>{
//     let bucketName = getBucket(req.headers.bucket)
        
//     if(bucketName === null){
//         res.status(400).send(keys.NO_BUCKET_ERR_MSG) }
//     }else{
//         next()
//     }
// }

export const validateFile =(req, res, next)=> {
    let bucketName = getBucket(req.headers.bucket)

    bucketName !== null ? next() :
        res.status(400).send(keys.NO_BUCKET_ERR_MSG) 
    
}//@end

export const sendResponse =(req,res)=>{
    res.json({file: req.file})
}

// check the file extension and the bucket for it
const getBucket =(bucketFromHeader)=> {
    let bucket = bucketList[bucketFromHeader]
    return bucket ? bucket : null
}

  