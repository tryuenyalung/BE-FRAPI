import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'


//adding createdAt and updatedAt field
const timestamps = {
    createdAt: 'created_at',
    updatedAt: 'update_at'
}

let FileTags = mongoose.Schema({

    file_tag:  {
        type: String,
        required : [true, "FileTag Schema: file_tag is required"]
    },
   
}, { timestamps })


//adding pagination plugin for mongoose
FileTags.plugin(mongoosePaginate)

// mongoose.model(documentName, exportName)
export default mongoose.model("file_tags", FileTags)