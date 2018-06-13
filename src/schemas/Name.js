import mongoose from 'mongoose'

const options = {
    _id : false 
}

let Name = mongoose.Schema({

    first_name: {
        type: String,
        required : [true, "User Schema: first_name is required"]
    },

    middle_name: {
        type: String,
        required : [true, "User Schema: middlea_name is required"]
    },

    last_name: {
        type: String,
        required : [true, "User Schema: last_name is required"]
    }

}, options)

export default Name