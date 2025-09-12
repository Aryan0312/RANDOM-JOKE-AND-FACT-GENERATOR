let url;
let timeoutId = null; 

// fetch(url,{
//     headers:{
//         "Accept":"application/json"
//     }
// })
// .then((response)=>
// {
//     console.log(response);
//     return response.json();
// })
// .then((data)=>{
//    console.log(data.joke);
//    return fetch(url,{
//     headers:{
//         "Accept":"application/json"
//     }
// });
   
// })
// .then((res)=>{
//     return res.json();
// })
// .then((data2)=>{
//     console.log(data2.joke);
    
// })
// .catch((err)=>{
//     console.log(err);
// })
let btn = document.querySelector("button");
let dropdown = document.querySelector("#dropdown");

btn.addEventListener("click",joketextcall);
// Listen for keypresses anywhere on the page
document.addEventListener("keydown", (event) => {
    // Check if Enter was pressed
    if(event.key === "Enter"){
        // Trigger your button click logic
        joketextcall(); // calls the same click handler
    }
});


// function jokeInEvery(time,count){
    
//     let c =0
    
//         let intervalid= setInterval(async() => {
        
//         if(c==count){
//             clearInterval(intervalid);
//             return;
//         }
//         let jokeData = await getJoke();
//         if(jokeData){
//             console.log(jokeData.joke);
//         }
//         c++;
//     }, time*1000);

//     }

function joketextcall(){
    btn.disabled = true;

    document.querySelector(".cont").innerHTML = "";
    url = "https://icanhazdadjoke.com/";
    let selected = dropdown.value;

    if(selected == "dadjokes"){
        // async function getJoke(url){
        
        fetch(url,{
                headers:{
                    "Accept":"application/json"
                }
        })
        .then((res)=>{
            return res.json();
            
        })
        .then((res)=>{

            dataPrint(res.joke);
            console.log(res.joke);
            btn.disabled = false;

        })
        .catch((err)=>{
            console.log("api doesnt work ",err);
            btn.disabled = false;

        })
        
        
        // }
    }else if(selected == "uselessfacts"){
        url = "https://uselessfacts.jsph.pl/api/v2/facts/random";
        
        fetch(url)
        .then((res)=>{
            return res.json();
        })
        .then((res)=>{
            dataPrint(res.text);
            console.log(res.text);
            btn.disabled = false;

        })
        .catch((err)=>{
            console.log("api doesnt work ",err);
            btn.disabled = false;

        })
        
    }else if(selected == "randomjokes"){
        url = "https://v2.jokeapi.dev/joke/Any";
        
        fetch(url)
        .then((res)=>{
            return res.json();
        })
        .then((res)=>{
            if(res.type == "single"){
                console.log(res.joke);
                dataPrint(res.joke);
            }else if(res.type == "twopart"){
                console.log(res.setup);
                console.log(res.delivery);
                dataPrint(res.setup,res.delivery);

            }
        })
        .catch((err)=>{
        console.log("api doesnt work ",err);
            btn.disabled = false;

        })

    }else{
        console.log("first select an option");
            btn.disabled = false;

        let cont = document.querySelector(".cont");
        cont.innerHTML = "";

        let h1 = document.createElement("h2");
        h1.innerText = "First select an option";
        cont.appendChild(h1);
    }
}




function dataPrint(...lines){
        if(timeoutId){
        clearTimeout(timeoutId);
        timeoutId = null;
    }

    let cont = document.querySelector(".cont");
    cont.innerHTML = "";

    let h1 = document.createElement("h2");
    h1.innerText = lines[0];
    cont.appendChild(h1);

    if(lines.length > 1){
        let h2 = document.createElement("h2");
        h2.innerText = lines[1];

        // Ensure h1 is painted before starting the 3-sec pause
        requestAnimationFrame(() => {
            timeoutId = setTimeout(() => {
                cont.appendChild(h2);
                timeoutId = null;
                btn.disabled = false; // enable button after punchline
            }, 3000); // 3 seconds for comedic timing
        });
    } else {
        btn.disabled = false; // single line → enable button immediately
    }


}



