const radioPlayerInit = () => {
  const radio = document.querySelector('.radio');
  const radioCoverImg = radio.querySelector('.radio-cover__img');
  const radioHeaderBig = radio.querySelector('.radio-header__big');
  const radioNavigation = radio.querySelector('.radio-navigation');
  const radioItem = radio.querySelectorAll('.radio-item');
  const radioStop = radio.querySelector('.radio-stop');
  const radioVolume = radio.querySelector('.radio-volume');
  const radioMute = radio.querySelector('.radio-mute');

  const audio = new Audio();
  audio.type = 'audio/aac';

  radioStop.disabled = true;

  const changeIconPlay = () => {
    if (audio.paused) {
      radio.classList.remove('play');
      radioStop.classList.add('fa-play');
      radioStop.classList.remove('fa-stop');
    } else {
      radio.classList.add('play');
      radioStop.classList.add('fa-stop');
      radioStop.classList.remove('fa-play');
    }
  }

  const selectItem = elem => {
    radioItem.forEach(item => item.classList.remove('select'));
    elem.classList.add('select');
  }


  radioNavigation.addEventListener('change', (evt) => {
    const parent = evt.target.closest('.radio-item');
    selectItem(parent);

    const title = parent.querySelector('.radio-name').textContent;
    radioHeaderBig.textContent = title;

    const urlImg = parent.querySelector('.radio-img').src;
    radioCoverImg.src = urlImg;

    radioStop.disabled = false;
    audio.src = evt.target.dataset.radioStantion;
    audio.play();
    changeIconPlay();
  });

  radioStop.addEventListener('click', () => {
    audio.paused ? audio.play() : audio.pause();
    changeIconPlay();
  });

  radioVolume.addEventListener('input', () => {
    audio.volume = radioVolume.value / 100;
    prevVolume = audio.volume;
  })

  audio.volume = 0.5;

  radioVolume.value = audio.volume * 100;

  let prevVolume = 1; 

  radioMute.addEventListener('click', () => {
    if(audio.volume) {
      prevVolume = audio.volume;
      audio.volume = 0;
    } else {
      audio.volume = prevVolume;
    }
  })
}

export { radioPlayerInit };