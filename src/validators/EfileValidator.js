import Joi from 'joi'

const postReqValidator = Joi.object().keys({
    name: Joi.string().required(),
    content: Joi.string().required(),
    recipient: Joi.array().required(),
    sender: Joi.object().required(),
    private_doc: Joi.boolean().required() 
})

export const postReqValidate =(req, res, next)=> {
    const err = Joi.validate(req.body, postReqValidator, {abortEarly: false} )
    err.error !== null ? res.status(422).send({errors: (err.error.details).map(x => x.message) }) : next()
}
