/**
 * Created by Angad on 24 January 2023
 */

'use strict';

const Joi                             = require('joi');
const constants                       = require('../../../responses/responseConstants');
const validator                       = require('../../../validators/joiValidator');

const apiReferenceModule              = constants.modules.ONBOARD;

const headerSchema                    = Joi.object().keys({});

exports.register = (req, res, next) => {
  req.apiReference = {
    module        : apiReferenceModule,
    api           : "register"
  };

  const schema = Joi.object().keys({
    user_image    : Joi.string().trim().optional(),
    name          : Joi.string().trim().required(),
    country_code  : Joi.string().trim().required(),
    phone_number  : Joi.number().strict().required(),
    email         : Joi.string().email().trim().required(),
    password      : Joi.string().trim().required()
  });

  let reqBody     = { ... req.body };
  let request     = { ... req, headers: req.headers };

  let validFields = validator.validateFields(req.apiReference, request, reqBody, res, schema, headerSchema);
  if (validFields) {
    next();
  }
};

exports.login = (req, res, next) => {
  req.apiReference = {
    module        : apiReferenceModule,
    api           : "login"
  };

  const schema = Joi.object().keys({
    email       : Joi.string().email().trim().required(),
    password    : Joi.string().trim().required()
  });

  let reqBody     = { ... req.body };
  let request     = { ... req, headers: req.headers };

  let validFields = validator.validateFields(req.apiReference, request, reqBody, res, schema, headerSchema);
  if (validFields) {
    next();
  }
};