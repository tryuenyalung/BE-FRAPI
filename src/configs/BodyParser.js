import bodyParser from 'body-parser';

export default class BodyParser {

    constructor(app) {
        app.use( bodyParser.json() )
        app.use( bodyParser.urlencoded( {extended: true} ) )
    }
    
}
