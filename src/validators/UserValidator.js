
export const validateObjectId =(req, res, next)=> {
    req.checkParams(req.params.id, `id must an object id!`).isMongoId()
    let errors = req.validationErrors()
    errors ? res.send({ "errors": errors.map(x => x.msg) }) : next()
}//@end

export const validateUsers =(req, res, next)=> {
    req.checkBody('username', 'username is required').notEmpty()
    req.checkBody('password', 'password is required').notEmpty()

    req.checkBody('name.first_name', 'first name is required').notEmpty()
    req.checkBody('name.middle_name', 'middle name is required').notEmpty()
    req.checkBody('name.last_name', 'last name is required').notEmpty()

    req.checkBody('gender', 'use male / female only').isIn(['male', 'female'])

    req.checkBody('dateOfBirth', 'date of birth is required').notEmpty()
    // req.checkBody('dateofbirth', 'must be a valid date').isDate()
    
    req.checkBody('address', 'address is required').notEmpty()
    req.checkBody('department', 'department is required').notEmpty()
    req.checkBody('position', 'position is required').notEmpty()

    
    let errors = req.validationErrors()
    errors ? res.status(422).send({ "errors": errors.map(x =>  `{${x.param} : ${x.msg}}` ) }) : next()
}//@end


export const validateQueryString =(req, res, next)=> {
    //checking query strings, all are not required
    if(req.query.gender){
        req.checkQuery('gender', 'use male or female only').isIn(['male', 'female'])
    }
    if(req.query.name){
        req.checkQuery('name', 'theres no name with numeric value').isAlpha()
    }
    if(req.query.status){
        req.checkQuery('status', 'use \'y\' for true and \'n\' for false').isIn(['y', 'n'])
    }

    let errors = req.validationErrors()
    errors ? res.status(422).send({ "errors": errors.map(x =>  `{\'${x.param}\' : \'${x.msg}\' } ` ) }) : next()

}//@end
