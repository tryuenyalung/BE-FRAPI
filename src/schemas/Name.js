import mongoose from 'mongoose'

const options = {
    _id : false 
}

const reqStr = {
    type: String,
    required: true
}

let Name = mongoose.Schema({

    first_name: reqStr,

    middle_name: reqStr,

    last_name: reqStr 

}, options)

export default Name