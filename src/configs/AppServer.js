import keys from './../keys'


export default (app) =>  {
    const PORT = process.env.PORT || keys.LOCAL_PORT
    app.listen(PORT, () =>  console.log(`${new Date().toLocaleString()} server : started at port ${PORT}`) )
}

