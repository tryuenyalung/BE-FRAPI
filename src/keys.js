export default {

    "LOCAL_PORT": 5000,

    "USERS_DB": "mongodb://root:root@ds149134.mlab.com:49134/mydb",

    "ERR_MSG" : {
        code: 404,
        status:"NOT FOUND", 
        message:"no explicit mapping for this url"
    },

    "FILE_ERR_MSG" : {
        code: 404,
        status:"NOT FOUND", 
        message:"cannot find file"
    },

    "BUCKET_LIST": {
        "image/jpeg": "images",
        "image/png": "images"
    },
    
    "FILE_EXT_LIST": {
        ".jpg": "images",
        ".png": "images"
    }
}