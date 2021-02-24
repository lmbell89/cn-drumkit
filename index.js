const hiHat = document.getElementById("hiHat")
const crash = document.getElementById("crash")
const kick = document.getElementById("kick")
const snare = document.getElementById("snare")
const tom1 = document.getElementById("tom1")
const tom2 = document.getElementById("tom2")
const tom3 = document.getElementById("tom3")

const drums = {
    h: hiHat,
    c: crash,
    k: kick,
    s: snare,
    t1: tom1,
    t2: tom2,
    t3: tom3
}

const BEATS_PER_BAR = 8

let beatsPerMinute = 1000
let trackCount = 2;


const playSound = (audio) => {    
    if (audio.currentTime > 0) {
        audio.currentTime = 0
    }
    audio.play()
}

const playBeatsRecursive = (beats, index) => {
    if (index >= beats.length) {
        return
    }

    beats[index].forEach(audio => playSound(audio))
    setTimeout(() => playBeatsRecursive(beats, index + 1), (2000 * 60 / beatsPerMinute))
}


const playSong = () => {
    let beats = []

    document.querySelectorAll(".beat").forEach(beat => {
        beats.push([])

        for (let child of beat.children) {
            if (child.value in drums) {
                beats[beats.length - 1].push(drums[child.value])
            }
        }
    })

    playBeatsRecursive(beats, 0)
}

const addBar = () => {
    const bar = document.createElement("div")
    const deleteBtn = document.createElement("button")
    const barCount = document.querySelectorAll(".bar").length
 
    deleteBtn.setAttribute("data-index", barCount)
    deleteBtn.addEventListener("click", () => deleteBar(barCount))
    deleteBtn.innerHTML = "Delete Bar"

    bar.className = "bar"
    bar.appendChild(deleteBtn)

    for (let i = 0; i < BEATS_PER_BAR; i++) {
        const beat = document.createElement("div")
        beat.className = "beat"
        bar.appendChild(beat)

        for (let j = 0; j < trackCount; j++) {
            const track = document.createElement("input")
            track.type = "text"
            beat.appendChild(track)
        }
    }

    document.getElementById("song").appendChild(bar)
}

const addTrack = () => {
    document.querySelectorAll(".beat").forEach(beat => {
        const track = document.createElement("input")
        track.type = "text"
        beat.appendChild(track)
    })
}

deleteBar = (barIndex) => {
    document.querySelector(`.bar:nth-child(${barIndex + 1})`).remove()
}


document.querySelectorAll(".drumBtn").forEach(button => {
    button.addEventListener("click", () => {
        playSound(button.children[0])

        if (button.classList.contains("pop")) {
            button.classList.remove("pop")
            button.offsetHeight
        }
        button.classList.add("pop")
    })
})

document.getElementById("addBar").addEventListener("click", () => addBar())
document.getElementById("addTrack").addEventListener("click", () => addTrack())
document.getElementById("playBtn").addEventListener("click", () => playSong())