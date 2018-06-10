import Users from './../schemas/Users'
import bcrypt from 'bcrypt'

const saltRounds = 10


//create data
export const addUser =(req, res)=> {
    //check if username already exist
    Users.findOne( {username : req.body.username} , (err, userData) => {
        
        if(userData !== {}){//check if the return data is empty
            res.send({message : `username: ${req.body.username} already exist`})
        }else{
            //hash the password 
            bcrypt.hash(req.body.password, saltRounds).then( (hashedPassword) => {
                //update the password the req.body
                let userData = Object.assign( req.body, {password: hashedPassword} )

                Users.create(userData, (err, data) => 
                    err ? res.status(422).send(err) : res.status(201).send(data)
                )
            })//bcrypt

        }//else

    })//findOne
    
}//@end

//get user list with pagination
export const paginatedUser =(req, res, next)=> {
    if( isNaN(req.query.page) ){ 
        next() 
    }else{
        Users.paginate({}, { page: req.query.page, limit: 10 }, (err, data) =>{
            err ? res.status(500).send(err) : res.send(data) 
        })
    }
    
}//@end


//read all data
export const findAllUsers =(req, res)=> {
    Users.find({}, (err, data) => err ? res.status(500).send(err) : res.send(data) ) 
}//@end


//read one data
export const findUserById =(req, res)=> {
    Users.findById(req.params.id).exec( (err, data) =>{
        if(err){
            res.status(500).send({message : `no user found at id : ${req.params.id}`})
        }else{
            (data !== null) ? res.send(data) :
            res.status(404).send( {message : `no user found at id : ${req.params.id}`} )
        }
    })
}//@end

//update one by id
export const updateUser =(req, res)=> {
    const id = req.params.id;

    Users.findById(id, (err, data) =>{//fetch the data from id
        if(err){
            res.status(404).send( {message : `no user found at id : ${req.params.id}`} )
        }else{
            const body = Object.assign( data, req.body )//overwrite the data 
            body.save( (err, data) =>  err ? res.send(err) : res.send(data) )//update the data from db
        }//else

    })
    
}//@end

//delete one data by id
export const deleteUser =(req, res)=> {
    Users.findOneAndRemove({ _id: req.params.id },(err, data) =>{
            err ? res.status(404).send( {message : `no user found at id : ${req.params.id}`} ) 
            : res.status(200).send( {message : `user deleted at id : ${req.params.id}`} )
    })
}//@end