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
                    //destructure userData, exclude some fields
                    const { password, created_at, update_at, __v, ...user} = userData._doc
                    
                    const dataForLocalStorage = {
                        token: token,
                        user: user
                    }
                    res.send(dataForLocalStorage)
                }//cbSendToken

                const cbCheckPassword =(err, isPasswordValid) => {// check if password valid and send token
                    !isPasswordValid ? res.status(401).send({errors : "invalid password"}) 
                    :jwt.sign( {id : userData._id} , keys.SECRET, { expiresIn: '30s' }, cbSendToken)
                }
                
                //check if password matches
                bcrypt.compare(req.body.password, userData.password, cbCheckPassword)
             }
        }//else
        
    }//cbGetUser

    //findOne by username
    Users.findOne(username, cbGetUser)//findOne
}//@end

export const verifyToken = (req, res, next) =>  {
    const bearerHeader = req.headers['Authorization']

    if(bearerHeader !== undefined){
        const bearerToken = bearerHeader.split(' ')//split the Bearer and token
        const token = bearerToken[1]// get the token on (Bearer token12eiuasd8)

        const cbDecodeToken = (err, decoded) => {
            // if token is doesn't have error and its not undefined
            !err || decoded !== undefined ?  next() : res.status(401).send({errors: err})
        }

        jwt.verify(token, keys.SECRET, cbDecodeToken)

    }else{
        res.status(401).send({message: "Not Authorized!"})
    }
}//@end

 
