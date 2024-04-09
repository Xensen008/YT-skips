let isEnabled = true;
let blockedAds = 0;

function checkForAds(){
    if (!isEnabled) {
        return;
    }

    let adExist = document.getElementsByClassName("ad-interrupting").length > 0;
    let video = document.getElementsByClassName("html5-main-video")[0];

    if (adExist && video){
        video.playbackRate = 16;
        video.muted = true;
        blockedAds++;
        chrome.storage.sync.set({blockedAds: blockedAds});
    } else if (video) {
        video.muted = false;
    }

    let skipButton = document.querySelector(".ytp-ad-skip-button-modern");
    if (skipButton){
        skipButton.click();
    }
}

setInterval(checkForAds, 100);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.command == "toggle") {
        isEnabled = !isEnabled;
        chrome.storage.sync.set({enabled: isEnabled});
    }
});

chrome.storage.sync.get(['enabled', 'blockedAds'], function(data) {
    isEnabled = data.enabled !== undefined ? data.enabled : true;
    blockedAds = data.blockedAds || 0;
});