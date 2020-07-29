const videoPlayerInit = () => {

  const videoPlayer = document.querySelector('.video-player');
  const videoBtnPlay = document.querySelector('.video-button__play');
  const videoBtnStop = document.querySelector('.video-button__stop');
  const videoProgress = document.querySelector('.video-progress');
  const videoTimePassed = document.querySelector('.video-time__passed');
  const videoTimeTotal = document.querySelector('.video-time__total');
  const videoFullscreen = document.querySelector('.video-fullscreen');
  const videoVolume = document.querySelector('.video-volume');

  const toggleIcon = () => {
    if (videoPlayer.paused) {
      videoBtnPlay.classList.remove('fa-pause');
      videoBtnPlay.classList.add('fa-play');
    } else {
      videoBtnPlay.classList.remove('fa-play');
      videoBtnPlay.classList.add('fa-pause');
    }
  }

  const togglePlay = () => videoPlayer.paused ? videoPlayer.play() : videoPlayer.pause();

  const stopPlay = () => {
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
  }

  videoPlayer.addEventListener('click', togglePlay);
  videoBtnPlay.addEventListener('click', togglePlay);
  document.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 32) {
      togglePlay();
    }
  });

  const addZero = n => n < 10 ? '0' + n : n;

  videoPlayer.addEventListener('play', toggleIcon);
  videoPlayer.addEventListener('pause', toggleIcon);

  videoBtnStop.addEventListener('click', stopPlay);

  const setTimeProgress = () => {
    const currentTime = videoPlayer.currentTime;
    const duration = videoPlayer.duration;

    videoProgress.value = (currentTime / duration) * 100;

    let mitutePassed = Math.floor(currentTime / 60);
    let secondsPassed = Math.floor(currentTime % 60);

    let mituteTotal = Math.floor(duration / 60);
    let secondsTotal = Math.floor(duration % 60);

    videoTimePassed.textContent = `${addZero(mitutePassed)}:${addZero(secondsPassed)}`;
    videoTimeTotal.textContent = `${addZero(mituteTotal)}:${addZero(secondsTotal)}`;
  }

  videoPlayer.addEventListener('timeupdate', setTimeProgress);


  videoProgress.addEventListener('input', () => {
    const duration = videoPlayer.duration;
    const value = videoProgress.value;

    videoPlayer.currentTime = (value * duration) / 100;
  })
  
  videoFullscreen.addEventListener('click', () => {
    videoPlayer.requestFullscreen();
  })

  videoVolume.addEventListener('input', () => {
    videoPlayer.volume = videoVolume.value / 100;
  })

  videoPlayer.volume = 0.5;

  videoVolume.value = videoPlayer.volume * 100;

};


export { videoPlayerInit };