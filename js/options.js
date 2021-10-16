let defaultop = {
  whitelisted_website: ["https://docs.google.com", "https://www.instagram.com", "https://www.twitter.com", "https://www.facebook.com", "https://www.google.com"],
  enabled: true,
  rrsenabled: true,
  sentimentAnalyse: 8,
  overideSentimentList: []
}


function save_options() {
    var whitelisted = document.getElementById('whitelisted_urls').value.replace(/[&\\#,+()$~%'"*?<>{}]/g, ',').split(",");
    var enabled = document.getElementById('enabled').checked;
    var rrsenabled = document.getElementById('rrsenabled').checked;
    var sentimentAnalyse = document.getElementById('sentimentAnalyse').value;
    var overideSentimentList = document.getElementById('overideSentimentList').value.replace(/[&\\#,+()$~%'"*?<>{}]/g, ',').split(",");
    // console.log(overideSentimentList[0])
    if(overideSentimentList[0] == '') overideSentimentList = []
    if(sentimentAnalyse < 1)return message("The Scan Strictness score should be always between 1 and 10!", 2000)
    if(sentimentAnalyse > 10)return message("The Scan Strictness score should be always between 1 and 10!", 2000)
    console.log(overideSentimentList)
    chrome.storage.sync.set({
      whitelisted_website: whitelisted,
      enabled: enabled,
      rrsenabled: rrsenabled,
      sentimentAnalyse: parseInt(sentimentAnalyse),
      overideSentimentList: overideSentimentList
    }, function() {
      message("Settings Successfully Set!", 750)
    })
  }
  
  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.
  function restore_options() {
    chrome.storage.sync.get(defaultop, function(items) {
      document.getElementById('sentimentAnalyse').value = items.sentimentAnalyse;
      document.getElementById('whitelisted_urls').value = items.whitelisted_website.join(", ");
      document.getElementById('enabled').checked = items.enabled;
      document.getElementById('rrsenabled').checked = items.rrsenabled;
      document.getElementById('overideSentimentList').value = items.overideSentimentList;
      
    });
  }

  function resetOptions() {
    chrome.storage.sync.set(defaultop, function() {
      // Update status to let user know options were saved.
      message("Settings Successfully Reset!", 750)
    });
  }

  function message(word, time){
      var status = document.getElementById('status');
      status.textContent = word;
      setTimeout(function() {
        status.textContent = '';
        window.location.reload()
      }, time);
  }



  document.addEventListener('DOMContentLoaded', restore_options);
  document.getElementById('save').addEventListener('click',
      save_options);
  document.getElementById('reset').addEventListener('click',
      resetOptions);