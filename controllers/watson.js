const AssistantV1 = require('ibm-watson/assistant/v1');
const config = require('../config');

const watsonAssistant = new AssistantV1(config.watson.assistant);

exports.getIndex = (req, res, next) => {
  res.render('index');
}

exports.postMessage = (req, res, next) => {
  console.log('Text:' + req.body.input);
  const parameters = { 
    'input': req.body.input, 
    'context': req.body.context, 
    'workspace_id': config.watson.assistant.workspace_id 
  };
  assistantMessage(parameters)
    .then(response => {
      if (!response.input.text) {
        return res.json(response);
      }
      console.log("Detected input: " + response.input.text);
      if (response.intents.length > 0) {
        var intent = response.intents[0];
        console.log("Detected intent: " + intent.intent);
        console.log("Confidence: " + intent.confidence);
      }
      if (response.entities.length > 0) {
        var entity = response.entities[0];
        console.log("Detected entity: " + entity.entity);
        console.log("Value: " + entity.value);
        if ((entity.entity === 'help') && (entity.value === 'time')) {
          var msg = 'The current time is ' + new Date().toLocaleTimeString();
          console.log(msg);
          response.output.text = msg;
        }
      }
      console.log(JSON.stringify(response, null, 2)); 
      res.json(response);
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