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

const SPEED = 100
let forceStop = false


const playSound = (audio) => {    
    if (audio.currentTime > 0) {
        audio.currentTime = 0
    }
    audio.play()
}

const stopPlaying = () => forceStop = true

const playBeatsRecursive = (tracks, index) => {
    if (index >= tracks[0].length || forceStop) {
        document.getElementById("playBtn").classList.remove("hidden")
        document.getElementById("stopBtn").classList.add("hidden")
        forceStop = false
        return
    }

    tracks.forEach(track => {
        if (track[index].toLowerCase() in drumAudios) {            
            playSound(drumAudios[track[index].toLowerCase()])
        }
    })

    setTimeout(() => playBeatsRecursive(tracks, index + 1), SPEED)
}


const playSong = () => {
    document.getElementById("playBtn").classList.add("hidden")
    document.getElementById("stopBtn").classList.remove("hidden")

    const tracks = []

    for (let i = 2; i < 4; i++) {
        const track = Array
            .from(document.querySelectorAll(`.group>input:nth-child(${i})`))
            .map(input => (input.value + ".".repeat(16 - input.value.length)).split(""))
            .reduce((a, b) => a.concat(b), [])

        tracks.push(track)
    }
    playBeatsRecursive(tracks, 0)
}

const addGroup = (value1="h.h.h.h.h.h.h.h.", value2="k...s...k.k.s...") => {
    const group = document.createElement("div")
    group.className = "group"

    const deleteBtn = document.createElement("button")
    deleteBtn.className = "delete"
    deleteBtn.addEventListener("click", () => group.remove())
    group.appendChild(deleteBtn)

    const track1 = document.createElement("input")
    track1.maxLength = 16
    track1.type = "text"
    track1.className = "track"
    track1.spellcheck = false
    track1.value = value1

    const track2 = track1.cloneNode(false)
    track2.value = value2

    group.appendChild(track1)
    group.appendChild(track2)

    document.getElementById("song").appendChild(group)
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
document.getElementById("stopBtn").addEventListener("click", () => stopPlaying())

/* CREATES A SAMPLE DRUM SOLO */
addGroup("ssssssssssssssss", "c.k.c.k.c.k.c.k.")
addGroup()
addGroup()
addGroup()
addGroup("sssst.t.mmmmf.f.", "k...k...k...k...")
addGroup("c", "k")