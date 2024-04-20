async function loadPlayPage(){
    try{
        const response = await fetch("play.html");
        if(!response.ok){
            throw new Error("Could not load game");
        }

        document.getElementsByTagName("html")[0].innerHTML = await response.text();
        initializeTrainer();
    }
    catch(error){
        console.log(error);
    }
}

document.addEventListener("DOMContentLoaded", (e)=>{
    document.getElementById("startGameBtn").addEventListener("click", loadPlayPage);
});


const frequencies = new Map();

frequencies.set("C", [261.63, 523.25, 1046.50]);
frequencies.set("C#", [277.18, 554.37]);
frequencies.set("D", [293.66, 587.33]);
frequencies.set("D#", [311.13, 622.25]);
frequencies.set("E", [329.63, 659.25]);
frequencies.set("F", [349.23, 698.46]);
frequencies.set("F#", [369.99, 739.99]);
frequencies.set("G", [392.00, 784.00]);
frequencies.set("G#", [415.30, 830.61]);
frequencies.set("A", [220.00, 440.00, 880.00]);
frequencies.set("A#", [233.08, 466.16, 932.33]);
frequencies.set("B", [246.94, 493.88, 987.77]);

let selectedKey = Array.from(frequencies.keys())[Math.floor(Math.random() * frequencies.size)];
let selectedNote = frequencies.get(selectedKey)[Math.floor(Math.random() * frequencies.get(selectedKey).length)];

function initializeTrainer(){
    const audioContext = new AudioContext();
    const volumeGain = audioContext.createGain();
    volumeGain.gain.value = 0.25;

    document.getElementById("volumeSlider").addEventListener("input", function changeVolume(e){
        volumeGain.gain.value = this.value;
    });

    volumeGain.connect(audioContext.destination);

    document.getElementById("playAudioBtn").addEventListener("click",(e)=>{
        playSound(selectedNote, volumeGain, audioContext);
    });

    const whiteKeys = document.querySelectorAll(".whiteKey, .blackKey");

    for(let i = 0; i < whiteKeys.length; i++){
        whiteKeys[i].addEventListener("click", ()=>{
            if(whiteKeys[i].dataset.keyId == selectedKey){
                alert("you won");
            } else {
                alert("You pressed " + whiteKeys[i].dataset.keyId + " , it was " + selectedKey);
            }
        });
    }
}

function playSound(frequency, gainNode, context){
    const oscillator = context.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.value = frequency;
    oscillator.connect(gainNode);

    oscillator.start();

    document.getElementById("playAudioBtn").disabled = true;

    setTimeout(function stopSound(){
        oscillator.stop();
        document.getElementById("playAudioBtn").disabled = false;
    }, 2000);
}

function loadWinPage(){

}

function loadDefeatPage(correctNote){

}
