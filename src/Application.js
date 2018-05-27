import express from 'express' 
import keys from './keys';
import AppServer from './configs/AppServer'
import ExpressValidator from './configs/ExpressValidator'
import BodyParser from './configs/BodyParser'
import MongoDB from './configs/MongoDB'
import Routes from './routes/Routes'


const app = express()

    MongoDB()
    AppServer(app)
    ExpressValidator(app)
    BodyParser(app)
    Routes(app)
    
app.get('*', (req, res) => res.status(404).send(keys.ERR_MSG) )

