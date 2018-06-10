import Users from './../schemas/Users'
import bcrypt from 'bcrypt'

//authenticate user
export const authUser =(req, res)=> {

    //findOne by username
    Users.findOne( {username : req.body.username} , (err, userData) => {

       if(err){
        res.status(404).send(err)
       }else{

            if(!userData.status){//check if status is active
                res.status(401).send({message: "your account is registered, but we still need approval of the admin, please contact your system administrator"})
            }else{
                //check if password matches
                bcrypt.compare(req.body.password, userData.password).then( (isPasswordValid) => {
                    isPasswordValid ? res.status(200).send("valid user") : res.status(401).send("invalid user")
                })
            }

       }//else

    })//findOne

}//@end