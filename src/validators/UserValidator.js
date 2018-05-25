import mongoose from 'mongoose'

export const validateObjectId =(req, res, next)=> {
    req.checkParams('id', `id must an object id!`).isMongoId()
    let errors = req.validationErrors()
    errors ? res.send({ "errors": errors.map(x => x.msg) }) : next()
}//@end

export const validateUsers =(req, res, next)=> {
    req.checkBody('name.firstName', 'first name is required').notEmpty()
    req.checkBody('name.middleName', 'middle name is required').notEmpty()
    req.checkBody('name.lastName', 'last name is required').notEmpty()

    req.checkBody('gender', 'use male / female only').isIn(['male', 'female'])

    req.checkBody('dateOfBirth', 'date of birth is required').notEmpty()
    // req.checkBody('dateofbirth', 'must be a valid date').isDate()
    
    req.checkBody('address.street', 'street is required').notEmpty()
    req.checkBody('address.barangay', 'barangay is required').notEmpty()
    req.checkBody('address.municipality', 'municipality is required').notEmpty()
    req.checkBody('address.province', 'province is required').notEmpty()
    
    let errors = req.validationErrors()
    errors ? res.send({ "errors": errors.map(x =>  `{${x.param} : ${x.msg}}` ) }) : next()
}//@end