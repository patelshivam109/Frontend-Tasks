const songs = [
    { title:"Sundari-Sundari", artist:"Sanju Rathod", src:"sundari.mp3" },
    { title:"NO_Batidao", artist:"ZXKAI, slxughter", src:"NO_BATIDAO.mp3" },
    { title:"TAKI TAKI", artist:"DJ Snake", src:"DJ Snake - Taki Taki Mp3 Song.mp3" }
];

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progressContainer");
const currentEl = document.getElementById("current");
const durationEl = document.getElementById("duration");
const volume = document.getElementById("volume");
const playlist = document.getElementById("playlist");

let index = 0;
let isPlaying = false;

/* LOAD SONG */
function loadSong(i){
    audio.src = songs[i].src;
    title.textContent = songs[i].title;
    artist.textContent = songs[i].artist;
    updatePlaylist();
}
loadSong(index);

/* PLAY / PAUSE */
playBtn.addEventListener("click",()=>{
    if(isPlaying){
        audio.pause();
        playBtn.textContent = "▶";
    }else{
        audio.play();
        playBtn.textContent = "⏸";
    }
    isPlaying = !isPlaying;
});

/* NEXT / PREV */
nextBtn.onclick = ()=>{
    index = (index + 1) % songs.length;
    loadSong(index);
    audio.play();
    isPlaying = true;
    playBtn.textContent = "⏸";
};

prevBtn.onclick = ()=>{
    index = (index - 1 + songs.length) % songs.length;
    loadSong(index);
    audio.play();
    isPlaying = true;
    playBtn.textContent = "⏸";
};

/* PROGRESS */
audio.addEventListener("timeupdate",()=>{
    if(!audio.duration) return;
    progress.style.width = (audio.currentTime / audio.duration) * 100 + "%";
    currentEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
});

/* SEEK */
progressContainer.onclick = (e)=>{
    audio.currentTime = (e.offsetX / progressContainer.clientWidth) * audio.duration;
};

/* VOLUME */
volume.oninput = ()=> audio.volume = volume.value;

/* AUTOPLAY */
audio.onended = ()=> nextBtn.click();

/* PLAYLIST */
function updatePlaylist(){
    playlist.innerHTML = "";
    songs.forEach((s,i)=>{
        const li = document.createElement("li");
        li.textContent = s.title;
        if(i === index) li.classList.add("active");
        li.onclick = ()=>{
            index = i;
            loadSong(index);
            audio.play();
            playBtn.textContent = "⏸";
            isPlaying = true;
        };
        playlist.appendChild(li);
    });
}

/* TIME FORMAT */
function formatTime(time){
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60).toString().padStart(2,"0");
    return `${min}:${sec}`;
}
