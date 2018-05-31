import bodyParser from 'body-parser';

export default (app) => {
    app.use( bodyParser.json({limit: '50mb'}) )
    app.use( bodyParser.urlencoded( {extended: true, limit: '50mb'} ) )
}