export default {

    "LOCAL_PORT": 4000,

    "SECRET": "10bjklnasldknoai0981y2laskdn",
    "USERS_DB": "mongodb://root:admin1@ds113522.mlab.com:13522/frepo",

    "DEFAULT_AVATAR" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF1zJt89f-BE-BEriCrVlTfXhOKdTnVzo-CdfbL4S9aC4gzA03",
    
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

    "NO_BUCKET_ERR_MSG" : {
        code: 400,
        status:"BAD REQUEST", 
        message:"please specify a bucket for file retrieval"
    },

    "BUCKET_LIST": {
        "signature": "bucket_signature",
        "image": "bucket_image"
    },

    "BUCKET": {
        "PROFILE": "profile",
        "IMAGE": "image",
        "SIGNATURE": "signature",
        "DOCUMENT": "document",
        "SPREADSHEET": "spreadsheet",
        "PRESENTATION": "presentation",
        "PDF": "pdf"
    },
    
    "FILE_EXT_LIST": {
        ".jpg": "images",
        ".png": "images"
    }
}



// "BUCKET_LIST": {
//     "image/jpeg": "images",
//     "image/png": "images"
// },
// "USERS_DB": "mongodb://root:root@ds149134.mlab.com:49134/mydb",
