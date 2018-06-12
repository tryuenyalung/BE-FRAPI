import Joi from 'joi';

Joi.objectId = require('joi-objectid')(Joi)

export const validateObjectId =(req, res, next)=> {
    const err = Joi.validate(req.params.id, Joi.objectId().error(Error("invalid object id")) )
    err.error !== null ? res.status(422).send({errors: err.error.message }) : next()
}//@end