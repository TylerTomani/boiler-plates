import { setPlayerInstance, getPlayer, getPlayerState, playVideo, pauseVideo } from './playerControl.js';
import { startScrollSync, stopScrollSync } from './scrollSync.js';
import { loadTimeline } from './sentenceData.js';
let vidId = 'IGHfPrIYngg'
let sentenceTimeline = [];
let currentSentenceIndex = 0;

loadTimeline()
  .then((data) => {
    sentenceTimeline = data;
    let initialized = false;

  document.body.addEventListener('keydown', (e) => {
    const player = getPlayer();
    if (!player) return;

    const currentTime = player.getCurrentTime();
    if(e.key == 'p'){
      const part2 = document.querySelector('#part2')
      part2.focus()
    }
    // ⏯ Spacebar toggle
    if (e.code === 'Space') {
      e.preventDefault();
      const state = getPlayerState();
      if (state === YT.PlayerState.PLAYING) {
        pauseVideo();
        stopScrollSync();
      } else {
        playVideo();
        startScrollSync(sentenceTimeline);
      }
    }

    // ⬅️ Left arrow = go to previous sentence
    if (e.code === 'ArrowLeft') {
      e.preventDefault();

      if (!initialized) {
        currentSentenceIndex = findCurrentSentenceIndex(currentTime);
        initialized = true;
      }

      currentSentenceIndex = (currentSentenceIndex - 1 + sentenceTimeline.length) % sentenceTimeline.length;
      const target = sentenceTimeline[currentSentenceIndex];
      player.seekTo(target.time, true);
      highlightSentence(target.id);
    }

    // ➡️ Right arrow = go to next sentence
    if (e.code === 'ArrowRight') {
      e.preventDefault();

      if (!initialized) {
        currentSentenceIndex = findCurrentSentenceIndex(currentTime);
        initialized = true;
      }

      currentSentenceIndex = (currentSentenceIndex + 1) % sentenceTimeline.length;
      const target = sentenceTimeline[currentSentenceIndex];
      player.seekTo(target.time, true);
      highlightSentence(target.id);
    }
  });

  })
  .catch((err) => {
    console.error('Failed to load timeline:', err);
  });

window.onYouTubeIframeAPIReady = function () {
  const player = new YT.Player('player', {
    height: '180',
    width: '320',
    videoId: vidId, // your video ID here
    playerVars: {
      controls: 1,
      modestbranding: 1,
      rel: 0,
    },
    events: {
      onReady: (event) => {
        setPlayerInstance(event.target);
      }
    }
  });
};

// Load YouTube API script
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
document.head.appendChild(tag);

// 🔧 Helper: Find which sentence we're on
function findCurrentSentenceIndex(currentTime) {
  for (let i = 0; i < sentenceTimeline.length; i++) {
    const nextTime = sentenceTimeline[i + 1]?.time ?? Infinity;
    if (currentTime >= sentenceTimeline[i].time && currentTime < nextTime) {
      return i;
    }
  }
  return 0;
}

// 🔧 Helper: Highlight current sentence
function highlightSentence(targetId) {
  document.querySelectorAll('.sentence').forEach(el => {
    el.classList.remove('highlight');
  });

  const el = document.getElementById(targetId);
  if (el) {
    el.classList.add('highlight');
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}
