let player;

export function setPlayerInstance(p) {
  player = p;
}

export function getPlayer() {
  return player;
}

export function playVideo() {
  if (player && player.playVideo) {
    player.playVideo();
  }
}

export function pauseVideo() {
  if (player && player.pauseVideo) {
    player.pauseVideo();
  }
}

export function getPlayerState() {
  return player?.getPlayerState?.();
}
