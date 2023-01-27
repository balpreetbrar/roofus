/**
 * Created by Angad on 24 January 2023
 */

'use strict';

const moment                          = require('moment');

const fileSwitches  = {
  startup       : true,
  onboarding    : true,
  property      : true,
  tenant        : true,
  open_house    : true
};

const modules = {
  startup     : {
    initialize  : true
  },
  onboarding  : {
    register    : true,
    login       : true
  },
  property    : {
    create    : true,
    list      : true,
    details   : true,
    update    : true,
    remove    : true
  },
  tenant      : {
    create    : true,
    list      : true,
    fetch     : true,
    update    : true,
    remove    : true
  },
  open_house  : {
    create    : true,
    list      : true,
    details   : true,
    update    : true,
    remove    : true,
    enroll    : true
  }
};

const log = (apiReference, log) => {
  if (
    apiReference
    && apiReference.module
    && apiReference.api
    && fileSwitches
    && fileSwitches[apiReference.module] == true
    && modules
    && modules[apiReference.module]
    && modules[apiReference.module][apiReference.api] == true) {

    try {
      log = JSON.stringify(log);
    }
    catch (exception) {
    }
    console.log("-->" + moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS') + " :----: " +
      apiReference.module + " :=: " + apiReference.api + " :=: " + log);
  }
};

const logError = (apiReference, log) => {
  if (apiReference
    && apiReference.module
    && apiReference.api) {

    try {
      log = JSON.stringify(log);
    }
    catch (exception) {
    }
    console.error("-->" + moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS') + " :----: " +
      apiReference.module + " :=: " + apiReference.api + " :=: " + log);
  }
};


exports.log      = log;
exports.logError = logError;
