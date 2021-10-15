let defaultop = {
    whitelisted_website: ["https://www.instagram.com", "https://www.twitter.com", "https://www.facebook.com", "https://www.google.com"],
    enabled: true
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    console.log("Client Updated URL. Checking if There are rick rolls.")
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    var pathArray = tabs[0].url.split( '/' );
    var protocol = pathArray[0];
    var host = pathArray[2];
    var url = protocol + '//' + host;
    if(tabs[0].url){
        chrome.storage.sync.get(defaultop, function(items) {
            let urls = items.whitelisted_website;
            if(urls.includes(url) == false && items.enabled == true && tabs[0].url.startsWith("chrome-extension://") !== true && tabs[0].url.startsWith("chrome:") !== true){
                let fullUrl = tabs[0].url;

                let urlParams = getQueryString("checkforrickroll", fullUrl);

                if(urlParams != "false"){

                    fetch(fullUrl).then(r => r.text()).then(result => {
                        if(result.includes("dQw4w9WgXcQ") == true){
                            console.log("rick roll detected!")
                            chrome.tabs.update({ url: chrome.runtime.getURL("html/warning.html") + "?url="+fullUrl });
                        }
            
                    })

                }

            }
        });
        

    }
})
});

function getQueryString(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}






chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
        //call a function to handle a first install
        chrome.tabs.create({ url: chrome.runtime.getURL("informations/welcome.pdf") });
    }else if(details.reason == "update"){
        //call a function to handle an update
        chrome.tabs.create({ url: chrome.runtime.getURL("informations/update.pdf") });
    }
});