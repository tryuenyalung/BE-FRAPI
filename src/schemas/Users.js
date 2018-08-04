import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'
import Name from './Name'
import keys from './../keys'

//adding createdAt and updatedAt field
const timestamps = {
    createdAt: 'created_at',
    updatedAt: 'update_at'
}

let Users = mongoose.Schema({

    username:  {
        type: String,
        required : [true, "User Schema: username is required"]
    },

    password: {
        type: String,
        required : [true, "User Schema: password is required"]
    },

    avatar:{
        type: String,
        default: null
    },

    name : Name,

    gender: {
        type: String,
        enum: {
            values: ['male', 'female'], 
            message: 'User Schema: gender must only be male or female'
        },
        required : [true, "User Schema: gender is required"]
    },

    dateOfBirth:  {
        type: String,
        required : [true, "User Schema: dateOfBirth is required"]
    },

    address:  {
        type: String,
        required : [true, "User Schema: address is required"]
    },

    department:  {
        type: String,
        required : [true, "User Schema: department is required"]
    },

    position:  {
        type: String,
        required : [true, "User Schema: position is required"]
    },

    signature: {
        type: String,
        required : [true, "User Schema: signature is required"]
    },

    status:{
        type: Boolean,
        default: false
    },

}, { timestamps })


//adding pagination plugin for mongoose
Users.plugin(mongoosePaginate)

// mongoose.model(documentName, exportName)
export default mongoose.model("users", Users)