import keys from './../application_properties.json'

export default class Server {
    
    constructor(app) {
        const PORT = keys.PORT
        app.listen(PORT, () =>  console.log(`${new Date().toLocaleString()} server : started at port ${PORT}`) )
    }
    
}
