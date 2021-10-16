let defaultop = {
    whitelisted_website: ["https://www.instagram.com", "https://www.twitter.com", "https://www.facebook.com", "https://www.google.com"],
    enabled: true
  }

function updateQueryStringParameter(uri, key, value) {
    // remove the hash part before operating on the uri
    var i = uri.indexOf('#');
    var hash = i === -1 ? ''  : uri.substr(i);
         uri = i === -1 ? uri : uri.substr(0, i);

    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf('?') !== -1 ? "&" : "?";
    if (uri.match(re)) {
        uri = uri.replace(re, '$1' + key + "=" + value + '$2');
    } else {
        uri = uri + separator + key + "=" + value;
    }
    return uri + hash;  // finally append the hash as well
}


function allow() {
    const urlParams = new URLSearchParams(window.location.search);
    chrome.storage.sync.get(defaultop, function(result) {
        var pathArray = urlParams.get("url").split( '/' );
        var protocol = pathArray[0];
        var host = pathArray[2];
        var url = protocol + '//' + host;
        let item = result.whitelisted_website;
        item.push(url)
        chrome.storage.sync.set({ whitelisted_website: item }, function() {
            
        });

    });
    
    document.getElementById("continue").href = urlParams.get("url")

}  

function back() {
    window.history.go(-2)
}  


document.getElementById('continue').addEventListener('click', allow);
document.getElementById('close').addEventListener('click', back);