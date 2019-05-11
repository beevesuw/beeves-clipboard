function copy(keyword) {
    let selectedText = window.getSelection().toString().trim();
    if (selectedText) {
        clipboard[keyword] = selectedText;
    }
}

function paste(keyword) {
    alert(clipboard[keyword]);
}


browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if(message.action == 'copy'){
        //alert(`copy: ${message.keyword}`);
        copy(message.keyword.toLowerCase());
    }
    else if(message.action == 'paste'){
        //alert(`paste: ${message.keyword}`);
        paste(message.keyword.toLowerCase());


    }
});

clipboard = {};