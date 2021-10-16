function openManual() {
    chrome.tabs.create({ url: chrome.runtime.getURL("informations/welcome.pdf") });
}

function openSetting() {
    chrome.tabs.create({ url: chrome.runtime.getURL("html/options.html") });
}

function giveFeedback() {
    chrome.tabs.create({ url: "https://forms.gle/wXihhprFn6PpxbGq8" });
}


document.getElementById('openManual').addEventListener('click', openManual);
document.getElementById('openSetting').addEventListener('click', openSetting);
document.getElementById('giveFeedback').addEventListener('click', giveFeedback);