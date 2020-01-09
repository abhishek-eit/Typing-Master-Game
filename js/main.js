let layer2 = document.querySelector('#layer2');
let lifeDiv = document.querySelector('#lifeNum');
let scoreDiv = document.querySelector('#scoreNum');
let results = document.querySelector('.results');
let interval1, interval2;

let isActive = true;

document.querySelector("#btn5").addEventListener('click',function(){
    document.querySelector('#layer1').style.display = "none";
    layer2.style.display = "block";
    start();
})
document.querySelector(".home").addEventListener('click',function(){
    layer2.style.display = "none";
    results.style.display = "none";
    clearInterval(interval1);
    clearInterval(interval2);
    while(layer2.childElementCount > 1){
        for(child of layer2.children){
            if(child.classList == "cloud"){
                layer2.removeChild(child);
            }
        }
    }
    document.querySelector('#layer1').style.display = "block";
})

window.addEventListener('focus',function(){
    isActive = true;
})
window.addEventListener('blur',function(){
    isActive = false;
})

let wordArray = ["empty", "baseball", "violet", "healthy", "redundant", "mint", "barbarous", "three", "steer", "verse", "guess", "scrawny", "unbiased", "harm", "flash", "trick", "kitty", "flower", "scissors", "post", "abnormal", "fortunate", "jealous", "joyous", "clap", "eager", "agreement", "damaged", "hospitable", "crabby", "dull", "bright", "shop", "hushed", "plastic", "perfect", "prestigious", "friends", "strap", "crime", "tightfisted", "cover", "attack", "robust", "mother", "orange", "behavior", "love", "grass", "decorate", "beds", "level", "sturdy", "shop", "combative", "righteous", "repair", "pocket", "trap", "downtown", "spicy", "rampant", "historical", "tendency", "finger", "materialistic", "sack", "same", "sneeze", "hole", "horn", "luxuriant", "half", "company", "chance", "interrupt", "kettle", "lush", "flag", "careless", "jagged", "sparkle", "nifty", "brief", "remain", "pause", "vast", "moldy", "idiotic", "roasted", "property", "industry", "curve", "damaging", "moaning", "high", "incredible", "puffy", "trick", "price"];

let divArray = [];
let lifes = 3,
    score = 0;

function start(){
    divArray = [];
    lifes = 3;
    lifeDiv.innerHTML = lifes;
    score = 0;
    scoreDiv.innerHTML = score;
    makeCloud();

    interval1 = setInterval(makeCloud ,3000);

    function makeCloud(){
        if(isActive){
            // create the DIV
            let div = document.createElement('div');
            div.classList.add("cloud");

            // append a word and background cloud image to that div
            let word = wordArray[Math.floor(Math.random()*99)].toUpperCase();
            let progress = 0;
            let html = "";
            for(i=0; i<word.length; i++){
                if(i<progress){
                    html = html + '<span style="color: red;">' + word[i] + '</span>';
                } else {
                    html = html + '<span style="color: black;">' + word[i] + '</span>';
                }
            }
            html = html + '<img src="../images/small-cloud.png" style="position: absolute; z-index: -1; width: 300%; transform: translate(-70%, -45%);">'
            div.innerHTML = html;

            // attach div to the layer
            layer2.appendChild(div);
            let x = (Math.random() * (window.innerWidth-150)) + 50;
            let y = 20;
            div.style.left = x+"px";
            div.style.top = y+"px";
    
            divArray.push({
                div,
                word,
                active : false,
                progress,

            });
        }
    }

    interval2 = window.setInterval(animate,20);

    function animate(){
        if(isActive){
            divArray.forEach(function(obj,index){
                if(parseInt(obj.div.style.top) < window.innerHeight){
                    obj.div.style.top = (parseInt(obj.div.style.top) + 1) + "px" ;
                } else {
                    loselife();
                    if(lifes != 0){
                        layer2.removeChild(obj.div);
                        divArray.splice(index,1);
                    }
                }
            })
        }
    }

}




///////////// key press actions /////////////////////////////////////////////

window.addEventListener('keydown',keyPressed);

function keyPressed(e){
    // console.log(e.keyCode);
    flag = 0;
    for(i=0; i<divArray.length; i++){
        if( divArray[i].active == "true" ){
            flag = 1;
            if(divArray[i].word.charCodeAt(divArray[i].progress) == e.keyCode){
                divArray[i].progress++;

                let html = "";
                for(j=0; j<divArray[i].word.length; j++){
                    if(j<divArray[i].progress){
                        html = html + '<span style="color: red;">' + divArray[i].word[j] + '</span>';
                    } else {
                        html = html + '<span style="color: black;">' + divArray[i].word[j] + '</span>';
                    }
                }
                html = html + '<img src="../images/small-cloud.png" style="position: absolute; z-index: -1; width: 300%; transform: translate(-70%, -45%);">'
                divArray[i].div.innerHTML = html;                

                // CHECK IF WORD IS COMPLETE
                if(divArray[i].progress == divArray[i].word.length){
                    layer2.removeChild(divArray[i].div);
                    divArray.splice(i,1);
                    score++;
                    scoreDiv.innerHTML = score;
                }

            } else{
                divArray[i].progress = 0;
                divArray[i].active = "false"; 

                let html = "";
                for(j=0; j<divArray[i].word.length; j++){
                    if(j<divArray[i].progress){
                        html = html + '<span style="color: red;">' + divArray[i].word[j] + '</span>';
                    } else {
                        html = html + '<span style="color: black;">' + divArray[i].word[j] + '</span>';
                    }
                }
                html = html + '<img src="../images/small-cloud.png" style="position: absolute; z-index: -1; width: 300%; transform: translate(-70%, -45%);">'
                divArray[i].div.innerHTML = html; 
            }

        }
    }
    if( flag == 0){
        for(i=0; i<divArray.length; i++){
            if(divArray[i].word.charCodeAt(0) == e.keyCode){
                divArray[i].active = 'true';
                divArray[i].progress++;

                let html = "";
                for(j=0; j<divArray[i].word.length; j++){
                    if(j<divArray[i].progress){
                        html = html + '<span style="color: red;">' + divArray[i].word[j] + '</span>';
                    } else {
                        html = html + '<span style="color: black;">' + divArray[i].word[j] + '</span>';
                    }
                }
                html = html + '<img src="../images/small-cloud.png" style="position: absolute; z-index: -1; width: 300%; transform: translate(-70%, -45%);">'
                divArray[i].div.innerHTML = html; 

            }
        }
    }
    
}

function loselife() {
    lifes--;
    lifeDiv.innerHTML = lifes;
    if(lifes == 0){
        EndGame();
    }
}

function EndGame() {
    clearInterval(interval1);
    clearInterval(interval2);
    document.querySelector('#resultsNum').innerHTML = score;
    results.style.display = "block";
}

