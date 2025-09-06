import { setPlayerInstance, getPlayer, getPlayerState, playVideo, pauseVideo } from './playerControl.js';
import { startScrollSync, stopScrollSync } from './scrollSync.js';
import { loadTimeline } from './sentenceData.js';
let vidId = 'IGHfPrIYngg'
let sentenceTimeline = [];
let currentSentenceIndex = 0;
const sentencesContainer = document.querySelector('.sentences-container')
// We will add changing sentence language here when time comes ....
function createSentenceElements(sentenceTimeline){
  console.log(sentenceTimeline)
  sentenceTimeline.forEach(({ id, chineseChar, pinyin: pinyinText, english: englishText }) => {  
    const sentence = document.createElement('div')
    const chineseContainer = document.createElement('div')
    const chineseCharEl = document.createElement('p')
    const pinyinEl = document.createElement('p')
    const englishEl = document.createElement('p')
    sentence.setAttribute('id',id)
    chineseCharEl.innerText = chineseChar
    pinyinEl.innerText = pinyinText
    englishEl.innerText = englishText
    console.log(sentence)

    sentence.classList.add('sentence')
    chineseContainer.classList.add('chinese-container')
    chineseCharEl.classList.add('chinese-char')
    pinyinEl.classList.add('pinyin')
    englishEl.classList.add('english')
    chineseContainer.appendChild(chineseCharEl)
    chineseContainer.appendChild(pinyinEl)
    sentence.appendChild(chineseContainer)
    sentence.appendChild(englishEl)
    sentencesContainer.append(sentence)

  })
}
loadTimeline()
  .then((data) => {
    sentenceTimeline = data;
    let initialized = false;
    createSentenceElements(sentenceTimeline)
  document.body.addEventListener('keydown', (e) => {
    const player = getPlayer();
    if (!player) return;

    const currentTime = player.getCurrentTime();
    // if(e.key == 'h'){
    //   const homelink = document.querySelector('#homelink')
    //   homelink.focus()
    // }
    // ⏯ Spacebar toggle
    switch (e.code){
      case 'Space':
        e.preventDefault();
        const state = getPlayerState();
        if (state === YT.PlayerState.PLAYING) {
          pauseVideo();
          stopScrollSync();
        } else {
          playVideo();
          startScrollSync(sentenceTimeline);
        }
        break

    }
    if (e.code === 'Space') {
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
