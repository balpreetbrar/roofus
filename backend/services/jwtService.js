/**
 * Created by Angad on 24 January 2023
 */

'use strict';

const jwt                   = require('jsonwebtoken');
const secretOrPrivateKey    = "R0ofu2_0p3#_#0uS3";


const logging               = require("../logging/logging");

const payload = (opts) => {
  return {
    user_id                       :   opts.user_id,
    name                          :   opts.name,
    user_image                    :   opts.user_image,
    email                         :   opts.email,
    timezone                      :   opts.timezone
  }
};

const createJWT = (apiReference, opts, expiryTime) => {
  const values  = { ... opts };
  logging.log(apiReference, {
    EVENT: "!! CREATING JWT !! ",
    OPTS:  opts
  });
  return jwt.sign(payload(values), secretOrPrivateKey, { expiresIn: expiryTime || "1 days"})
};

const verifyJWT = (apiReference, token) => {
  logging.log(apiReference, {EVENT: "VERIFY JWT", TOKEN: token});
  let decoded;
  try{
    decoded = jwt.verify(token, secretOrPrivateKey);
  } catch(err){
    console.error("Invalid token!!", token, err);
  }
  logging.log(apiReference, { EVENT: "!! DECODED JWT !! ", OPTS:  decoded });
  return decoded;
};


exports.createJWT         = createJWT;
exports.verifyJWT         = verifyJWT;
