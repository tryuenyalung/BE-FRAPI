import UserRoute from './UserRoute'
import FileRoute from './FileRoute'

export default (app) =>  {
    app.use("/api/v1/users", UserRoute)
    app.use("/api/v1/files", FileRoute)
}
 