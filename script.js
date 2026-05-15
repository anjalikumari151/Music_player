const songs = [

{
    title:"Dil",
    artist:"Raghav Chaitanya",
    src:"song1.mp3",
    cover:"songimg1.png"
},

{
    title:"Shaamat",
    artist:"Ankit Tiwari",
    src:"song2.mp3",
    cover:"songimg2.png"
},

{
    title:"Sahiba",
    artist:"Aditya Rikhari",
    src:"song3.mp3",
    cover:"songimg3.png"
},

{
    title:"Tu Hai Toh Mai Hoon",
    artist:"Irshad Kamil",
    src:"song4.mp3",
    cover:"songimg4.png"
}

];

const audio = document.getElementById("audio");

const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");

const current = document.getElementById("current");
const duration = document.getElementById("duration");

const songElements = document.querySelectorAll(".song");

let songIndex = 0;
let isPlaying = false;

/* LOAD SONG */

function loadSong(index){

    const song = songs[index];

    title.innerText = song.title;
    artist.innerText = song.artist;
    cover.src = song.cover;
    audio.src = song.src;

    highlightSong();

}

/* HIGHLIGHT SONG */

function highlightSong(){

    songElements.forEach((song, index)=>{

        song.classList.remove("active");

        const button = song.querySelector(".play-small");

        button.innerHTML = "Play";

        if(index === songIndex){

            song.classList.add("active");

            if(isPlaying){
                button.innerHTML = "Pause";
            }

        }

    });

}

/* PLAY SONG */

function playSong(){

    isPlaying = true;

    audio.play();

    playBtn.innerHTML = "⏸";

    highlightSong();

}

/* PAUSE SONG */

function pauseSong(){

    isPlaying = false;

    audio.pause();

    playBtn.innerHTML = "▶";

    highlightSong();

}

/* MAIN PLAY BUTTON */

playBtn.addEventListener("click",()=>{

    if(isPlaying){
        pauseSong();
    }
    else{
        playSong();
    }

});

/* NEXT BUTTON */

nextBtn.addEventListener("click",()=>{

    songIndex++;

    if(songIndex > songs.length - 1){
        songIndex = 0;
    }

    loadSong(songIndex);

    playSong();

});

/* PREVIOUS BUTTON */

prevBtn.addEventListener("click",()=>{

    songIndex--;

    if(songIndex < 0){
        songIndex = songs.length - 1;
    }

    loadSong(songIndex);

    playSong();

});

/* CLICK SONG */

songElements.forEach(song=>{

    song.addEventListener("click",()=>{

        const clickedIndex = Number(song.dataset.index);

        if(songIndex === clickedIndex && isPlaying){

            pauseSong();

        }else{

            songIndex = clickedIndex;

            loadSong(songIndex);

            playSong();

        }

    });

});

/* TIME UPDATE */

audio.addEventListener("timeupdate",()=>{

    current.innerText = formatTime(audio.currentTime);

    if(audio.duration){

        duration.innerText = formatTime(audio.duration);

    }

});

/* FORMAT TIME */

function formatTime(time){

    const mins = Math.floor(time / 60);

    const secs = Math.floor(time % 60);

    return `${mins}:${secs < 10 ? "0"+secs : secs}`;

}

/* AUTO NEXT */

audio.addEventListener("ended",()=>{

    nextBtn.click();

});

/* INITIAL LOAD */

loadSong(songIndex);