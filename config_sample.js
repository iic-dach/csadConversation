// In case you have a new service protected by the IAM method use the following code
var config = { 
  watson: {
   assistant: { 
      iam_apikey: "<yourApiKey>", 
      version: "2019-02-28",
      url: "yourServiceUrl",
      assistantId: "<yourAssistantId>" 
    } 
  } 
}; 
/*
var config = { 
  watson: {
   assistant: { 
      username: "<yourServiceUsername>", 
      password: "<yourServicePassword>", 
      version: "2019-02-28",
      url: "yourServiceUrl",
      assistantId: "<yourAssistantId>" 
    } 
  } 
}; 
*/
module.exports = config;