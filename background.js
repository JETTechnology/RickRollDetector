let defaultop = {
    whitelisted_website: ["https://docs.google.com", "https://www.instagram.com", "https://www.twitter.com", "https://www.facebook.com", "https://www.google.com"],
    enabled: true,
    rrsenabled: true,
    sentimentAnalyse: 7,
    overideSentimentList: []
}

let baseRRSURL = "https://RickRollBackend.jerry2006.repl.co"
console.log("------Started Rick Roll Protection Service------")

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {

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

                fetch("https://RickRollBackend.jerry2006.repl.co/riskywebsiteget").then(r => r.text()).then(result => {
                    let res = JSON.parse(result);

                    if(res.error == false && items.rrsenabled == true){
                        if(res.result.includes(fullUrl) == true){
                            chrome.tabs.update({ url: chrome.runtime.getURL("html/warning.html") + "?rrs=true&url="+fullUrl });

                        }
                    }
                    
                                
                })

                    fetch(fullUrl).then(r => r.text()).then(async result => {
                        let res = await analyse(result, items)
                        console.log((11 - parseInt(items.sentimentAnalyse)), res)
                        if(res > (11 - parseInt(items.sentimentAnalyse))){
                            chrome.tabs.update({ url: chrome.runtime.getURL("html/warning.html") + "?url="+fullUrl });
                        }

            
                    })

                    
                    
                        

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






// chrome.runtime.onInstalled.addListener(function(details){
//     if(details.reason == "install"){
//         //call a function to handle a first install
//         chrome.tabs.create({ url: chrome.runtime.getURL("informations/welcome.pdf") });
//     }else if(details.reason == "update"){
//         //call a function to handle an update
//         chrome.tabs.create({ url: chrome.runtime.getURL("informations/update.pdf") });
//     }
// });

async function analyse(input, items) {
    let words;
    console.log(items)
    if(items.overideSentimentList.length !== 0){
        words = items.overideSentimentList
    }else{
        let req = await fetch(baseRRSURL + "/rickrollkeywords");
        let res = await req.json();
        words = res.result;
    }
    
    let score = 0;
    for(i in words){
        if(input.toLowerCase().includes(words[i].toLowerCase()) == true){
            score += 1
        }
    }

    return score;
}
