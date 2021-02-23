
const hiHat = document.getElementById("hiHat")
const crash = document.getElementById("crash")
const kick = document.getElementById("kick")
const snare = document.getElementById("snare")
const tom1 = document.getElementById("tom1")
const tom2 = document.getElementById("tom2")
const tom3 = document.getElementById("tom3")

const playSound = (audio) => {    
    if (audio.currentTime > 0) {
        audio.currentTime = 0
    }
    audio.play()
}

document.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", function(){ playSound(this.children[0])})
})