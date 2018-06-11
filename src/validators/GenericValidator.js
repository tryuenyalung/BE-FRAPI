export const validateObjectId =(req, res, next)=> {
    req.checkParams(req.params.id, `id must an object id!`).isMongoId()
    let errors = req.validationErrors()
    errors ? res.send({ "errors": errors.map(x => x.msg) }) : next()
}//@end