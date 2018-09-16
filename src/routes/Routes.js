import UserRoute from './UserRoute'
import FileRoute from './FileRoute'
import EfileRoute from './EfileRoute'
import FileTagRoute from './FileTagRoute'

export default (app) =>  {
    app.use("/api/v1/users", UserRoute)
    app.use("/api/v1/files", FileRoute)
    app.use("/api/v1/efiles", EfileRoute)
    app.use("/api/v1/fileTag", FileTagRoute)
}
 