var context = {};

function updateChatLog(user, message) {
  if (message) { 
    var div = document.createElement("div");
    if (user === 'Watson') {
      div.className = 'assistant'; 
    } else {
      div.className = 'wa-user';
    } 
    div.innerHTML = "<b>" + user + ":</b> " + message + "<br/>";
    document.getElementById("history").appendChild(div); 
    document.getElementById("text").value = ""; 
  } 
}

function sendMessage() { 
  var text = document.getElementById("text").value; 
  updateChatLog("You", text); 
  var payload = {}; 
  if (text) { 
    payload.input = {"text": text};
  };
  if (context) {
    payload.context = context;
  }; 
  var xhr = new XMLHttpRequest(); 
  xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) { 
        var json = JSON.parse(xhr.responseText); 
        context = json.context;
        if (json.result.output.generic[0].response_type === "text") {
          updateChatLog("Watson", json.result.output.generic[0].text);
        } else {
          let title = "<b>" + json.result.output.generic[0].results[0].title + "</b><br/>";
          text = title.concat(json.result.output.generic[0].results[0].body.substring(0, 50)).concat('...');
          updateChatLog("Watson", text);
        }
        
      }
    }
  }
  xhr.open("POST", "./", true);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.send(JSON.stringify(payload)); 
}

function init() {
    document.getElementById("text").addEventListener("keydown", function(e) {
      if (!e) {
        var e = window.event;
      }
      if (e.keyCode == 13) {
        sendMessage();
      } 
    }, 
    false); 
  sendMessage(); 
} 