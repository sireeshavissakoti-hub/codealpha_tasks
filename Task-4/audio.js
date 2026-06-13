const audio = document.getElementById('audio-element');
const playBtn = document.getElementById('play');
const progress = document.getElementById('progress');
const playlistUI = document.getElementById('playlist');

const songs = [
  { title: "Song One", artist: "Artist A", src: "song1.mp3" },
  { title: "Song Two", artist: "Artist B", src: "song2.mp3" }
];

let songIndex = 0;

function loadSong(song) {
  document.getElementById('title').innerText = song.title;
  document.getElementById('artist').innerText = song.artist;
  audio.src = song.src;
}

function togglePlay() {
  if (audio.paused) {
    audio.play();
    playBtn.innerText = "Pause";
  } else {
    audio.pause();
    playBtn.innerText = "Play";
  }
}

// Update progress bar
audio.ontimeupdate = () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.value = percent || 0;
  document.getElementById('current-time').innerText = formatTime(audio.currentTime);
};

// Seek logic
progress.oninput = () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
};

// Volume
document.getElementById('volume').oninput = (e) => audio.volume = e.target.value;

// Next/Prev
document.getElementById('next').onclick = () => changeSong(1);
document.getElementById('prev').onclick = () => changeSong(-1);

function changeSong(dir) {
  songIndex = (songIndex + dir + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  audio.play();
}

// Autoplay bonus
audio.onended = () => changeSong(1);

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

loadSong(songs[songIndex]);