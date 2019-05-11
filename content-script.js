async function copySelection() {
    var selectedText = window.getSelection().toString().trim();
    if (selectedText) {
        alert(selectedText);
    }
}

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if(message.action == 'copy'){
        alert(`copy: ${message.keyword}`);
        copySelection();
    }
    else if(message.action == 'paste'){
        alert(`paste: ${message.keyword}`);
    }
});