/* In case you have a new service protected by the IAM method use the following code
var config = { 
  watson: {
   assistant: { 
      iam_apikey: "<yourApiKey>", 
      version: "2018-07-10",
      url: "yourServiceUrl",
      workspace_id: "<yourWorkspaceId>" 
    } 
  } 
}; 
*/
var config = { 
  watson: {
   assistant: { 
      username: "<yourServiceUsername>", 
      password: "<yourServicePassword>", 
      version: "2018-07-10",
      url: "yourServiceUrl",
      workspace_id: "<yourWorkspaceId>" 
    } 
  } 
}; 
module.exports = config;