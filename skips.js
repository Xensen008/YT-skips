function checkForAds(){
    let adExist = document.getElementsByClassName("ad-interrupting").length > 0;
    let video = document.getElementsByClassName("html5-main-video")[0];

    if (adExist && video){
        video.playbackRate = 16;
        video.muted = true;
    } else if (video) {
        video.muted = false;
    }

    let skipButton = document.querySelector(".ytp-ad-skip-button-modern");
    if (skipButton){
        skipButton.click();
    }
}

setInterval(checkForAds, 100);