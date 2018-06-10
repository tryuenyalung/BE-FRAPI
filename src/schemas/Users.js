import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'
import Name from './Name'
import keys from './../keys'

//adding createdAt and updatedAt field
const timestamps = {
    createdAt: 'created_at',
    updatedAt: 'update_at'
}

//required string
const reqStr = {
    type: String,
    required: true
}

let Users = mongoose.Schema({

    username: reqStr,

    password: reqStr,

    avatar:{
        type: String,
        default: keys.DEFAULT_AVATAR
    },

    name : Name,

    gender: reqStr,

    dateOfBirth: reqStr,

    address: reqStr,

    department: reqStr,

    position: reqStr,

    signature: reqStr,

    status:{
        type: Boolean,
        default: false
    },

}, { timestamps })

//adding pagination plugin for mongoose
Users.plugin(mongoosePaginate)

// mongoose.model(documentName, exportName)
export default mongoose.model("users", Users)