async function loadPlayPage(){
    try{
        const response = await fetch("play.html");
        if(!response.ok){
            throw new Error("Could not load game");
        }

        document.getElementsByTagName("html")[0].innerHTML = await response.text();
    }
    catch(error){
        console.log(error);
    }
}

document.addEventListener("DOMContentLoaded", (e)=>{
    document.getElementById("startGameBtn").addEventListener("click", loadPlayPage);
});
