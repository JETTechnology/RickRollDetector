function openManual() {
    chrome.tabs.create({ url: chrome.runtime.getURL("informations/manual.pdf") });
}

function openSetting() {
    chrome.tabs.create({ url: chrome.runtime.getURL("html/options.html") });
}

function giveFeedback() {
    chrome.tabs.create({ url: "https://forms.gle/wXihhprFn6PpxbGq8" });
}

function openWebsiteReport() {
    chrome.tabs.create({ url: chrome.runtime.getURL("html/websitereport.html") });
}

function openChangelog() {
    chrome.tabs.create({ url: chrome.runtime.getURL("informations/changelog.pdf") });
}


document.getElementById('openManual').addEventListener('click', openManual);
document.getElementById('openSetting').addEventListener('click', openSetting);
document.getElementById('giveFeedback').addEventListener('click', giveFeedback);
document.getElementById('openWebsiteReport').addEventListener('click', openWebsiteReport);
document.getElementById('openChangelog').addEventListener('click', openChangelog);