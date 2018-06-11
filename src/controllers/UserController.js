import Users from './../schemas/Users'
import bcrypt from 'bcrypt'

const saltRounds = 10

//create data
export const addUser =(req, res)=> {
    //check if username already exist
    Users.findOne( {username : req.body.username} , (err, userData) => {
        
        if(userData !== null){//check if the return data is empty
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

//search by query strings
export const searchQuery =(req, res)=> {

    if(req.query.gender){
        let searchObj = { gender: req.query.gender }
        let page = req.query.page
        findByQueryString(searchObj, page ,res)
    }
    else if(req.query.address){
        let searchObj = { address: new RegExp(req.query.address, 'i') }
        let page = req.query.page
        findByQueryString(searchObj, page ,res)
    }
    else if(req.query.status){// y = true , any character(but intercepted on validator, use n for false) = false
        let statusInput = false

        req.query.status === 'y' ? statusInput = true : statusInput = false 

        let searchObj = { status: statusInput }
        let page = req.query.page
        findByQueryString(searchObj, page ,res)
    }
    else if(req.query.department){
        let searchObj = { department: new RegExp(req.query.department, 'i') }
        let page = req.query.page
        findByQueryString(searchObj, page ,res)
    }
    else if(req.query.position){
        let searchObj = { position: new RegExp(req.query.position, 'i') }
        let page = req.query.page
        findByQueryString(searchObj, page ,res)
    }
    else if(req.query.dateOfBirth){
        let searchObj = { dateOfBirth: new RegExp(req.query.dateOfBirth, 'i') }
        let page = req.query.page
        findByQueryString(searchObj, page ,res)
    }
    else if(req.query.username){
        let searchObj = { username: new RegExp(req.query.username, 'i') }
        let page = req.query.page
        findByQueryString(searchObj, page ,res)
    }
    else if(req.query.name){
        let searchObj = {
                    $or: [ 
                        { 'name.first_name' : new RegExp(req.query.name, 'i' ) },
                        { 'name.last_name' : new RegExp(req.query.name, 'i' ) },
                        { 'name.middle_name' : new RegExp(req.query.name, 'i' ) }
                    ]
                }
        let page = req.query.page
        findByQueryString(searchObj, page ,res)
    }
    else{
        let searchObj = req.query
        let page = req.query.page
        findByQueryString(searchObj, page ,res)
    }
     
}//@end

//reusable method for searching query strings
const findByQueryString = (searchObj, pageInput, res)=>{
    Users.paginate( Users.find(searchObj), { page: pageInput, limit: 10 }, (err, data) =>{
        err ? res.status(500).send(err) : res.send(data) 
    })
}