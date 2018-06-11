import expressValidator from 'express-validator'

//using version 3, w/c legacy
export default (app) => {
    app.use( expressValidator() )
}
