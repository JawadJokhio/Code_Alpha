const music = new Audio('songs/song1.mp3');

const songs = [
    {
        id:'1',
        songName:` On My Way <br><div class="subtitle">Alan Walker</div>`,
        poster:"Images/1.jpg"
    },
    {
        id:'2',
        songName:` Alan Walker <br><div class="subtitle">Alan Walker</div>`,
        poster:"Images/2.jpg"
    },
    {
        id:'3',
        songName:` PUCHDA HI NAHIN <br><div class="subtitle">Neha Kakkar </div>`,
        poster:"Images/3.jpg"
    },
    {
        id:'4',
        songName:` SADQAY <br><div class="subtitle">NEHAAL NASEEM</div>`,
        poster:"Images/4.jpg"
    },
    {
        id:'5',
        songName:` Chal Jaan De <br><div class="subtitle">Asim Azhar | Merub Ali</div>`,
        poster:"Images/5.jpg"
    },
    {
        id:'6',
        songName:` Mi Amor <br><div class="subtitle">Sharn x Bohemia </div>`,
        poster:"Images/6.jpg"
    },
    {
        id:'7',
        songName:` Aaj Ki Raat <br><div class="subtitle">Tamannaah Bhatia </div>`,
        poster:"Images/7.jpg"
    },
    {
        id:'8',
        songName:` JO TUM MERE HO <br><div class="subtitle">Anuv Jain</div>`,
        poster:"Images/8.jpg"
    }
    ,
    {
        id:'9',
        songName:` SUNIYAN SUNIYAN  <br><div class="subtitle">Juss x MixSingh</div>`,
        poster:"Images/9.jpg"
    },
    {
        id:'10',
        songName:` JAILER Kaavaali  <br><div class="subtitle">Sri Sai Kiran</div>`,
        poster:"Images/10.jpg"
    }
    ,
    {
        id:'11',
        songName:` Houdini <br><div class="subtitle">Dua Lipa</div>`,
        poster:"Images/11.jpg"
    } ,
    {
        id:'12',
        songName:` Levitating  <br><div class="subtitle">Dua Lipa</div>`,
        poster:"Images/12.jpg"
    } ,
    {
        id:'13',
        songName:` New Rule <br><div class="subtitle">Dua Lipa</div>`,
        poster:"Images/13.jpg"
    }
    ,
    {
        id:'14',
        songName:` Kaun Talha <br><div class="subtitle">Talha Anjum</div>`,
        poster:"Images/14.jpg"
    }
    ,
    {
        id:'15',
        songName:` Happy Hour<br><div class="subtitle">Talha Anjum</div>`,
        poster:"Images/15.jpg"
    }
    ,
    {
        id:'16',
        songName:`Baarishein <br><div class="subtitle">Anuv Jain</div>`,
        poster:"Images/16.jpg"
    }
];


Array.from(document.getElementsByClassName('song_item')).forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].poster;
    element.getElementsByTagName('h5')[0].innerHTML = songs[i].songName;
});

let masterPlay = document.getElementById('masterPlay');
let wave = document.getElementsByClassName('wave')[0];

masterPlay.addEventListener('click', () => {
    if (music.paused || music.currentTime <= 0) {
        music.play();
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add('active2');
    } else {
        music.pause();
        masterPlay.classList.add('bi-play-fill');
        masterPlay.classList.remove('bi-pause-fill');
        wave.classList.remove('active2');
    }
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('PlayListPlay')).forEach((element) => {
        element.classList.add('bi-play-circle-fill');
        element.classList.remove('bi-pause-circle-fill');
    });
};
const makeAllBackGround = () =>{
    Array.from(document.getElementsByClassName('song_item')).forEach((element) => {
        element.style.background = "rgb(105, 105, 170, 0)";
    });
}

let index = 0;
let posterMasterPlay = document.getElementById('posterMasterPlay');
let title = document.getElementById('title');

Array.from(document.getElementsByClassName('PlayListPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        index = e.target.id;
        makeAllPlays(); // Reset all play buttons before activating the current one
        e.target.classList.remove('bi-play-circle-fill');
        e.target.classList.add('bi-pause-circle-fill');
        music.src = `songs/song${index}.mp3`;
        posterMasterPlay.src = `images/${index}.jpg `;
        music.play();
        let songTitle = songs.filter((ele) => {
            return ele.id == index;
        });
        songTitle.forEach(ele => {
            let { songName } = ele;
            title.innerHTML = songName;
        });
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add('active2');
        music.addEventListener('ended', () => {
            masterPlay.classList.add('bi-play-fill');
            masterPlay.classList.remove('bi-pause-fill');
            wave.classList.remove('active2');
        });
        makeAllBackGround();
        Array.from(document.getElementsByClassName('song_item'))[`${index-1}`].style.background = "rgb(105, 105, 170, .1)";

    });
});

let currentStart = document.getElementById("currentStart");
let currentEnd = document.getElementById("currentEnd");
let seek = document.getElementById("seek")
let bar2 = document.getElementById("bar2")
let dot = document.getElementsByClassName("dot")[0]

music.addEventListener('timeupdate', () => {
    let music_curr = music.currentTime;
    let music_dur = music.duration;

    
    let dur_min = Math.floor(music_dur / 60);
    let dur_sec = Math.floor(music_dur % 60);
    if(dur_sec < 10) {
        dur_sec = `0${dur_sec}`; 
    }

    currentEnd.innerText = `${dur_min}:${dur_sec}`;

    
    let curr_min = Math.floor(music_curr / 60);
    let curr_sec = Math.floor(music_curr % 60);
    if(curr_sec < 10) {
        curr_sec = `0${curr_sec}`; 
    }

    currentStart.innerText = `${curr_min}:${curr_sec}`;

    let progressBar = parseInt ((music.currentTime/music.duration)*100);
    seek.value = progressBar
    let seekBar = seek.value
    bar2.style.width = `${seekBar}%`;
    dot.style.left = `${seekBar}%`;
});

seek.addEventListener ('change' , ()=>{
    music.currentTime = seek.value * music.duration/100;
})
music.addEventListener('ended',()=>{
   
    masterPlay.classList.add('bi-play-fill');
    masterPlay.classList.remove('bi-pause-fill');
    wave.classList.remove('active2');
})
let volIcon = document.getElementById("volIcon");
let vol = document.getElementById("vol");
let volDot = document.getElementById("volDot");
let volBar = document.getElementById("volBar");

vol.addEventListener('change',()=>{
    if(vol.value == 0){
        volIcon.classList.remove('bi-volume-down-fill')
        volIcon.classList.add('bi-volume-mute-fill')
        volIcon.classList.remove('bi-volume-up-fill')
    }
    if(vol.value > 0){
        volIcon.classList.add('bi-volume-down-fill')
        volIcon.classList.remove('bi-volume-mute-fill')
        volIcon.classList.remove('bi-volume-up-fill')
    }
    if(vol.value > 50){
        volIcon.classList.remove('bi-volume-down-fill')
        volIcon.classList.remove('bi-volume-mute-fill')
        volIcon.classList.add('bi-volume-up-fill')
    }

    let vol_a = vol.value;
    volBar.style.width = `${vol_a}%`;
    volDot.style.width = `${vol_a}%`;
    music.volume = vol_a/100;
})
let back = document.getElementById('back');
let next = document.getElementById('next'); // Ensure next button is correctly assigned

back.addEventListener('click', () => {
    index--; // Decrease the index

    // Wrap around if index is less than 1
    if (index < 1) {
        index = Array.from(document.getElementsByClassName('song_item')).length;
    }

    // Update music source and play
    music.src = `songs/song${index}.mp3`;
    posterMasterPlay.src = `images/${index}.jpg`;
    music.play();

    // Update song title
    let songTitle = songs.filter((ele) => {
        return ele.id == index;
    });
    songTitle.forEach(ele => {
        let { songName } = ele;
        title.innerHTML = songName;
    });

    // Reset all play buttons and background
    makeAllPlays();
    makeAllBackGround();
    
    // Set current song button to pause
    document.getElementById(`${index}`).classList.remove("bi-play-circle-fill");
    document.getElementById(`${index}`).classList.add("bi-pause-circle-fill");

    // Update background for the current song item
    Array.from(document.getElementsByClassName('song_item'))[index - 1].style.background = "rgb(105, 105, 170, .1)";
});

next.addEventListener('click', () => {
    index++; // Increase the index

    // Wrap around if index exceeds the number of songs
    if (index > Array.from(document.getElementsByClassName('song_item')).length) {
        index = 1;
    }

    // Update music source and play
    music.src = `songs/song${index}.mp3`;
    posterMasterPlay.src = `images/${index}.jpg`;
    music.play();

    // Update song title
    let songTitle = songs.filter((ele) => {
        return ele.id == index;
    });
    songTitle.forEach(ele => {
        let { songName } = ele;
        title.innerHTML = songName;
    });

    // Reset all play buttons and background
    makeAllPlays();
    makeAllBackGround();

    // Set current song button to pause
    document.getElementById(`${index}`).classList.remove("bi-play-circle-fill");
    document.getElementById(`${index}`).classList.add("bi-pause-circle-fill");

    // Update background for the current song item
    Array.from(document.getElementsByClassName('song_item'))[index - 1].style.background = "rgb(105, 105, 170, .1)";
});

// Only use one reference to the same element
let leftScroll = document.getElementById('leftScroll');
let rightScroll = document.getElementById('rightScroll');
let popSong = document.getElementsByClassName('popSong')[0];

leftScroll.addEventListener('click', () => {
    popSong.scrollLeft -= 330;
});

rightScroll.addEventListener('click', () => {
    popSong.scrollLeft += 330;
});

// If you also need separate scroll buttons
let leftScrolls = document.getElementById('leftScrolls');
let rightScrolls = document.getElementById('rightScrolls');
let item = document.getElementsByClassName('item')[0];
leftScrolls.addEventListener('click', () => {
    item.scrollLeft -= 300;
});

rightScrolls.addEventListener('click', () => {
    item.scrollLeft += 300;
});
