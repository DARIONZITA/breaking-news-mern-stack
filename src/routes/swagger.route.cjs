const router = require("express").Router();

const swaggerUiExpress = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");


router.use("/",swaggerUiExpress.serve)
router.get('/',swaggerUiExpress.setup(swaggerDocument))
module.exports = router
