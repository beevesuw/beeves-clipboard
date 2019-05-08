let Beeves = {};

Beeves.beevesFileEndpoint = browser.extension.getURL("beeves.json");

//retrieve from an endpoint and return json 
Beeves.getJSONData = async function(endpoint) {
  try {
  let res = await fetch(endpoint);
  res = await res.json();
  //log(res);
  return res;
  }catch(err) {
    console.log(err);
  }
}

async function postData(endpoint, payload) {
  try {
    let res = await fetch(endpoint, {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    res = await res.json();
    //log(res);
    return res;
  }catch(err) {
    console.log(err);
  }
}

Beeves.messageHandler = async function(message, sender, sendResponse){
    if(message['type'] == 'beevesRPC'){
        response = await Beeves.beevesInvoker(message);
        return Promise.resolve(response);
    }
    return Promise.resolve('invalid message');
}

Beeves.beevesInvoker = async function(message){
  let result = await Beeves.beevesFunctions[message['functionName']].apply(globalThis, message['arguments']);
  return Promise.resolve(result);
}

Beeves.beevesFunctions = {
    test: function(arg){
      console.log(`beevesRPC works! data: ${arg}`);
      return true;
    }
};

Beeves.newFunction = function(name, func){
  this.beevesFunctions[name] = func;
}

Beeves.init = function(){
  browser.runtime.onInstalled.addListener(async function(details){
    let beevesJSON = await Beeves.getJSONData(Beeves.beevesFileEndpoint);
    let sending = await browser.runtime.sendMessage(
      'base@beeves.com',
      beevesJSON,
      {}
    );
  });
  browser.runtime.onMessageExternal.addListener(this.messageHandler);
  Beeves.newFunction('copy', function(keyword){
    copyHelper(keyword);
  });
  Beeves.newFunction('paste', async function(keyword){
    let text =  await pasteHelper(keyword);
    console.log(text);
  });
}

Beeves.init();