"use strict"
const $ = document
const txtNameAllbom = $.querySelector('#txtNameAllbom')
const txtNameSinger = $.querySelector('#txtNameSinger')
const imgCoverMusic = $.querySelector('#imgCoverMusic')
const txt_timeMusic_start = $.querySelector('#txt_timeMusic_start')
const txtNameMusic = $.querySelector('#txtNameMusic')
const txt_timeMusic_end = $.querySelector('#txt_timeMusic_end')
const file_music = $.querySelector('#file_music')
const btn_skip_previous = $.querySelector('#btn_skip_previous')
const btn_play_circle = $.querySelector('#btn_play_circle')
const btn_skip_next = $.querySelector('#btn_skip_next')
const btn_fast_forward = $.querySelector('#btn_fast_forward')
const btn_repeat = $.querySelector('#btn_repeat')
const btn_replay = $.querySelector('#btn_replay')
const rangeMusic = $.querySelector('#rangeMusic')
const boxFastMusic = $.querySelector('#boxFastMusic')


const listMusic = [
    { id: 1, name: 'Dehaati', src: '../music/01Dehaati.mp3', singer: 'Shadmehr Aghili', cover: '../img/ShadmehrAghili-Dehati.jpg', Albom: 'Dehaati' },
    { id: 2, name: 'Khiali Nist', src: '../music/01KhialiNist.mp3', singer: 'Shadmehr Aghili', cover: '../img/ShadmehrAghili-KhialiNist.jpg', Albom: 'Khiali Nist' },
    { id: 3, name: 'kabeh', src: '../music/01Kabeh.mp3', singer: 'Moein', cover: '../img/Moein-Kabeh.jpg', Albom: 'Kabeh' },
    { id: 4, name: 'Mosafer', src: '../music/01Mosafer.mp3', singer: 'Shadmehr Aghili', cover: '../img/ShadmehrAghili-Mosafer.jpg', Albom: 'Mosafer' },
    { id: 5, name: 'Taghdir', src: '../music/01Taghdir.mp3', singer: 'Shadmehr Aghili', cover: '../img/ShadmehrAghili-Mosafer.jpg', Albom: 'Taghdir' },
    { id: 6, name: 'Navaei', src: '../music/03Navaei.mp3', singer: 'Shadmehr Aghili', cover: '../img/ShadmehrAghili-Dehati.jpg', Albom: 'Dehaati' },
]


let isPlay = false
let isRepeat = false
let isFastMusic = false
let idMusic = 1
let valuePlayBackRate = 1


function setData(e) {
    e.filter((event) => {
        if (event.id == idMusic) {
            txtNameAllbom.innerHTML = event.Albom
            txtNameMusic.innerHTML = event.name
            txtNameSinger.innerHTML = event.singer
            file_music.setAttribute('src', event.src)
            imgCoverMusic.classList.remove('bg-gray-400')
            imgCoverMusic.setAttribute(
                "style",
                `background-image: url('${event.cover}');`
            );
            file_music.addEventListener("loadedmetadata", () => {
                rangeMusic.max = file_music.duration;
            });
            rangeMusic.addEventListener("input", () => {
                file_music.currentTime = rangeMusic.value;
            });
        }
    })
}

function playMusic(e) {
    isPlay = true
    e.play()
    btn_play_circle.style.scale = 1.2
    imgCoverMusic.style.animation = 'cover 10s linear infinite'
    btn_play_circle.setAttribute('src', '../svg/pause_circle.svg')
}

function pauseMusic(e) {
    isPlay = false
    e.pause()
    btn_play_circle.style.scale = 1
    imgCoverMusic.style.animationPlayState = "paused";
    btn_play_circle.setAttribute('src', '../svg/play_circle.svg')
}

function checkPlay() {
    if (isPlay) {
        pauseMusic(file_music)
    } else {
        playMusic(file_music)
    }
}

function setNextMusic() {
    idMusic++
    isPlay = false
    setData(listMusic)
    checkPlay()
    if (idMusic > listMusic.length) {
        idMusic = 0
    }
}

function setPreviousMusic() {
    idMusic--
    isPlay = false
    setData(listMusic)
    checkPlay()
    if (idMusic < 0) {
        idMusic = listMusic.length + 1
    }
}


function repeatMusic() {
    if (!isRepeat) {
        isRepeat = true
        btn_repeat.style.scale = 1.4
        file_music.addEventListener('ended', () => {
            file_music.currentTime = 0
            isPlay = false
            checkPlay()
        })
    } else {
        isRepeat = false
        btn_repeat.style.scale = 1
    }
}

function replayMusic() {
    file_music.currentTime = 0
    btn_replay.style.rotate = '180deg'
    isPlay = false
    checkPlay()
    document.body.addEventListener('click', () => {
        btn_replay.style.rotate = '0deg'
    }, { capture: true })
}

function fastPlayMusic() {
    if (!isFastMusic) {
        btn_fast_forward.style.scale = 1.2
        isFastMusic = true
        boxFastMusic.classList.remove('hidden')
        boxFastMusic.classList.add('flex')
    } else {
        isFastMusic = false
        file_music.playbackRate = valuePlayBackRate
        btn_fast_forward.style.scale = 1
        boxFastMusic.classList.remove('flex')
        boxFastMusic.classList.add('hidden')
    }
}

function updateTime() {
    rangeMusic.value = file_music.currentTime;
    let min = Math.floor(file_music.currentTime / 60)
    let sec = Math.floor(file_music.currentTime % 60)
    sec < 10 ? sec = '0' + sec : sec
    txt_timeMusic_end.innerHTML = `${min}:${sec} `
    txt_timeMusic_start.innerHTML = `${Math.floor(file_music.duration / 60)}:${Math.floor(file_music.duration % 60)}`
}

btn_play_circle.addEventListener('click', checkPlay)
btn_skip_next.addEventListener('click', setNextMusic)
btn_skip_previous.addEventListener('click', setPreviousMusic)
btn_repeat.addEventListener('click', repeatMusic)
btn_replay.addEventListener('click', replayMusic)
btn_fast_forward.addEventListener('click', fastPlayMusic)
file_music.addEventListener("timeupdate", updateTime);

window.onload = setData(listMusic)



boxFastMusic.addEventListener('click', (e) => {
    valuePlayBackRate = e.target.innerHTML.trim()
    fastPlayMusic()
})

