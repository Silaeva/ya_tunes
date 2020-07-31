import { addZero } from './supportScripts.js';

const musicPlayerInit = () => {
  const audio = document.querySelector('.audio');
  const audioImg = audio.querySelector('.audio-img');
  const audioHeader = audio.querySelector('.audio-header');
  const audioPlayer = audio.querySelector('.audio-player');
  const audioNavigation = audio.querySelector('.audio-navigation');
  const audioButtonPlay = audio.querySelector('.audio-button__play');
  const audioProgress = audio.querySelector('.audio-progress');
  const audioProgressTiming = audio.querySelector('.audio-progress__timing');
  const audioTimePassed = audio.querySelector('.audio-time__passed');
  const audioTimeTotal = audio.querySelector('.audio-time__total');

  const playList = ['hello', 'flow', 'speed'];

  let trackIndex = 0;

  const loadTrack = () => {
    const isPlayed = audio.paused;
    const track = playList[trackIndex];

    audioImg.src = `./audio/${track}.jpg`;
    audioHeader.textContent = track.toLocaleUpperCase();
    audioPlayer.src = `./audio/${track}.mp3`;

    isPlayed ? audioPlayer.pause() : audioPlayer.play();
  };

  const switchOnPrevTrack = () => {
    trackIndex ? trackIndex-- : trackIndex = playList.length - 1;
    loadTrack();
  }

  const switchOnNextTrack = () => {
    trackIndex === playList.length - 1 ? trackIndex = 0 : trackIndex++;
    loadTrack();
  }

  audioNavigation.addEventListener('click', (evt) => {
    const target = evt.target;

    if (target.classList.contains('audio-button__play')) {
      audio.classList.toggle('play');
      audioButtonPlay.classList.toggle('fa-play');
      audioButtonPlay.classList.toggle('fa-pause');

      audioPlayer.paused ? audioPlayer.play() : audioPlayer.pause();

      const track = playList[trackIndex];
      audioHeader.textContent = track.toLocaleUpperCase();
    }

    if (target.classList.contains('audio-button__prev')) {
      switchOnPrevTrack();
    }


    if (target.classList.contains('audio-button__next')) {
      switchOnNextTrack();
    }

  });

  audioPlayer.addEventListener('ended', () => {
    switchOnNextTrack();
    audioPlayer.play();
  });

  audioPlayer.addEventListener('timeupdate', () => {
    const duration = audioPlayer.duration;
    const currentTime = audioPlayer.currentTime;
    const progress = (currentTime / duration) * 100;

    audioProgressTiming.style.width = progress + '%';

    const minutesPassed = Math.floor(currentTime / 60) || '0';
    const secondsPassed = Math.floor(currentTime % 60) || '0';

    const minutesTotal = Math.floor(duration / 60) || '0';
    const secondsTotal = Math.floor(duration % 60) || '0';

    audioTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`;
    audioTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`;
  });

  audioProgress.addEventListener('click', (evt) => {
    const x = evt.offsetX;
    const allWidth = audioProgress.clientWidth;
    const progress = (x / allWidth) * audioPlayer.duration;
    audioPlayer.currentTime = progress;
  });

  musicPlayerInit.stop = () => {
    if (!audioPlayer.paused) {
      audioPlayer.pause();
      audio.classList.remove('play');
      audioButtonPlay.classList.remove('fa-pause');
      audioButtonPlay.classList.add('fa-play');
    }
  }
}

export { musicPlayerInit };