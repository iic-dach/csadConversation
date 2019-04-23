const AssistantV1 = require('watson-developer-cloud/assistant/v1');
const DiscoveryV1 = require('watson-developer-cloud/discovery/v1');
const config = require('../config');

const watsonAssistant = new AssistantV1(config.watson.assistant);
const discovery = new DiscoveryV1(config.watson.discovery);

exports.getIndex = (req, res, next) => {
  res.render('index');
}

exports.postMessage = (req, res, next) => {
  console.log('Text:' + req.body.input);
  let assistantResult = null;
  const assistantParam = { 
    'input': req.body.input, 
    'context': req.body.context, 
    'workspace_id': config.watson.assistant.workspace_id 
  };
  assistantMessage(assistantParam)
    .then(assistantResult => {
      let intent = null;
      let entity = null;

      if (assistantResult.intents.length > 0) {
        intent = assistantResult.intents[0];
        console.log("Detected intent: " + intent.intent);
        console.log("Confidence: " + intent.confidence);
      }
      if (assistantResult.entities.length > 0) {
        entity = assistantResult.entities[0];
        console.log("Detected entity: " + entity.entity);
        console.log("Value: " + entity.value);
      }
      if (entity != null && (entity.entity === 'help') && (entity.value === 'time')) {
        let msg = 'The current time is ' + new Date().toLocaleTimeString();
        console.log(msg);
        assistantResult.output.text = msg;
      }
      if (intent != null && intent.intent === "out_of_scope" && assistantResult.entities.filter(val => val.entity ==="cardevice").length > 0) {
        let discoveryParams = {
          'query': assistantResult.input.text,
          'environment_id': config.watson.discoveryEnv.environmentId,
          'collection_id': config.watson.discoveryEnv.collectionId,
          'passages': true,
          return: 'text, title, sourceUrl, passages'
        };
        discoveryQuery(discoveryParams)
          .then(discoveryResult => {
            console.log(discoveryResult);
            assistantResult.output.text = discoveryResult.passages[0].passage_text;
            return res.json(assistantResult);
          })
          .catch(err => {
            console.log('error:', err);
          }); 
      } else {
//      console.log(JSON.stringify(result, null, 2)); 
        res.json(assistantResult);
      }
    })
    .catch(err => {
      console.log('error:', err);
    }); 
}

// convert assistant.message() to Promise
assistantMessage = (params) => {
  return new Promise((resolve, reject) => {
    watsonAssistant.message(params, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    })
  });
}
//convert discovery.query() to Promise
discoveryQuery = (params) => {
  return new Promise((resolve, reject) => {
    discovery.query(params, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result)
      }
    })
  })
}