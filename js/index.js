const drumElements = {
    hiHat: document.querySelector("#drumKit .hiHat"),
    crash: document.querySelector("#drumKit .crash"),
    ride: document.querySelector("#drumKit .ride"),
    kick: document.querySelector("#drumKit .kick"),
    snare: document.querySelector("#drumKit .snare"),
    tom: document.querySelector("#drumKit .tom"),
    mid: document.querySelector("#drumKit .mid"),
    floor: document.querySelector("#drumKit .floor")
}

const drumAudios = {
    h: document.getElementById("hiHat"),
    c: document.getElementById("crash"),
    r: document.getElementById("ride"),
    k: document.getElementById("kick"),
    s: document.getElementById("snare"),
    t: document.getElementById("tom"),
    m: document.getElementById("mid"),
    f: document.getElementById("floor")
}

let beatsPerMinute = 800





const playSound = (audio) => {    
    if (audio.currentTime > 0) {
        audio.currentTime = 0
    }
    audio.play()
}

const playBeatsRecursive = (tracks, index) => {
    if (index >= tracks[0].length) {
        return
    }

    tracks.forEach(track => {
        if (track[index].toLowerCase() in drumAudios) {            
            playSound(drumAudios[track[index].toLowerCase()])
        }
    })

    setTimeout(() => playBeatsRecursive(tracks, index + 1), (2000 * 60 / beatsPerMinute))
}


const playSong = () => {
    const tracks = []

    for (let i = 1; i < 3; i++) {
        const track = Array
            .from(document.querySelectorAll(`.group>input:nth-child(${i})`))
            .map(input => (input.value + ".".repeat(16 - input.value.length)).split(""))
            .reduce((a, b) => a.concat(b), [])

        tracks.push(track)
    }
    playBeatsRecursive(tracks, 0)
}

const addGroup = () => {
    const bar = document.createElement("div")
    bar.className = "group"

    const track1 = document.createElement("input")
    track1.maxLength = 16
    track1.type = "text"
    track1.className = "track"
    track1.spellcheck = false
    track1.value = "h.h.h.h.h.h.h.h." 

    const track2 = track1.cloneNode(false)
    track2.value = "k...s...k.k.s..."

    bar.appendChild(track1)
    bar.appendChild(track2)

    document.getElementById("song").appendChild(bar)
}

deleteBar = (barIndex) => {
    document.querySelector(`.bar:nth-child(${barIndex + 1})`).remove()
}

const animateButton = button => {
    if (button.classList.contains("pop")) {
        button.classList.remove("pop")
        button.offsetHeight
    }
    button.classList.add("pop")
}

document.querySelectorAll("#drumKit > button").forEach(button => {
    button.addEventListener("click", () => {
        playSound(button.children[0])
        animateButton(button)
    })
})

document.querySelectorAll("#drumBtns button").forEach(button => {
    button.addEventListener("click", () => drumElements[button.dataset.drum].click())
})

document.addEventListener("keydown", event => {
    const key = Object.keys(drumElements).find(el => el.substr(0, 1) === event.key)
    if (key) {
        drumElements[key].click()
    }
})

document.getElementById("addGroup").addEventListener("click", () => addGroup())
document.getElementById("playBtn").addEventListener("click", () => playSong())