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

function setupAudioControls(selectedKey){
    const audioPlayer = new Audio("../audio/" + selectedKey + ".ogg");
    audioPlayer.volume = 0.5;
    audioPlayer.play();

    document.getElementById("volumeSlider").addEventListener("input", function changeVolume(e){
        audioPlayer.volume = this.value;
    });

    document.getElementById("playAudioBtn").addEventListener("click",(e)=>{
        audioPlayer.play();
    });
}

function initializeTrainer(){
    const selectedKey = keys[Math.floor(Math.random() * keys.length)];
    setupAudioControls(selectedKey);

    const whiteKeys = document.querySelectorAll(".whiteKey, .blackKey");

    for(let i = 0; i < whiteKeys.length; i++){
        whiteKeys[i].addEventListener("click", ()=>{
            if(whiteKeys[i].dataset.keyId == selectedKey.substring(0, selectedKey.length - 1)){
                loadWinPage(selectedKey);
            } else {
                loadDefeatPage(selectedKey, whiteKeys[i].dataset.keyId);
            }
        });
    }
}

function setupResultsPage(correctNote){
    document.getElementById("correctNote").textContent = correctNote.substring(0, correctNote.length - 1);
    setupAudioControls(correctNote);
    document.getElementById("continueBtn").addEventListener("click", loadPlayPage);
}

async function loadWinPage(correctNote){
    try{
        const response = await fetch("win.html");
        if(!response.ok){
            throw new Error("Could not load page");
        }

        document.getElementsByTagName("html")[0].innerHTML = await response.text();
        document.getElementsByTagName("html")[0].className = "winHtml";
        setupResultsPage(correctNote);
    }
    catch(error){
        console.log(error);
    }
}

async function loadDefeatPage(correctNote, selectedNote){
    try{
        const response = await fetch("lost.html");
        if(!response.ok){
            throw new Error("Could not load page");
        }

        document.getElementsByTagName("html")[0].innerHTML = await response.text();
        document.getElementsByTagName("html")[0].className = "";
        setupResultsPage(correctNote);
        document.getElementById("resultsDesc").textContent = "You guessed " + selectedNote + ", but it was:";
    }
    catch(error){
        console.log(error);
    }
}
