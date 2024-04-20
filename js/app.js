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


const keys = [];
keys.push("A3", "Bb3", "B3");
keys.push("C4", "Db4", "D4", "Eb4", "E4", "F4", "Gb4", "G4", "Ab4", "A4", "Bb4", "B4");
keys.push("C5", "Db5", "D5", "Eb5", "E5", "F5", "Gb5", "G5", "Ab5", "A5", "Bb5", "B5");
keys.push("C6");

let selectedKey = keys[Math.floor(Math.random() * keys.length)];

function initializeTrainer(){
    const audioPlayer = new Audio("../audio/" + selectedKey + ".ogg");
    audioPlayer.volume = 0.5;
    audioPlayer.play();

    document.getElementById("volumeSlider").addEventListener("input", function changeVolume(e){
        audioPlayer.volume = this.value;
    });

    document.getElementById("playAudioBtn").addEventListener("click",(e)=>{
        audioPlayer.play();
    });

    const whiteKeys = document.querySelectorAll(".whiteKey, .blackKey");

    for(let i = 0; i < whiteKeys.length; i++){
        whiteKeys[i].addEventListener("click", ()=>{
            if(whiteKeys[i].dataset.keyId == selectedKey.substring(0, selectedKey.length - 1)){
                alert("you won");
            } else {
                alert("You pressed " + whiteKeys[i].dataset.keyId + ", it was " + selectedKey.substring(0, selectedKey.length - 1));
            }
        });
    }
}

function loadWinPage(){

}

function loadDefeatPage(correctNote){

}
