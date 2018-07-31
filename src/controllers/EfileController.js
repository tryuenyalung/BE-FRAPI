import Efile from './../schemas/Efile'
import _ from 'lodash'

//create efile
export const createEfile =(req, res)=> {
    let body = req.body
    //copy the values of recipient to pending recipients
    body = Object.assign( body, {pending_recipient : req.body.recipient} )

    Efile.create(body, (err, data) => 
        err ? res.status(422).send(err) : res.status(201).send(data)
    )
    
}//@end

//read all data
export const findAllEfiles =(req, res)=> {
    //exclude content
    Efile.find({}, '-content', (err, data) => err ? res.status(500).send(err) : res.send(data) ) 
}//@end

//read all data
export const findAllPendingEfileById =(req, res)=> {
    //search all pending efile that a specific user has by id, disregard content
    const searchObj = {
        "pending_recipient.0.id" :  req.params.userId,
        $where: "this.rejected_recipient ===  null"
    } 
    let pageInput = req.query.page
    paginatedSearch(searchObj, pageInput, res)
}//@end

//read all data
export const findAllPublicPublishedEfile =(req, res)=> {
    const efileName = req.query.name
    const sender = req.query.sender
    const recipient = req.query.recipient
    const createdAt = req.query.createdAt
   
    // _.isEmpty(createdAt) ? createdAt = null : createdAt = new Date( req.query.createdAt ).toISOString() 

    let searchObj = {
        private_doc : false, 
        publish: true,
        name: new RegExp( efileName, 'i'),
        'recipient.name': new RegExp( recipient, 'i'),
        'sender.name': new RegExp( sender, 'i'),
        // created_at: new RegExp( createdAt, 'i'),
    }

    // if createdAt not empty add search to db
    if( !_.isEmpty(createdAt) ) {
        searchObj  = { ...searchObj , ...{ created_at: { $gte: new Date( req.query.createdAt ).toISOString()  } } }
    }  
  
    console.log(searchObj)
    

    const pageInput = req.query.page
    // Object.keys(searchObj).forEach((key) => (searchObj[key] == null) && delete searchObj[key])
    paginatedSearch(searchObj, pageInput, res)
}//@end

//read all data
export const findAllRejectedEfileByUserId =(req, res)=> {
    const user_id = req.params.userId
    // find all rejected efiles where the sender is you
    const searchObj = {
        'sender.id': user_id, 
        $where: "this.rejected_recipient !==  null"
    }
    const pageInput = req.query.page
    paginatedSearch(searchObj, pageInput, res)
}//@end

//read all data
export const findAllPrivatePublishedEfileByUserId =(req, res)=> {
    const user_id = req.params.userId
    const pageInput = req.query.page
    const efileName = req.query.name
    const sender = req.query.sender
    const recipient = req.query.recipient
    const createdAt = req.query.createdAt

    // const searchName = req.query.name

    let searchObj ={//find all private efile that has been published that you have access
        private_doc: true,//it is a private doc
        publish: true,// it is published
        name: new RegExp( efileName, 'i'),
        'recipient.name': new RegExp( recipient, 'i'),
        'sender.name': new RegExp( sender, 'i'),
        
        //should get all the published private efile if the user is either the sender or recipient
        $or: [
            { 
                recipient: { 
                    $elemMatch:{
                        //any record on arrays of object containing the id will be displayed
                        id : user_id
                    }
                } 
            },
            
            
            {//check if the sender is you
                'sender.id': user_id
            } 
        ],//or
        
    }//sender object

    // if createdAt not empty add search to db
    if( !_.isEmpty(createdAt) ) {
        searchObj  = { ...searchObj , ...{ created_at: { $gte: new Date( req.query.createdAt ).toISOString()  } } }
    }  
    
    paginatedSearch(searchObj, pageInput, res)
}//@end

//get efile list with pagination
export const paginatedEfile =(req, res, next)=> {
    if( isNaN(req.query.page) ){ 
        next() 
    }else{
        Efile.paginate( Efile.find({}, '-content') ,{ page: req.query.page, limit: 10 }, (err, data) =>{
            err ? res.status(500).send(err) : res.send(data) 
        })
    }
}//@end

//read one data
export const findEfileById =(req, res)=> {
    const id = req.params.efileId
    Efile.findById(id).exec( (err, data) =>{
        if(err){
            res.status(500).send({message : `no user found at id : ${id}`})
        }else{
            (data !== null) ? res.send(data) :
            res.status(404).send( {message : `no user found at id : ${id}`} )
        }
    })
}//@end

//update one by id
export const updateEfile =(req, res)=> {
    const id = req.params.efileId

    Efile.findById(id, (err, data) =>{//fetch the data from id
        if(err){
            res.status(404).send( {message : `no user found at id : ${req.params.id}`} )
        }else{
            const body = Object.assign( data, req.body )//overwrite the data 
            body.save( (err, data) =>  err ? res.send(err) : res.send(data) )//update the data from db
        }//else

    })
    
}//@end

//approve efile
//this needs to be refactor
export const approveEfile =(req, res)=> {
    const id = req.params.efileId
   

    const cbApproveEfile = (err, data) =>{//fetch the data from id
        if(err){
            res.status(404).send( {message : `no efile found at id : ${req.params.id}`} )
        }else{
            if(!data.pending_recipient.length){//check if no more pending recipients
                res.status(400).send({message: `efile : ${id} , was already published`})
            }else{
                
                let pending_recipient = data.pending_recipient
                let approved_recipient = data.approved_recipient
                
                const approve_user_details = req.body
                


                //remove the first recipient of the pending recipient to be transfer to approve recipient
                let approve_user = pending_recipient.shift()
                //get the old signature
                let signatures = data.signatures
                //append another signature

                // signatures += escape(`<span>
                //                         <div style='display:inline-block !important; text-align:center !important; padding-left:10px !important; padding-right:10px !important;'>
                //                         <img src='${approve_user_details.signature}' width='150'>
                //                         <br> ${approve_user_details.name.first_name} ${approve_user_details.name.middle_name} ${approve_user_details.name.last_name} <br>
                //                         ${approve_user_details.position}
                //                         </div>
                //                         <span>`)

                signatures.push({ // append signature to the existing signature
                    name: `${approve_user_details.name.first_name} ${approve_user_details.name.middle_name} ${approve_user_details.name.last_name}`,
                    signature: `${approve_user_details.signature}`,
                    position: `${approve_user_details.position}`
                })
 

                //add the recipient who approved the efile to the approved recipient
                approved_recipient.push(approve_user)

                let updated_recipients = {
                    approved_recipient : approved_recipient,
                    pending_recipient : pending_recipient,
                    signatures: signatures
                }
    
                //check if pending recipients is empty
                if(!pending_recipient.length){
                    //make the efile publish if no more pending recipients


                    // let content = unescape(data.content)
                    // // remove the </body> </html> on the end to append the signature
                    // content = content.substring(0, content.length - 20)
                    // // insert the signature at the end and add </body> </html>
                    // content = ` ${content}  <div style='text-align: center !important'> ${unescape(updated_recipients.signatures)}</div></body></html>`

                    // let updatedContentWithSignature = escape(content)
                    // // let updatedContentWithSignature = content

                    // const publishedEfile = Object.assign( updated_recipients, {content: updatedContentWithSignature, publish : true} )
                    // const body = Object.assign( data, publishedEfile )

                    const publishedEfile = Object.assign( updated_recipients, {publish : true} )
                    const body = Object.assign( data, publishedEfile )
                    //update efile content here 

                    

                    body.save( (err, data) =>  err ? res.send(err) : res.send(data) )//update the data from db
                }else{//just update the pending & approved recipients
                    const body = Object.assign( data, updated_recipients )//overwrite the data 
                    body.save( (err, data) =>  err ? res.send(err) : res.send(data) )//update the data from db
                }//else
                
            }//else
    
        }//else
    
    }//cbApproveEfile

    Efile.findById(id, cbApproveEfile)   
}//@end


//delete one data by id
export const deleteEfile =(req, res)=> {
    const id = req.params.efileId
    Efile.findOneAndRemove({ _id: id },(err, data) =>{
        err ? res.status(404).send( {message : `no user found at id : ${id}`} ) 
        : res.status(200).send( {message : `user deleted at id : ${id}`} )
    })
}//@end




//////////////////
//reusable method for searching query strings
const paginatedSearch = (searchObj, pageInput=1, res)=>{
    Efile.paginate( Efile.find(searchObj, '-content'), { page: pageInput, limit: 10 }, (err, data) =>{
        err ? res.status(500).send(err) : res.send(data) 
    })
}

 
