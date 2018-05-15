import expressValidator from 'express-validator'

export default class ExpressValidator{

    constructor(app){
        app.use( expressValidator() )
    }
    
}