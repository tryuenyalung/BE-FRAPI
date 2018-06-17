export default {

    "LOCAL_PORT": 5000,

    "SECRET": "10bjklnasldknoai0981y2laskdn",

    "USERS_DB": "mongodb://root:root@ds149134.mlab.com:49134/mydb",

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

    "BUCKET_LIST": {
        "image/jpeg": "images",
        "image/png": "images"
    },
    
    "FILE_EXT_LIST": {
        ".jpg": "images",
        ".png": "images"
    }
}