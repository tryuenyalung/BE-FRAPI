import Efile from './../schemas/Efile'


//create efile
export const createEfile =(req, res)=> {

    Efile.create(req.body, (err, data) => 
        err ? res.status(422).send(err) : res.status(201).send(data)
    )
    
}//@end

//read all data
export const findAllEfiles =(req, res)=> {
    //exclude content
    Efile.find({}, '-content', (err, data) => err ? res.status(500).send(err) : res.send(data) ) 
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

//delete one data by id
export const deleteEfile =(req, res)=> {
    Efile.findOneAndRemove({ _id: req.params.id },(err, data) =>{
        err ? res.status(404).send( {message : `no user found at id : ${req.params.id}`} ) 
        : res.status(200).send( {message : `user deleted at id : ${req.params.id}`} )
    })
}//@end

