/**
 * Created by Angad on 25 January 2023
 */

const Joi                             = require('joi');

const constants                       = require('../../../responses/responseConstants');
const validator                       = require("../../../validators/joiValidator");
const apiReferenceModule              = constants.modules.TENANT;

exports.create = (req, res, next) => {
  req.apiReference = {
    module    : apiReferenceModule,
    api       : "create"
  };

  let schema = Joi.object().keys({
    name          : Joi.string().trim().required()
  });

  let reqBody     = { ... req.body };
  let request     = { ... req, headers: req.headers };

  let validFields = validator.validateFields(req.apiReference, request, reqBody, res, schema);
  if (validFields) {
    next();
  }
};

exports.list = (req, res, next) => {
  req.apiReference = {
    module    : apiReferenceModule,
    api       : "list"
  };

  let schema = Joi.object().keys({
    limit       : Joi.number().strict().required(),
    skip        : Joi.number().strict().required()
  });

  let reqBody     = { ... req.query };
  let request     = { ... req, headers: req.headers };

  let validFields = validator.validateFields(req.apiReference, request, reqBody, res, schema);
  if (validFields) {
    next();
  }
};

exports.fetch = (req, res, next) => {
  req.apiReference = {
    module    : apiReferenceModule,
    api       : "fetch"
  };

  let schema = Joi.object().keys({
    tenant_id   : Joi.number().min(1).strict().required()
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
    module    : apiReferenceModule,
    api       : "update"
  };

  let schema = Joi.object().keys({
    tenant_id       : Joi.number().strict().min(1).required(),
    name            : Joi.string().trim().optional()
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
    module    : apiReferenceModule,
    api       : "remove"
  };

  let schema = Joi.object().keys({
    tenant_id   : Joi.number().strict().min(1).required()
  });

  let reqBody     = { ... req.body };
  let request     = { ... req, headers: req.headers };

  let validFields = validator.validateFields(req.apiReference, request, reqBody, res, schema);
  if (validFields) {
    next();
  }
};