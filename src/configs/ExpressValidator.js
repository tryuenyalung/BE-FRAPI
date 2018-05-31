import expressValidator from 'express-validator'

export default (app) => {
    app.use( expressValidator() )
}
