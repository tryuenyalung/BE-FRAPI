import mongoose from 'mongoose'

let Name = mongoose.Schema({
    firstName:{
        type: String,
        require: true
    },
    middleName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    } 
},{ _id : false })
// mongoose.model(tableName, exportName)
export default Name