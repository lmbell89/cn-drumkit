const hiHat = document.getElementById("hiHat")
const crash = document.getElementById("crash")
const kick = document.getElementById("kick")
const snare = document.getElementById("snare")
const tom1 = document.getElementById("tom1")
const tom2 = document.getElementById("tom2")
const tom3 = document.getElementById("tom3")
const play = document.getElementById("playBtn")

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
let beatsPerMinute = 240

document.querySelectorAll(".drumBtn").forEach(button => {
    button.addEventListener("click", function(){ playSound(this.children[0])})
})




const playSound = (audio) => {    
    if (audio.currentTime > 0) {
        audio.currentTime = 0
    }
    audio.play()
}








const getBeats = () => {
    let beats = []

    document.querySelectorAll(".bar").forEach((bar, i) => {
        bar.querySelectorAll(".track").forEach((track, j) => {
            track.querySelectorAll("input").forEach((input, k) => {
                if (j === 0) {
                    beats.push([])
                }

                if (input.value in drums) {
                    const index = i * (BEATS_PER_BAR - 1) + k
                    beats[index].push(drums[input.value])
                }                
            })
        })
    })

    return beats
}

const playSong = () => {
    const beats = getBeats()

    const playBeat = (beats, index) => {
        if (index >= beats.length) {
            return
        }

        beats[index].forEach(audio => playSound(audio))
        setTimeout(() => playBeat(beats, index + 1), (2000 * 60 / beatsPerMinute))
    }

    playBeat(beats, 0)
}

play.addEventListener("click", () => playSong())