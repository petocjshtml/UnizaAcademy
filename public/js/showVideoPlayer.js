let isVideoPlayerVisible = false;
let player = null;
let updateInterval; 

function showVideoPlayer(videoTitle,videoLink,videoTime)
{
    const page_info = document.getElementById("page-info");
    const root = document.getElementById("root");
    videoTitle = decodeURIComponent(videoTitle);
    var backRedirect = "";
    switch(getLoginStatus())
    {
        case "admin":
            backRedirect = "stopVideoPlayer();showAdminStudySubjectPage();"
        break;
        default:
            backRedirect = "stopVideoPlayer();showStudySubjectPage();"
        break;
    }
    isVideoPlayerVisible = true;
    page_info.innerHTML= videoTime;
    root.innerHTML=`
     <div class="container mt-5 card">
       <div class="d-flex"><h3 class="mb-3">${videoTitle}</h3> </div>
       <div class="d-flex mb-3">
            <button class="btn btn-danger me-3"  type="button">Prehrať</button>
            <button class="btn btn-primary me-3"  type="button">Zastaviť</button>
            <button class="btn btn-success me-3"  type="button">Celá obrazovka</button>
            <button class="btn btn-secondary me-3" onclick="${backRedirect}"  type="button">Naspäť</button>
       </div>
       <hr>
       <div style="display:none;" id="videoPlayerIsPrezent">videoPlayerIsPrezent</div>
       <div id="videoPlayer"></div>
    </div>
    `;
    closeMenu();
    enableFooter(true);
    loadVideo(videoLink);
}

function loadVideo(videoLink) {
    // Načítaj YouTube IFrame API, ak ešte nie je načítaný
    if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(tag);
        window.onYouTubeIframeAPIReady = () => initializePlayer(videoLink);
    } else {
        initializePlayer(videoLink);
    }
}



function initializePlayer(videoLink) {
    // Extrahovanie ID videa z odkazu
    const videoId = extractVideoId(videoLink);

    // Nastavenie štýlu pre video element
    const videoPlayerElement = document.getElementById('videoPlayer');
    videoPlayerElement.style.width = '100%';
    videoPlayerElement.style.aspectRatio = '16/9';
    videoPlayerElement.style.maxHeight = '100vh'; // Obmedzenie na maximálnu výšku obrazovky

    // Inicializácia YouTube prehrávača
    player = new YT.Player('videoPlayer', {
        videoId: videoId,
        width: '100%',
        height: '100%',
        playerVars: {
            autoplay: 0,
            controls: 1,
            rel: 0,
            showinfo: 0,
        },
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange
        }
    });
}


function onPlayerReady(event) {
    // Nastavenie eventov pre tlačidlá Play a Pause
    const playButton = document.querySelector(".btn-danger");
    const pauseButton = document.querySelector(".btn-primary");
    const fullScreenButton = document.querySelector(".btn-success");
    const pageInfo = document.getElementById("page-info");
    playButton.addEventListener("click", () => player.playVideo());
    pauseButton.addEventListener("click", () => player.pauseVideo());
    fullScreenButton.addEventListener("click", () => {
        const iframe = player.getIframe();
        if (iframe.requestFullscreen) {
            iframe.requestFullscreen();
        } else if (iframe.webkitRequestFullscreen) { 
            iframe.webkitRequestFullscreen();
        } else if (iframe.msRequestFullscreen) { 
            iframe.msRequestFullscreen();
        }
        player.playVideo();
    });

    if (isVideoPlayerVisible) {
        updateInterval = setInterval(() => {
            if (isVideoPlayerVisible && isVideoPlayerPrezent() && player.getPlayerState() === YT.PlayerState.PLAYING) {
                pageInfo.innerHTML = formatTime(player.getCurrentTime());
            }
        }, 1000);
    }
}

function isVideoPlayerPrezent()
{
    return document.getElementById("videoPlayerIsPrezent").innerHTML.trim() === "videoPlayerIsPrezent";
}

function stopVideoPlayer() {
    isVideoPlayerVisible = false;
    clearInterval(updateInterval);
}


function onPlayerStateChange(event) {
    // Môžeš pridať ďalšiu logiku, ak potrebuješ reagovať na zmenu stavu prehrávača
}

function extractVideoId(videoLink) {
    // Extrahuje ID videa z odkazu (napr. https://www.youtube.com/watch?v=VIDEO_ID)
    const regex = /(?:https?:\/\/)?(?:www\.)?youtu(?:\.be\/|be\.com\/(?:watch\?v=|embed\/|v\/|.+\?v=))([^&\n?#]+)/;
    const matches = videoLink.match(regex);
    return matches && matches[1] ? matches[1] : null;
}

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formated = formattedHours === "00" ? `${formattedMinutes}:${secs}` : `${formattedHours}:${formattedMinutes}:${secs}`;
    return formated;
}

