import mongoose from 'mongoose'

let Address = mongoose.Schema({
    street:{
        type: String,
        require: true
    },
    barangay: {
        type: String,
        require: true
    },
    municipality: {
        type: String,
        require: true
    },
    province: {
        type: String,
        require: true
    }
},{ _id : false })
// mongoose.model(tableName, exportName)
export default Address