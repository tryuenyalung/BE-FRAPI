import mongoose from 'mongoose'
import  Name from './Name'
import  Address from './Address'

let Users = mongoose.Schema({
    name : Name,
    gender:{
        type: String,
        require: true
    },
    dateOfBirth: {
        type: String,
        require: true
    },
    address: Address
})
// mongoose.model(documentName, exportName)
export default mongoose.model("users", Users)