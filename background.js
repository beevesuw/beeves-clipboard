async function copyHelper(keyword){
    browser.storage.local.get('clipboard', function(clipboard){
        clipboard = clipboard.clipboard || clipboard;
        clipboard[keyword] = clipboard['_'];
        browser.storage.local.set({clipboard}, function(){});
    });
}

async function pasteHelper(keyword){
    let clipboard = await browser.storage.local.get(['clipboard']);
    return Promise.resolve(clipboard.clipboard[keyword]);
}
