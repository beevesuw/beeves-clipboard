function copySelection() {
    var selectedText = window.getSelection().toString().trim();

    if (selectedText) {
        updateClipboard('_', selectedText);
    }
}

/*
Add copySelection() as a listener to mouseup events.
*/
document.addEventListener("mouseup", copySelection);

async function updateClipboard(keyword, text){
    browser.storage.local.get('clipboard', function(clipboard){
        clipboard = clipboard.clipboard || clipboard;
        clipboard[keyword] = text;
        browser.storage.local.set({clipboard}, function(){});
    });
    return Promise.resolve(true);
}