import express from 'express' 
import Server from './configs/Server'
import ExpressValidator from './configs/ExpressValidator'
import BodyParser from './configs/BodyParser'

const app = express()

new Server(app)
new ExpressValidator(app)
new BodyParser(app)