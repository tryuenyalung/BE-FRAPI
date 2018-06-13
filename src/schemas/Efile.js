import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'

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
const strNull = {
    type: String,
    default: null
}

let Efile = mongoose.Schema({

    name: reqStr,

    content: reqStr,

    recipient:{ type: Array },

    pending_recipient:{ type: Array },
    
    approved_recipient:{ type: Array },

    rejected_recipient: strNull,

    signatures: strNull,

    sender:{ type: Object },

    publish:{ 
        type: Boolean,
        default: false
    },

    private_doc:{ //true for private , false for public 
        type: Boolean
    },

    rejection_reason: strNull

}, { timestamps })

//adding pagination plugin for mongoose
Efile.plugin(mongoosePaginate)



// mongoose.model(documentName, exportName)
export default mongoose.model("efiles", Efile)