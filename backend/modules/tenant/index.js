/**
 * Created by Angad on 25 January 2023
 */

const tenantValidator                 = require('./validators/tenantValidator');
const tenantController                = require('./controllers/tenantController');

const userAuth                        = require('../../validators/authValidator').authenticateUser;

router.post("/tenant/create", tenantValidator.create, userAuth, tenantController.create);
router.get("/tenant/list",    tenantValidator.list,   userAuth, tenantController.list);
router.get("/tenant/details", tenantValidator.fetch,  userAuth, tenantController.fetch);
router.put("/tenant/update",  tenantValidator.update, userAuth, tenantController.update);
router.put("/tenant/remove",  tenantValidator.remove, userAuth, tenantController.remove);