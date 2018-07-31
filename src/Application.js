import express from 'express' 
import cors from 'cors'
import keys from './keys';
import AppServer from './configs/AppServer'
import BodyParser from './configs/BodyParser'
import MongoDB from './configs/MongoDB'
import Routes from './routes/Routes'


const app = express()

app.use( cors() )
    // app.use ((req, res, next) => {
    //     res.header("Access-Control-Allow-Origin", "*");
    //     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //     next();
    // });

    // app.use( (req, res, next) => {
    //     // res.header("Access-Control-Allow-Origin", "*")
    //     // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, meta")
    //     res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, meta")
    //     res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
        
    //     // res.header("Access-Control-Allow-Origin", "*");
    //     // res.header("Access-Control-Allow-Credentials", "true");
    //     // res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    //     // res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    
    //     next()
    // })

    MongoDB()
    AppServer(app)
    BodyParser(app)
    Routes(app)
    
    
    app.get('*', (req, res) => res.status(404).send(keys.ERR_MSG) )

