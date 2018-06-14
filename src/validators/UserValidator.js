import Joi from 'joi'

const postReqValidator = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
    name: {
        first_name : Joi.string().required(),
        middle_name : Joi.string().required(),
        last_name : Joi.string().required()
    },
    gender: Joi.string().valid('male', 'female').required(),
    dateOfBirth: Joi.string().required(),
    address: Joi.string().required(),
    department: Joi.string().required(),
    position: Joi.string().required(),
    signature: Joi.string().required()
})


export const validateUsers =(req, res, next)=> {
    let err = Joi.validate(req.body, postReqValidator, {abortEarly: false} )
    // {errors: (err.error.details).map(x => x.message) }
    err.error !== null ? res.status(422).send({errors: (err.error.details).map(x => x.message) }) : next()
}//@end


export const validateQueryString =(req, res, next)=> {
    //checking query strings, all are not required
    if(req.query.gender){
        const err = Joi.validate(req.query.gender, Joi.string().valid('male', 'female').error(Error("gender must be either male or female only")) )
        err.error !== null ? res.status(422).send({errors: err.error.message }) : next()
    }
    else if(req.query.name){
        const err = Joi.validate(req.query.name, Joi.string())
        err.error !== null ? res.status(422).send({errors: err.error.message }) : next()
    }
   else if(req.query.status){
        const err = Joi.validate(req.query.status, Joi.string().valid('y', 'n').error(Error("status must be either y(true) or n(false) only")) )
        err.error !== null ? res.status(422).send({errors: err.error.message }) : next()
    }else{
        next()
    }

}//@end
