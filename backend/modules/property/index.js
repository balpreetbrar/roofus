/**
 * Created by Angad on 25 January 2023
 */

'use strict';

const propertyValidator                 = require("./validators/propertyValidator");
const propertyController                = require("./controllers/propertyController");

const userAuth                          = require("../../validators/authValidator").authenticateUser;

router.post("/property/create", propertyValidator.create,   userAuth,   propertyController.create);
router.get("/property/list",    propertyValidator.fetch,    userAuth,   propertyController.list);
router.get("/property/details", propertyValidator.details,  userAuth,   propertyController.details);
router.put("/property/update",  propertyValidator.update,   userAuth,   propertyController.update);
router.put("/property/remove",  propertyValidator.remove,   userAuth,   propertyController.remove);