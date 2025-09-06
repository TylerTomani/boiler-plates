// let speed = 5;
let speed = 0.25;

const speedIN = document.querySelector('#speedIN')
let speedINFocused = false
let play = false
const container = document.querySelector('.scroll-container');
let position = 0;
let isScrolling = false ;
let animationId = null;
let player = null;
let playerReady = false;
addEventListener("DOMContentLoaded", () => {
    // container.focus();
    // startScrolling();
});

speedIN.addEventListener('change', e =>{
    speed = e.target.value
})
speedIN.addEventListener('focus', e =>{
    speedINFocused = true
})
speedIN.addEventListener('focusout', e =>{
    speedINFocused = false
})
speedIN.addEventListener('click', e => {
    console.log(e.target)
    e.target.focus()
})
// Key events
addEventListener('keydown', e => {
    const key = e.keyCode;
    let letter = e.key.toLowerCase()
    if (letter == 'f' || letter == 'l' || letter == 'i'){
        speedIN.focus()
    }
    
        
    if (letter === 'm') {
        const mainContainer = document.querySelector('#mainContainer')
        mainContainer.focus
        // if (playerReady && player) {
        //     if (player.isMuted()) {
        //         player.unMute();
        //         console.log("Unmuted");
        //     } else {
        //         player.mute();
        //         console.log("Muted");
        //     }
        // }
    }
    
    // Spacebar: toggle scroll + video play/pause
    if (key === 32) {
        e.preventDefault();
        toggleScroll();
        if (playerReady && player) {
            if (player.isMuted()) {
                player.unMute();
                console.log("Unmuted");
            } else {
                player.mute();
                console.log("Muted");
            }
        }
        toggleVideo();
    }

    // Faster with Shift or Meta (Cmd/Ctrl)
    const moveSpeed = e.shiftKey || e.metaKey ? 350 : 30;
    const minPosition = -(container.scrollHeight - window.innerHeight);
    const maxPosition = 0;

    if(!speedINFocused){
        if (key === 40) { // down arrow
            // Only scroll down if not already at bottom limit
            if (position > minPosition) {
                position = Math.max(minPosition, position - moveSpeed);
                updatePosition();
            }
        }
        
        if (key === 38) { // up arrow
            // Only scroll up if not already at top
            if (position < maxPosition) {
                position = Math.min(maxPosition, position + moveSpeed);
                updatePosition();
            }
        }
        
    }

    // Video Controls
    // Left arrow — rewind video 5 seconds
    if (key === 37) {
        if (playerReady && player) {
            const currentTime = player.getCurrentTime();
            player.seekTo(Math.max(0, currentTime - 5), true);
        }
    }

    // Right arrow — fast forward video 5 seconds
    if (key === 39) {
        if (playerReady && player) {
            const currentTime = player.getCurrentTime();
            const duration = player.getDuration();
            player.seekTo(Math.min(duration, currentTime + 5), true);
        }
    }

    // increment speedIN
    if(e.shiftkey && e.metaKey){
        speedIN.setAttribute('step', '.001')
    }else if(e.shiftKey){
        speedIN.setAttribute('step', '.01')
    } else {
        speedIN.setAttribute('step', '.1')
    }
    if (letter == 't') {
        position = 0
        updatePosition();

    }
});

// Click toggles scroll only
addEventListener('click', () => {
    toggleScroll();
});

function toggleScroll() {
    isScrolling = !isScrolling;
    if (isScrolling) {
        startScrolling();
    } else {
        cancelAnimationFrame(animationId);
    }
}

function startScrolling() {
    cancelAnimationFrame(animationId);
    scrollContent();    
}
function scrollContent() {
    // const minPosition = -(container.scrollHeight - window.innerHeight);
    // const minPosition = -(container.scrollHeight - 500);
    const maxPosition = Math.abs(container.scrollHeight - container.scrollHeight * .6);
    
    if (Math.abs(position) > maxPosition ) {
        position = 0;
    }
    position -= speed;
    updatePosition();
    animationId = requestAnimationFrame(scrollContent);
    // const state = player.getPlayerState()
    // player.play()
}
function updatePosition() {
    container.style.top = `${position}px`;
}
// function toggleVideo() {
//     if (playerReady && player) {
//         const state = player.getPlayerState();
//         if (state === YT.PlayerState.PLAYING) {
//             player.pauseVideo();
//         } else {
//             player.playVideo();
//             player.unmute()
//             isScrolling = true
//             startScrolling()
            
            
//         }
//     }
// }

// function onYouTubeIframeAPIReady() {
//     player = new YT.Player('player', {
//         events: {
//             'onReady': () => {
//                 playerReady = true;
//             }
//         }
//     });
// }
