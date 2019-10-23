// In case you have a new service protected by the IAM method use the following code
var config = { 
  watson: {
   assistant: { 
      iam_apikey: "<yourApiKey>", 
      version: "2019-02-28",
      url: "yourServiceUrl",
      assistantId: "<yourAssistantId>" 
    },
    discovery: {
      version: "2019-04-30",
      iam_apikey: "<yourApiKey>",
      url: "<yourServiceUrl>"
    },
    discoveryEnv: {
      collectionId: "<your collectionId>",
      environmentId: "<your environmentId>"
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
  },
  discovery: {
    version: "2019-04-30"",
    username: "<your discovery username>",
    password: "<your discovery password>",
    url: "<yourServiceUrl>"
  },
  discoveryEnv: {
    collectionId: "<your collectionId>",
    environmentId: "<your environmentId>"
  } 
}; 
*/
module.exports = config;