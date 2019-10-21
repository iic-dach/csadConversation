const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');
const config = require('../config');

const watsonAssistant = new AssistantV2({
  version: config.watson.assistant.version,
  authenticator: new IamAuthenticator({
    apikey: config.watson.assistant.iam_apikey
  }),
  url: config.watson.assistant.url
});

let assistantSessionId = null;

exports.getIndex = (req, res, next) => {
  watsonAssistant.createSession({
    assistantId: config.watson.assistant.assistantId
  })
  .then(result => {
    assistantSessionId = result.result.session_id,
    res.render('index'); 
  })
  .catch(err => {
    console.log(err);
  })
}

exports.postMessage = (req, res, next) => {
  let text = '';
  if (req.body.input) {
    text = req.body.input.text;
  }
  watsonAssistant.message({
    assistantId: config.watson.assistant.assistantId,
    sessionId: assistantSessionId,
    input: {
      'message_type': 'text',
      'text': text
    }
  })
  .then(result => {
    console.log(JSON.stringify(result, null, 2));
    if (text === '') {
      return res.json(result);
    }
    console.log("Detected input: " + text);
    if (result.result.output.intents.length > 0) {
      var intent = result.result.output.intents[0];
      console.log("Detected intent: " + intent.intent);
      console.log("Confidence: " + intent.confidence);
    }
    if (result.result.output.entities.length > 0) {
      var entity = result.result.output.entities[0];
      console.log("Detected entity: " + entity.entity);
      console.log("Value: " + entity.value);
      if ((entity.entity === 'help') && (entity.value === 'time')) {
        var msg = 'The current time is ' + new Date().toLocaleTimeString();
        console.log(msg);
        result.result.output.generic[0].text = msg;
      }
    }
    // console.log(JSON.stringify(result, null, 2));
    res.json(result);
  })
  .catch(err => {
    console.log(err);
  })
}
