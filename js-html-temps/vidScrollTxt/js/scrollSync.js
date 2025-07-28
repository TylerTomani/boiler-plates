import { getPlayer } from './playerControl.js';

let scrollInterval = null;

export function startScrollSync(sentenceTimeline) {
  if (scrollInterval) return; // already running

  scrollInterval = setInterval(() => {
    const player = getPlayer();
    if (!player || !player.getCurrentTime) return;

    const currentTime = player.getCurrentTime();

    sentenceTimeline.forEach(({ time, id }, idx) => {
      const nextTime = sentenceTimeline[idx + 1]?.time ?? Infinity;
      const el = document.getElementById(id);
      // console.log(time,id)
      if (!el) return;

      if (currentTime >= time && currentTime < nextTime) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('highlight');
      } else {
        el.classList.remove('highlight');
      }
    });
  }, 200);
}

export function stopScrollSync() {
  clearInterval(scrollInterval);
  scrollInterval = null;
}
