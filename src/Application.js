import express from 'express' 
import keys from './keys';
import AppServer from './configs/AppServer'
import BodyParser from './configs/BodyParser'
import MongoDB from './configs/MongoDB'
import Routes from './routes/Routes'


const app = express()

    app.use ((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    MongoDB()
    AppServer(app)
    BodyParser(app)
    Routes(app)
    
    
app.get('*', (req, res) => res.status(404).send(keys.ERR_MSG) )

