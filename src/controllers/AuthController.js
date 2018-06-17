import Users from './../schemas/Users'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import keys from './../keys'

//authenticate user
export const authUser =(req, res)=> {
    const username = {username : req.body.username}

    const cbGetUser =(err, userData)=> {
        if(err){
         res.status(404).send({errors: err})
        }else if(userData === null){//check if no user match the credentials
         res.status(401).send({errors: "no record found in database"})
        }else{
            
             if(!userData.status){//check if status is active
                 res.status(401).send({errors: "your account is registered, but we still need approval of the admin, please contact your system administrator"})
             }else{
                
                 const cbSendToken =(err, token)=> {//send token
                    const dataForLocalStorage= {
                        token: token,
                        user: userData
                    }
                    res.send(dataForLocalStorage)
                }//cbSendToken

                const cbCheckPassword =(err, isPasswordValid) => {// check if password valid and send token
                    !isPasswordValid ? res.status(401).send({errors : "invalid password"}) 
                    :jwt.sign( {id : userData._id} , keys.SECRET, cbSendToken)
                }
                
                //check if password matches
                bcrypt.compare(req.body.password, userData.password, cbCheckPassword)
             }
        }//else
        
    }//cbGetUser

    //findOne by username
    Users.findOne(username, cbGetUser)//findOne



 
 

  

}//@end
 
