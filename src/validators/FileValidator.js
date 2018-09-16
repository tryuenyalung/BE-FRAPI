import Joi from 'joi'

const updateFileValidator = Joi.object().keys({
    filename: Joi.string().required(),
    bucket: Joi.string().required(),
    name: Joi.string().required(),
    tag: Joi.string().required(),
    sharedUser: Joi.array().required()
})

export const validateFileUpdate =(req, res, next)=> {
    const err = Joi.validate(req.body, updateFileValidator, {abortEarly: false} )
    err.error !== null ? res.status(422).send({errors: (err.error.details).map(x => x.message) }) : next()
}
