import UserRoute from './UserRoute'

export default (app) =>  {
    app.use("/api/v1/users", UserRoute)
}
 