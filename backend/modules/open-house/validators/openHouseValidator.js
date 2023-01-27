/**
 * Created by Angad on 25 January 2023
 */

'use strict';

const constants                       = require('../../../responses/responseConstants');
const apiReferenceModule              = constants.modules.OPEN_HOUSE;

const Joi                             = require('joi');
const validator                       = require("../../../validators/joiValidator");

exports.create = (req, res, next) => {
  req.apiReference = {
    module    : apiReferenceModule,
    api       : "create"
  };

  let schema = Joi.object().keys({
    property_id     : Joi.number().min(1).strict().required(),
    start_date      : Joi.date().required(),
    visitor_amount  : Joi.number().strict().min(1).required()
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
    fetch_property_details  : Joi.boolean().optional(),
    limit                   : Joi.number().strict().required(),
    skip                    : Joi.number().strict().required()
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
    module    : apiReferenceModule,
    api       : "details"
  };

  let schema = Joi.object().keys({
    id     : Joi.number().strict().required()
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
    id              : Joi.number().strict().required(),
    property_id     : Joi.number().min(1).strict().optional(),
    start_date      : Joi.date().optional(),
    visitor_amount  : Joi.number().strict().min(1).optional()
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
    id              : Joi.number().strict().required()
  });

  let reqBody     = { ... req.body };
  let request     = { ... req, headers: req.headers };

  let validFields = validator.validateFields(req.apiReference, request, reqBody, res, schema);
  if (validFields) {
    next();
  }
};

exports.enroll = (req, res, next) => {
  req.apiReference = {
    module    : apiReferenceModule,
    api       : "enroll"
  };

  let schema = Joi.object().keys({
    open_house_id       : Joi.number().strict().required(),
    tenant_id           : Joi.array().items(
      Joi.number().strict().required()
    ).required()
  });

  let reqBody     = { ... req.body };
  let request     = { ... req, headers: req.headers };

  let validFields = validator.validateFields(req.apiReference, request, reqBody, res, schema);
  if (validFields) {
    next();
  }
};
