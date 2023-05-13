import {Router} from 'express'
import swaggerUiExpress from 'swagger-ui-express'
import swaggerDocument from '../../swagger.json' assert { type: "json"}
const route = Router()

route.use("/",swaggerUiExpress.serve)
route.get('/',swaggerUiExpress.setup(swaggerDocument))
export default route
