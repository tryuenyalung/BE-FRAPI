import Users from './../schemas/Users'

//create data
export const addUser =(req, res)=> {
    Users.create(req.body, (err, data) => 
        (err) ? console.error(err) : res.status(201).send(data)
    )
}//@end

//read all data
export const findAllUsers =(req, res)=> {
    Users.find({}, (err, data) => err ? console.error(err) : res.send(data) ) 
}//@end


//read one data
export const findUserById =(req, res)=> {
    Users.findById(req.params.id).exec( (err, data) =>{
        if(err){
            res.status(500).send({message : `no data found at id : ${req.params.id}`})
            console.error(err)
        }else{
            (data !== null) ? res.send(data) :
            res.status(404).send( {code:404, status:"NOT FOUND", message:"no data found"} )
        }
    })
}//@end

//update one by id
export const updateUser =(req, res)=> {
    Users.findOneAndUpdate(
        { _id: req.params.id }, 
        { $set: [name, author, volume] = [req.body.name, req.body.author, req.body.volume] }, 
        { upsert: true },
        (err, data) => {
            err ? console.error(err) : res.send("success")
        })
}//@end

//delete one data by id
export const deleteUser =(req, res)=> {
    Users.findOneAndRemove(
        { _id: req.params.id }, 
        (err, data) =>{
            err ? console.error(err) : res.send("success")
        })
}//@end