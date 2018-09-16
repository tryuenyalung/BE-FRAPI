import FileTag from './../schemas/FileTag'
import _ from 'lodash'

//create efile
export const addFileTag = (req, res) => {


    let body = {
        file_tag: req.body.file_tag
    }

    FileTag.create(body, (err, data) =>
        err ? res.status(422).send(err) : res.status(201).send(data)
    )

} //@end


//read all data
export const findAllFileTags =(req, res)=> {
    //exclude content
    FileTag.find({}, '-content', (err, data) => err ? res.status(500).send(err) : res.send(data) ) 
}//@end