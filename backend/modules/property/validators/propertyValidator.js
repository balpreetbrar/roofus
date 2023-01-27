/**
 * Created by Angad on 25 January 2023
 */

'use strict';

const constants                         = require('../../../responses/responseConstants');

const apiReferenceModule                = constants.modules.PROPERTY;
const validator                         = require('../../../validators/joiValidator');

const Joi                               = require('joi');

exports.create = (req, res, next) => {
  req.apiReference = {
    module  : apiReferenceModule,
    api     : "create"
  };

  let schema = Joi.object().keys({
    name      : Joi.string().trim().required(),
    address   : Joi.string().trim().required()
  });

  let reqBody     = { ... req.body };
  let request     = { ... req, headers: req.headers };

  let validFields = validator.validateFields(req.apiReference, request, reqBody, res, schema);
  if (validFields) {
    next();
  } else {
    return false;
  }
};

exports.fetch = (req, res, next) => {
  req.apiReference = {
    module      : apiReferenceModule,
    api         : "list"
  };

  let schema = Joi.object().keys({
    limit   : Joi.number().strict().required(),
    skip    : Joi.number().strict().required()
  });

  let reqBody     = { ... req.query };
  let request     = { ... req, headers: req.headers };

  let validFields = validator.validateFields(req.apiReference, request, reqBody, res, schema);
  if (validFields) {
    next();
  }
};

exports.details = (req, res, next) => {
  req.apiReference = {
    module      : apiReferenceModule,
    api         : "details"
  };

  let schema = Joi.object().keys({
    property_id   : Joi.number().strict().min(1).required()
  });

  let reqBody     = { ... req.query };
  let request     = { ... req, headers: req.headers };

  let validFields = validator.validateFields(req.apiReference, request, reqBody, res, schema);
  if (validFields) {
    next();
  }
};

exports.update = (req, res, next) => {
  req.apiReference = {
    module  : apiReferenceModule,
    api     : "update"
  };

  let schema = Joi.object().keys({
    property_id : Joi.number().strict().required(),
    name        : Joi.string().trim().optional(),
    address     : Joi.string().trim().optional()
  });

  let reqBody     = { ... req.body };
  let request     = { ... req, headers: req.headers };

  let validFields = validator.validateFields(req.apiReference, request, reqBody, res, schema);
  if (validFields) {
    next();
  }
};

exports.remove = (req, res, next) => {
  req.apiReference = {
    module  : apiReferenceModule,
    api     : "remove"
  };

  let schema = Joi.object().keys({
    property_id : Joi.number().strict().min(1).required()
  });

  let reqBody     = { ... req.body };
  let request     = { ... req, headers: req.headers };

  let validFields = validator.validateFields(req.apiReference, request, reqBody, res, schema);
  if (validFields) {
    next();
  }
};