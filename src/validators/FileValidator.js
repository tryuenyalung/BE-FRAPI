import Joi from 'joi'

const updateSharedUserValidator = Joi.object().keys({
    filename: Joi.string().required(),
    bucket: Joi.string().required(),
    sharedUser: Joi.array().required()
})

export const validateUpdateSharedUser =(req, res, next)=> {
    const err = Joi.validate(req.body, updateSharedUserValidator, {abortEarly: false} )
    err.error !== null ? res.status(422).send({errors: (err.error.details).map(x => x.message) }) : next()
}
