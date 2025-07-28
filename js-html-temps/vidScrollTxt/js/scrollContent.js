let player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '180',
    width: '320',
    videoId: 'OQxX8zgyS2Y', // or dynamically inject this
    playerVars: { mute: 1 },
    events: {
      'onReady': onPlayerReady
    }
  });
}

function onPlayerReady(event) {
  document.body.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
      e.preventDefault();
      const state = player.getPlayerState();
      if (state === YT.PlayerState.PLAYING) {
        player.pauseVideo();
        pauseScroll();
      } else {
        player.playVideo();
        startScroll();
      }
    }
  });
}
