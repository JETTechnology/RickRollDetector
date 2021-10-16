let defaultop = {
  whitelisted_website: ["https://www.instagram.com", "https://www.twitter.com", "https://www.facebook.com", "https://www.google.com"],
  enabled: true,
  rrsenabled: true
}


function save_options() {
    var whitelisted = document.getElementById('whitelisted_urls').value.replace(/ /g, "").replace(/\n/g, "").split(",");
    var enabled = document.getElementById('enabled').checked;
    var rrsenabled = document.getElementById('rrsenabled').checked;
    chrome.storage.sync.set({
      whitelisted_website: whitelisted,
      enabled: enabled,
      rrsenabled: rrsenabled
    }, function() {
      // Update status to let user know options were saved.
      var status = document.getElementById('status');
      status.textContent = 'Settings saved.';
      setTimeout(function() {
        status.textContent = '';
      }, 750);
    });
  }
  
  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.
  function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get(defaultop, function(items) {
      document.getElementById('whitelisted_urls').value = items.whitelisted_website.join(", ");
      document.getElementById('enabled').checked = items.enabled;
      document.getElementById('rrsenabled').checked = items.rrsenabled;
    });
  }

  function resetOptions() {
    chrome.storage.sync.set(defaultop, function() {
      // Update status to let user know options were saved.
      var status = document.getElementById('status');
      status.textContent = 'Settings Reset.';
      setTimeout(function() {
        status.textContent = '';
        window.location.reload();
      }, 750);
    });
  }



  document.addEventListener('DOMContentLoaded', restore_options);
  document.getElementById('save').addEventListener('click',
      save_options);
  document.getElementById('reset').addEventListener('click',
      resetOptions);