/**
 * Created by Angad on 25 January.
 */

const _                                 = require('underscore');

const onboardService                    = require('../modules/onboard/services/onboardService');
const propertyService                   = require('../modules/property/services/propertyService');
const tenantService                     = require('../modules/tenant/services/tenantService');
const openHouseService                  = require('../modules/open-house/services/openHouseService');

const onboardConstants                  = require('../modules/onboard/properties/onboardConstants');
const propertyConstants                 = require('../modules/property/properties/propertyConstants');
const tenantConstants                   = require('../modules/tenant/properties/tenantConstants');
const openHouseConstants                = require('../modules/open-house/properties/openHouseConstants');

exports.runTestCasesAPI = (req, res) => {
  res.send("OK");

  const apiReference  = {module : "test", api : "test"}; //make api test1 for logging
  module.exports.runTestCases(apiReference);
};

exports.runTestCases = (apiReference) => {
  runPropertyTestCases(apiReference);
  runTenantTestCases(apiReference);
  runOpenHouseTestCases(apiReference);
  onboardTestCases(apiReference);
};

const onboardTestCases = (apiReference) => {

  console.log("****************runOnboardingTestCases**********************");
  //TEST CASE 1 : Successful Registration

  const opts1 = {
    name          : "Test Onboard Account",
    email         : "testemailaddress@gmail.com",
    password      : "Admin@123",
    country_code  : "+1",
    phone_number  : 1238418929,
    user_image    : ""
  };
  const response1    = onboardService.register(apiReference, opts1);
  const expectedResponse1 = { success: true, data: {
    name          : "Test Onboard Account",
    email         : "testemailaddress@gmail.com",
    password      : "Admin@123",
    country_code  : "+1",
    phone_number  : 1238418929,
    user_image    : "",
    user_id       : 1
  }};

  logTestCaseResult("Successful Registration", expectedResponse1, response1);

  //TEST CASE 2 : Duplicate Registration
  const opts2 = {
    name          : "Test Onboard Account",
    email         : "testemailaddress@gmail.com",
    password      : "Admin@123",
    country_code  : "+1",
    phone_number  : 1238418929,
    user_image    : ""
  };
  const response2    = onboardService.register(apiReference, opts2);
  const expectedResponse2 = { success: false, is_duplicate: true };
  logTestCaseResult("Duplicate Registration", expectedResponse2, response2);

  //TEST CASE 3 : Invalid Password
  const opts3 = {
    email         : "testemailaddress@gmail.com",
    password      : "Qwerty@123"
  };
  const response3    = onboardService.login(apiReference, opts3);
  const expectedResponse3 = { success: false, error: onboardConstants.RESPONSE_MESSAGES.INVALID_CREDENTIALS };
  logTestCaseResult("Invalid Password", expectedResponse3, response3);

  //TEST CASE 4 : Invalid Email
  const opts4 = {
    email         : "testemailaddress1@gmail.com",
    password      : "Admin@123"
  };
  const response4    = onboardService.login(apiReference, opts4);
  const expectedResponse4 = { success: false, error: onboardConstants.RESPONSE_MESSAGES.USER_NOT_REGISTERED };
  logTestCaseResult("Invalid Password", expectedResponse4, response4);
};

const runPropertyTestCases = (apiReference) => {
  console.log("*****************runPropertyTestCases**********************");

  //Test Case 1: Create Property
  const opts1 = { name: "Test Property Name", address: "Seattle, Washington, United States of America", user_id: 1 };
  const response1 = propertyService.create(apiReference, opts1);
  const expectedResponse1 = {
    success: true,
    message: propertyConstants.RESPONSES.CREATE_SUCCESS,
    data: { user_id: 1, name: "Test Property Name", address: "Seattle, Washington, United States of America", property_id: 1 }
  };
  logTestCaseResult("Successful Property Create", expectedResponse1, response1);

  //Test Case 2: List Properties
  const opts2 = { limit: 10, skip: 0, user_id: 1 };
  const response2 = propertyService.fetchDetails(apiReference, opts2);
  const expectedResponse2 = {
    success: true,
    data: {
      count: 1,
      data: { user_id: 1, name: "Test Property Name", address: "Seattle, Washington, United States of America", property_id: 1 }
    }
  };
  logTestCaseResult("Successful Property Create", expectedResponse2, response2);

  //Test Case 3: Fetch Properties Details With Incorrect property_id
  const opts3             = { property_id: 2, user_id: 1 };
  const response3         = propertyService.fetchDetails(apiReference, opts3);
  const expectedResponse3 = {
    success: false,
    error : propertyConstants.RESPONSES.INVALID_PROPERTY_ID
  };
  logTestCaseResult("Invalid Property ID", expectedResponse3, response3);

  //Test Case 4: Fetch Properties Details With correct property_id
  const opts4             = { property_id: 1, user_id: 1 };
  const response4         = propertyService.fetchDetails(apiReference, opts4);
  const expectedResponse4 = {
    success: true,
    data: { user_id: 1, name: "Test Property Name", address: "Seattle, Washington, United States of America", property_id: 1 }
  };
  logTestCaseResult("Correct Property ID", expectedResponse4, response4);

  //Test Case 5: Update Property With correct property_id
  const opts5 = {
    user_id: 1,
    name: "Test Property Name Updated",
    address: "Seattle, Washington, United States of America",
    property_id: 1
  };
  const response5         = propertyService.fetchDetails(apiReference, opts5);
  const expectedResponse5 = {
    success: true,
    message : propertyConstants.RESPONSES.UPDATE_SUCCESS,
    data: {
      user_id: 1,
      name: "Test Property Name Updated",
      address: "Seattle, Washington, United States of America",
      property_id: 1
    }
  };
  logTestCaseResult("Correct Property ID Update", expectedResponse5, response5);

  //Test Case 6: Update Property With Incorrect property_id
  const opts6 = {
    user_id: 1,
    name: "Test Property Name Updated Incorrect",
    address: "Seattle, Washington, United States of America",
    property_id: 2
  };
  const response6         = propertyService.fetchDetails(apiReference, opts6);
  const expectedResponse6 = {
    success: false,
    error : propertyConstants.RESPONSES.INVALID_PROPERTY_ID
  };
  logTestCaseResult("Incorrect Property ID Update", expectedResponse6, response6);

  //Test Case 7: Remove Property With Incorrect property_id
  const opts7 = {
    user_id     : 1,
    property_id : 2
  };
  const response7         = propertyService.fetchDetails(apiReference, opts7);
  const expectedResponse7 = {
    success: false,
    error : propertyConstants.RESPONSES.INVALID_PROPERTY_ID
  };
  logTestCaseResult("Incorrect Property ID Remove", expectedResponse7, response7);

  //Test Case 8: Remove Property With Incorrect property_id
  const opts8 = {
    user_id     : 1,
    property_id : 2
  };
  const response8         = propertyService.fetchDetails(apiReference, opts8);
  const expectedResponse8 = {
    success: true,
    message : propertyConstants.RESPONSES.REMOVE_SUCCESS
  };
  logTestCaseResult("Incorrect Property ID Remove", expectedResponse8, response8);
}

const runTenantTestCases = (apiReference) => {
  console.log("*****************runTenantTestCases**********************");

  //Test Case 1: Create Tenant
  const opts1 = { name: "Test Tenant Name", user_id: 1 };
  const response1 = tenantService.insertDetails(apiReference, opts1);
  const expectedResponse1 = {
    success: true,
    message: tenantConstants.RESPONSES.CREATE_SUCCESS,
    data: { user_id: 1, name: "Test Tenant Name", tenant_id: 1 }
  };
  logTestCaseResult("Successful Tenant Create", expectedResponse1, response1);

  //Test Case 2: List Tenants
  const opts2 = { limit: 10, skip: 0, user_id: 1 };
  const response2 = tenantService.fetchDetails(apiReference, opts2);
  const expectedResponse2 = {
    success: true,
    data: {
      count: 1,
      data: { user_id: 1, name: "Test Tenant Name", tenant_id: 1 }
    }
  };
  logTestCaseResult("List Tenant", expectedResponse2, response2);

  //Test Case 3: Fetch Tenants Details With Incorrect tenant_id
  const opts3             = { tenant_id: 2, user_id: 1 };
  const response3         = tenantService.fetchDetails(apiReference, opts3);
  const expectedResponse3 = {
    success: false,
    error : tenantConstants.RESPONSES.INVALID_PROPERTY_ID
  };
  logTestCaseResult("Invalid Tenant ID", expectedResponse3, response3);

  //Test Case 4: Fetch Tenants Details With correct tenant_id
  const opts4             = { tenant_id: 1, user_id: 1 };
  const response4         = tenantService.fetchDetails(apiReference, opts4);
  const expectedResponse4 = {
    success: true,
    data: { user_id: 1, name: "Test Tenant Name", tenant_id: 1 }
  };
  logTestCaseResult("Correct Tenant ID", expectedResponse4, response4);

  //Test Case 5: Update Tenant With correct property_id
  const opts5 = {
    user_id: 1,
    name: "Test Tenant Name Updated",
    tenant_id: 1
  };
  const response5         = tenantService.fetchDetails(apiReference, opts5);
  const expectedResponse5 = {
    success: true,
    message : tenantConstants.RESPONSES.UPDATE_SUCCESS,
    data: {
      user_id: 1,
      name: "Test Tenant Name Updated",
      tenant_id: 1
    }
  };
  logTestCaseResult("Correct Tenant ID Update", expectedResponse5, response5);

  //Test Case 6: Update Tenant With Incorrect tenant_id
  const opts6 = {
    user_id: 1,
    name: "Test Tenant Name Updated Incorrect",
    tenant_id: 2
  };
  const response6         = tenantService.fetchDetails(apiReference, opts6);
  const expectedResponse6 = {
    success: false,
    error : tenantConstants.RESPONSES.INVALID_PROPERTY_ID
  };
  logTestCaseResult("Incorrect Tenant ID Update", expectedResponse6, response6);

  //Test Case 7: Remove Tenant With Incorrect tenant_id
  const opts7 = {
    user_id     : 1,
    tenant_id : 2
  };
  const response7         = tenantService.fetchDetails(apiReference, opts7);
  const expectedResponse7 = {
    success: false,
    error : tenantConstants.RESPONSES.INVALID_PROPERTY_ID
  };
  logTestCaseResult("Incorrect Tenant ID Remove", expectedResponse7, response7);

  //Test Case 8: Remove Tenant With Incorrect tenant_id
  const opts8 = {
    user_id   : 1,
    tenant_id : 2
  };
  const response8         = tenantService.fetchDetails(apiReference, opts8);
  const expectedResponse8 = {
    success: true,
    message : tenantConstants.RESPONSES.REMOVE_SUCCESS
  };
  logTestCaseResult("Incorrect Tenant ID Remove", expectedResponse8, response8);
}

const runOpenHouseTestCases = (apiReference) => {
  console.log("*****************runOpenHouseTestCases**********************");

  //Test Case 1: Create Property
  const propertyOpts = { name: "Test Property Name", address: "Seattle, Washington, United States of America", user_id: 1 };
  const propertyResponse = propertyService.create(apiReference, propertyOpts);
  const expectedResponse = {
    success: true,
    message: propertyConstants.RESPONSES.CREATE_SUCCESS,
    data: { user_id: 1, name: "Test Property Name", address: "Seattle, Washington, United States of America", property_id: 2 }
  };
  logTestCaseResult("Successful Property Create", expectedResponse, propertyResponse);

  //Test Case 1: Create Tenant
  const opts = { name: "Test Tenant Name", user_id: 1 };
  const response = tenantService.insertDetails(apiReference, opts);
  const expectedTenantResponse = {
    success: true,
    message: tenantConstants.RESPONSES.CREATE_SUCCESS,
    data: { user_id: 1, name: "Test Tenant Name", tenant_id: 1 }
  };
  logTestCaseResult("Successful Tenant Create", expectedTenantResponse, response);

  //Test Case 1: Create Open House
  const opts1 = { name: "Test Open House", user_id: 1, start_date: "2023-01-30", visitor_amount: 25, property_id: 1 };
  const response1 = openHouseService.insertDetails(apiReference, opts1);
  const expectedResponse1 = {
    success: true,
    message: openHouseConstants.RESPONSES.CREATE_SUCCESS,
    data: { id: 1, name: "Test Open House", user_id: 1, start_date: "2023-01-30", visitor_amount: 25, property_id: 1 }
  };
  logTestCaseResult("Successful Open House Create", expectedResponse1, response1);

  //Test Case 2: List Open House
  const opts2 = { limit: 10, skip: 0, user_id: 1 };
  const response2 = openHouseService.fetchDetails(apiReference, opts2);
  const expectedResponse2 = {
    success: true,
    data: {
      count: 1,
      data: { id: 1, name: "Test Open House", user_id: 1, start_date: "2023-01-30", visitor_amount: 25, property_id: 1 }
    }
  };
  logTestCaseResult("List Open House", expectedResponse2, response2);

  //Test Case 3: Fetch Open House Details With Incorrect id
  const opts3             = { id: 2, user_id: 1 };
  const response3         = openHouseService.fetchDetails(apiReference, opts3);
  const expectedResponse3 = {
    success: false,
    error : openHouseConstants.RESPONSES.INVALID_OPEN_HOUSE_ID
  };
  logTestCaseResult("Invalid Open House ID", expectedResponse3, response3);

  //Test Case 4: Fetch Tenants Details With correct id
  const opts4             = { id: 1, user_id: 1 };
  const response4         = openHouseService.fetchDetails(apiReference, opts4);
  const expectedResponse4 = {
    success: true,
    data: { id: 1, name: "Test Open House", user_id: 1, start_date: "2023-01-30", visitor_amount: 25, property_id: 1 }
  };
  logTestCaseResult("Correct Open House ID", expectedResponse4, response4);

  //Test Case 5: Update Open House With correct id
  const opts5 = {
    id: 1,
    name: "Test Open House",
    user_id: 1,
    start_date: "2023-01-30",
    visitor_amount: 30,
    property_id: 1
  };
  const response5         = openHouseService.fetchDetails(apiReference, opts5);
  const expectedResponse5 = {
    success: true,
    message : openHouseConstants.RESPONSES.UPDATE_SUCCESS,
    data: {
      id: 1,
      name: "Test Open House",
      user_id: 1,
      start_date: "2023-01-30",
      visitor_amount: 30,
      property_id: 1
    }
  };
  logTestCaseResult("Correct ID Update", expectedResponse5, response5);

  //Test Case 6: Update Open House With Incorrect id
  const opts6 = {
    id: 10,
    name: "Test Open House",
    user_id: 1,
    start_date: "2023-01-30",
    visitor_amount: 30,
    property_id: 1
  };
  const response6         = openHouseService.fetchDetails(apiReference, opts6);
  const expectedResponse6 = {
    success: false,
    error : openHouseConstants.RESPONSES.INVALID_OPEN_HOUSE_ID
  };
  logTestCaseResult("Incorrect ID Update", expectedResponse6, response6);

  //Test Case 7: Invalid Open House ID Enrollment
  const opts7 = {
    open_house_id: 2,
    tenant_id     : [2],
    user_id: 1
  }
  const response7 = openHouseService.enroll(apiReference, opts7);
  const expectedResponse7 = {
    success: false,
    error : openHouseConstants.RESPONSES.INVALID_OPEN_HOUSE_ID
  }
  logTestCaseResult("Incorrect Open House ID Enrollment", expectedResponse7, response7);

  //Test Case 8: Invalid Tenant ID Enrollment
  const opts8 = {
    open_house_id: 1,
    tenant_id     : [3],
    user_id: 1
  }
  const response8 = openHouseService.enroll(apiReference, opts8);
  const expectedResponse8 = {
    success: false,
    error : tenantConstants.RESPONSES.INVALID_TENANT_ID
  }
  logTestCaseResult("Incorrect Tenant ID Enrollment", expectedResponse8, response8);

  //Test Case 9: Correct Enrollment
  const opts9 = {
    open_house_id: 1,
    tenant_id     : [2],
    user_id: 1
  }
  const response9 = openHouseService.enroll(apiReference, opts9);
  const expectedResponse9 = {
    success: false,
    data : {
      open_house_id: 1,
      tenant_id    : [2],
      user_id      : 1
    }
  }
  logTestCaseResult("Correct Enrollment", expectedResponse9, response9);

  //Test Case 10: Remove Open House With Incorrect id
  const opts10 = {
    user_id     : 1,
    tenant_id : 2
  };
  const response10         = openHouseService.fetchDetails(apiReference, opts10);
  const expectedResponse10 = {
    success: false,
    error : openHouseConstants.RESPONSES.INVALID_OPEN_HOUSE_ID
  };
  logTestCaseResult("Incorrect Tenant ID Remove", expectedResponse10, response10);

  //Test Case 11: Remove Open House With correct id
  const opts11 = {
    user_id   : 1,
    id : 1
  };
  const response11         = openHouseService.fetchDetails(apiReference, opts11);
  const expectedResponse11 = {
    success: true,
    message : openHouseConstants.RESPONSES.REMOVE_SUCCESS
  };
  logTestCaseResult("Correct ID Remove", expectedResponse11, response11);
}

const logTestCaseResult = (name, expectedResponse, response) => {
  const result = _.isEqual(expectedResponse, response);
  if(result){
    console.log("*********************", name, " : ",  result, "*********************");
  } else {
    console.error(expectedResponse, response);
    console.error("********************* ", name,  " : ", result, "*********************");
    return false;
  }
};