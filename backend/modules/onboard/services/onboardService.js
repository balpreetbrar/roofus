/**
 * Created by Angad on 24 January 2023
 */

'use strict';

const logging                           = require('../../../logging/logging');
const onboardDao                        = require('../dao/onboardDao');
const jwtService                        = require('../../../services/jwtService');
const pwdService                        = require('../../../services/pwdService');
const onboardConstants                  = require('../properties/onboardConstants');

exports.register = async (apiReference, opts) => {
  let response = { success: false };
  logging.log(apiReference, { EVENT: "Register New Admin Service", OPTS: opts });

  opts.password = pwdService.encrypt(opts.password);

  const daoResponse = await onboardDao.insertDetails(apiReference, opts);
  logging.log(apiReference, { EVENT: "Insert Details For User", RESPONSE: daoResponse });

  if (!daoResponse.success) {
    if (daoResponse.error === "ER_DUP_ENTRY") {
      response.is_duplicate = true;
    }
    return daoResponse;
  }

  delete opts.password;

  response.success  = true;
  response.data     = {
    ...opts,
    user_id   : daoResponse.data.insertId
  };
  return response;
};

exports.login = async (apiReference, opts) => {
  let response = { success: false };
  logging.log(apiReference, { EVENT: "Login User Service", OPTS: opts });

  let loginInfo = await onboardDao.fetchDetails(apiReference, opts);
  logging.log(apiReference, { EVENT: "Fetch User Details", RESPONSE: loginInfo });

  if (!loginInfo.success) {
    return loginInfo;
  }

  if (_.isEmpty(loginInfo.data)) {
    response.error  = onboardConstants.RESPONSE_MESSAGES.USER_NOT_REGISTERED;
    return response;
  }

  loginInfo = loginInfo.data[0];

  if (!pwdService.compare(opts.password, loginInfo.password)) {
    response.error = onboardConstants.RESPONSE_MESSAGES.INVALID_CREDENTIALS;
    return response;
  }

  loginInfo.access_token = await jwtService.createJWT(apiReference, loginInfo);

  delete loginInfo.password;

  response.success  = true;
  response.data     = {
    ...loginInfo
  }
  return response;
};