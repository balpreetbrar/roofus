/**
 * Created by Angad on 24 January 2023
 */

'use strict';

const onboardValidator                = require('./validators/onboardValidator');
const onboardController               = require('./controllers/onboardController');

router.post("/admin/register",  onboardValidator.register,  onboardController.register);

router.post("/admin/login",     onboardValidator.login,     onboardController.login);