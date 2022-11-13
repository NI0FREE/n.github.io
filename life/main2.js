//const orange = new Controller("box");
startApp();
var notyBody = "#FFFFFF"
var notyText = "#223344"
const backbtn = `<div class="showStrike" onclick="this.classList.add('hideStrike'); setTimeout(()=>{ screenShow('menu');},100) " style=" width: 30px; color: #efb96b; margin-top: calc((55px / 2) - 30px / 2); margin-left: 10px; float: left; "><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="browser_back_24"><g fill="none" fill-rule="evenodd"><path d="M0 0h24v24H0z"></path><path d="M8.656 12l7.122 7.122a1.1 1.1 0 11-1.556 1.556l-7.9-7.9a1.1 1.1 0 010-1.556l7.9-7.9a1.1 1.1 0 011.556 1.556L8.656 12z" fill="currentColor" fill-rule="nonzero"></path></g></svg></div>`;
const backbtnstatic = `<div onclick="this.classList.add('hideStrike'); setTimeout(()=>{ screenShow('menu');},100) " style=" width: 30px; color: #efb96b; margin-top: calc((55px / 2) - 30px / 2); margin-left: 10px; float: left; "><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="browser_back_24"><g fill="none" fill-rule="evenodd"><path d="M0 0h24v24H0z"></path><path d="M8.656 12l7.122 7.122a1.1 1.1 0 11-1.556 1.556l-7.9-7.9a1.1 1.1 0 010-1.556l7.9-7.9a1.1 1.1 0 011.556 1.556L8.656 12z" fill="currentColor" fill-rule="nonzero"></path></g></svg></div>`;
const screenList = [{id:"menu",status: "0",name:"", back:0, color:0,strikeSatic:0 },
                    {id:"game",status: "0",name:" Поле", back: 1,color:1 ,strikeSatic:1 },
                   ];
var header     = document.getElementById("head");
const colorCards = [{title:"#ffffff00",body:"#E5EBF1",notyb:"#FFFFFF",notyt:"#223344",text:"#9A9A9A"},{title:"#00695f",body:"#015850",notyb:"#00695f",notyt:"white",text:"#9A9A9A"}]
screenShow("menu");
reFix();
// document.getElementById("sendMoney").addEventListener("click",()=>{
//     //showNoty("К большому сожалению, перевод Флорбов на данный момент невозможен!",2)
//     screenShow("cardPlace");
// })
// document.getElementById("inMine").addEventListener("click",()=>{
//     screenShow("mine");
// })

// document.getElementById("inStorage").addEventListener("click",()=>{
//     screenShow("storage");
// })

// document.getElementById("inStoryLine").addEventListener("click",()=>{
    
//     screenShow("storyLine");
//     setTimeout(()=>{storyUpdate();},150);
//     setTimeout(()=>{storyUpdate();},10);
//     setTimeout(()=>{storyUpdate();},50);
//     setTimeout(()=>{storyUpdate();},200);
// })
document.getElementById("toGame").addEventListener("click",()=>{
    screenShow("game");
 })
// document.getElementById("card").addEventListener("click",()=>{
//    showNoty("Номер успешно скопирован!",1)
// })

function updateColor(pos){
    header = document.getElementById("head");
    header.children[0].style.color = colorCards[pos].text;
    header.style.backgroundColor = colorCards[pos].title;
    document.body.style.backgroundColor = colorCards[pos].body;
    notyBody = colorCards[pos].notyb;
    notyText = colorCards[pos].notyt;
}
function screenShow(id){
    for(let i = 0; i < screenList.length; i++){
        let layer = document.getElementById(screenList[i].id);
        if(screenList[i].id==id){
            layer.classList.remove('notyAnim-2-2');
            layer.classList.add('notyAnim-2');
            updateColor(screenList[i].color)
            setTimeout(()=>{
                layer.style.display = "block";
                let back = "";
                if(screenList[i].back){
                    if(screenList[i].strikeSatic){
                      back = backbtnstatic;
                    }else{
                      back = backbtn;
                    }
                }
                header.innerHTML = back+ `<h5 id="vkHeaderText">`+ screenList[i].name + `</h5>`;
                reFix();
            },100)
        }else{
            layer.classList.add('notyAnim-2-2');
            layer.classList.remove('notyAnim-2');
            setTimeout(()=>{
                layer.style.display = "none";
            },100)
        }
    }
}

function reFix(){
 //   const nodeFix = ["florbo1","nameMine","coalFixer","n1","n2","n3","m1f","-m1f","m2f","-m2f","m3f","-m3f","m4f","-m4f","m5f","-m5f","nameStorage"]
 const nodeFix=[];
    for(let i = 0;i< nodeFix.length; i ++){
        centerFix(nodeFix[i]);
    }
}
function centerFix(id){
    let $fix = document.getElementById(id);
    $fix.style.marginTop = (document.getElementById(id).parentElement.clientHeight/2) - (document.getElementById(id).clientHeight/2)-1 +"px";
}

// const enemyCard = document.getElementById("enemyCardNum");
// const enemySumm = document.getElementById("enemySumm");
// const enemyButton =  document.getElementById("sumbitEnemy");
// const sumbitBlock = document.getElementById("sumbitBlock");
// const sumbitPODBlock = document.getElementById("sumbitPODBlock");
// const acceptlock = document.getElementById("acceptlock");
// enemyCard.oninput = function() {
//     inputControl();
// };
// enemySumm.oninput = function() {
//     inputControl();

// };
// function inputControl(){
//     let card = enemyCard.value;
//     let summ =  enemySumm.value;
//     if(canvStatus){hidePod();enemyButton.innerHTML = "Подтвердить";};
//     if(card.length > 16 && summ.length>0){
//         enemyButton.classList.add('btnCardActive');
//     }else{
//         enemyButton.classList.remove('btnCardActive');
        
//     }
// };

// var canvStatus = false;
// enemyButton.addEventListener("click",()=>{
//     if(enemyButton.classList.length == 6){
//         updateCanvas();
//         hidePod();showPod();
//         //enemyCard.value="";
//         //enemySumm.value="";
//         //enemyButton.classList.add('hideObject');
//        // enemyButton.style.display = "none";
//         enemyButton.classList.remove('btnCardActive');
//         enemyButton.innerHTML = "Ожидание подписи";
//         canvStatus=true;
//         //showNoty("Перевод выполнен успешно!",2);
//     }
// })


// function hidePod(){
//     sumbitPODBlock.style.visibility = "hidden";
//     canvas.style.filter = 'blur(0px)';
//     acceptlock.style.opacity = 0;
//     sumbitPODBlock.classList.add('notyAnim-2-2');
//     sumbitPODBlock.classList.remove('notyAnim-2');
//     sumbitPODBlock.style.opacity = 0;
// }
// function showPod(){
//     sumbitPODBlock.style.visibility = "visible";
//     sumbitPODBlock.style.display = "";
//     canvas.style.filter = 'blur(0px)';
//     acceptlock.style.opacity = 0;
//     sumbitPODBlock.classList.remove('notyAnim-2-2');
//     sumbitPODBlock.classList.add('notyAnim-2');
//     sumbitPODBlock.style.opacity = 1;
// }


// function updateCanvas(){
//     movePoints=0;
//     context.clearRect(0, 0, canvas.width, canvas.height);
//     canvas.width = getComputedStyle(canvas).width.substr(0, getComputedStyle(canvas).width.length - 2)/1.5;
//     canvas.height = getComputedStyle(canvas).height.substr(0, getComputedStyle(canvas).height.length - 2)/1.5;

// }
// var canvCont= document.getElementById("canvCont");
// var canvas = document.getElementById("sumbitPOD"), 
// context = canvas.getContext("2d"),
// w = canvas.width,
// h=canvas.height;
                 
// var mouse = { x:0, y:0};
// var draw = false;
// var movePoints = 0;
// canvCont.addEventListener("mousedown", function(e){
              
//     mouse.x = (Math.trunc(e.pageX) - this.offsetLeft)/1.5;
//     mouse.y = (Math.trunc(e.pageY) - this.offsetTop)/1.5;
//     draw = true;
//     context.beginPath();
//     context.moveTo(mouse.x, mouse.y);
//  });
//  canvCont.addEventListener("mousemove", function(e){
                
//     if(draw==true){
//      movePoints++;           
//      mouse.x = (Math.trunc(e.pageX) - this.offsetLeft)/1.5;
//      mouse.y = (Math.trunc(e.pageY) - this.offsetTop)/1.5;
//      context.lineTo(mouse.x, mouse.y);
//      context.stroke();
//     }
// });
// canvCont.addEventListener("mouseup", function(e){
//    if(movePoints > 50){endCanv();}           
//    mouse.x = (Math.trunc(e.pageX) - this.offsetLeft)/1.5;
//    mouse.y = (Math.trunc(e.pageY) - this.offsetTop)/1.5;
//    context.lineTo(mouse.x, mouse.y);
//    context.stroke();
//    context.closePath();
//    draw = false;
// });

// canvCont.addEventListener("touchstart", function (event) {
//     mouse.x = (Math.trunc(event.touches[0].pageX) - this.offsetLeft)/1.5;
//     mouse.y = (Math.trunc(event.touches[0].pageY) - this.offsetTop)/1.5;
//     draw = true;
//     context.beginPath();
//     context.moveTo(mouse.x, mouse.y);
//     //

// }, false); 

// canvCont.addEventListener("touchmove", function (event) {
    
//     if(draw==true){
//         movePoints++;           
//         mouse.x = (Math.trunc(event.touches[0].pageX) - this.offsetLeft)/1.5;
//         mouse.y = (Math.trunc(event.touches[0].pageY) - this.offsetTop)/1.5;
//         context.lineTo(mouse.x, mouse.y);
//         context.stroke();
//         console.log(this.offsetLeft);
//        }

//     event.preventDefault();
// }, false,{passive: false});
// canvCont.addEventListener("touchend", function (event) {
   
//     if(movePoints > 50){endCanv();}           
//     mouse.x = (Math.trunc(event.touches[0].pageX) - this.offsetLeft)/1.5;
//     mouse.y = (Math.trunc(event.touches[0].pageY) - this.offsetTop)/1.5;
//     context.lineTo(mouse.x, mouse.y);
//     context.stroke();
//     context.closePath();
//     draw = false;

//     event.preventDefault();
// }, false);


function endCanv(){
    
    canvas.style.filter = 'blur(2px)';
    acceptlock.classList.add('puls');
    acceptlock.classList.remove('notyAnim-2-2');
    acceptlock.classList.add('notyAnim-2');
    acceptlock.style.opacity = 1;
    setTimeout(()=>{hidePod();},200);
    enemyCard.value="";
    enemySumm.value="";
    enemyButton.innerHTML = "Подтвердить";
    showNoty("Перевод выполнен успешно!",1);
}

