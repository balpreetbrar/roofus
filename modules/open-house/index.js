/**
 * Created by Angad on 25 January 2023
 */

'use strict';

const openHouseValidator              = require('./validators/openHouseValidator');
const openHouseController             = require('./controllers/openHouseController');

const userAuth                        = require('../../validators/authValidator').authenticateUser;

router.post("/openHouse/create",  openHouseValidator.create,  userAuth, openHouseController.create);
router.get("/openHouse/list",     openHouseValidator.list,    userAuth, openHouseController.list);
router.get("/openHouse/details",  openHouseValidator.details, userAuth, openHouseController.details);
router.put("/openHouse/update",   openHouseValidator.update,  userAuth, openHouseController.update);
router.put("/openHouse/remove",   openHouseValidator.remove,  userAuth, openHouseController.remove);

router.post("/openHouse/enroll",  openHouseValidator.enroll,  userAuth, openHouseController.enroll);