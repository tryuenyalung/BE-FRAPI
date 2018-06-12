import Efile from './../schemas/Efile'


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
    //search all pending efile that a specific user has, disregard content
    const searchObj = { "pending_recipient.0.id" :  req.params.id } 
    let pageInput = req.query.page
    paginatedSearch(searchObj, pageInput, res)
}//@end

//read all data
export const findAllPublicPublishedEfile =(req, res)=> {
    Efile.paginate( Efile.find({private_doc : false, publish: true}, '-content') ,{ page: req.query.page, limit: 10 }, (err, data) =>{
        err ? res.status(500).send(err) : res.send(data) 
    })
}//@end

//read all data
export const findAllPrivatePublishedEfile =(req, res)=> {
    const user_id = req.params.userId
    const pageInput = req.query.page
    
    const searchObj ={//find all private efile that has been published that you have access
        private_doc: true,
        publish: true,
        recipient :{
            $elemMatch:{//any record on arrays of object containing the id will be displayed
                id : user_id
            }
        },
        sender:{
            id : user_id
        }
        //put sender object
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
    Efile.findById(req.params.id).exec( (err, data) =>{
        if(err){
            res.status(500).send({message : `no user found at id : ${req.params.id}`})
        }else{
            (data !== null) ? res.send(data) :
            res.status(404).send( {message : `no user found at id : ${req.params.id}`} )
        }
    })
}//@end

//update one by id
export const updateEfile =(req, res)=> {
    const id = req.params.id

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
export const approveEfile =(req, res)=> {
    const id = req.params.id
    
 
    
    Efile.findById(id, (err, data) =>{//fetch the data from id
        if(err){
            res.status(404).send( {message : `no efile found at id : ${req.params.id}`} )
        }else{
            if(!data.pending_recipient.length){//check if no more pending recipients
                res.status(400).send({message: `efile : ${id} , was already published`})
            }else{
                let pending_recipient = data.pending_recipient
                let approved_recipient = data.approved_recipient
    
                
                //remove the first recipient to be transfer to approve recipient
                let approve_user = pending_recipient.shift()
                //add the recipient who approved the efile to the approved recipient
                approved_recipient.push(approve_user)
    
                let updated_recipients = {
                    approved_recipient : approved_recipient,
                    pending_recipient : pending_recipient
                }
    
                //check if pending recipients is empty
                if(!pending_recipient.length){
                    //make the efile publish if no more pending recipients
                    const publishedEfile = Object.assign( updated_recipients, {publish : true} )
                    const body = Object.assign( data, publishedEfile )

                    //update efile content here 

                    body.save( (err, data) =>  err ? res.send(err) : res.send(data) )//update the data from db
                }else{//just update the pending & approved recipients
                    const body = Object.assign( data, updated_recipients )//overwrite the data 
                    body.save( (err, data) =>  err ? res.send(err) : res.send(data) )//update the data from db
                }//else
            }
    
            
    
            
        }//else
    
    }

)
}//@end


//delete one data by id
export const deleteEfile =(req, res)=> {
    Efile.findOneAndRemove({ _id: req.params.id },(err, data) =>{
        err ? res.status(404).send( {message : `no user found at id : ${req.params.id}`} ) 
        : res.status(200).send( {message : `user deleted at id : ${req.params.id}`} )
    })
}//@end




//////////////////
//reusable method for searching query strings
const paginatedSearch = (searchObj, pageInput=1, res)=>{
    Efile.paginate( Efile.find(searchObj, '-content'), { page: pageInput, limit: 10 }, (err, data) =>{
        err ? res.status(500).send(err) : res.send(data) 
    })
}

 
