//const orange = new Controller("box");
startApp();
const screenList = [{id:"menu",status: "0",name:"Меню"},{id:"cardPlace",status: "0",name:"Управление средствами"}];
const header     = document.getElementById("vkHeaderText");
screenShow("menu");
document.getElementById("sendMoney").addEventListener("click",()=>{
    //showNoty("К большому сожалению, перевод Флорбов на данный момент невозможен!",2)
    screenShow("cardPlace");
    reFix();
})

document.getElementById("card").addEventListener("click",()=>{
   showNoty("Номер успешно скопирован!",1)
})

function screenShow(id){
    for(let i = 0; i < screenList.length; i++){
        let layer = document.getElementById(screenList[i].id);
        if(screenList[i].id==id){
            layer.style.display = "block";
            header.innerHTML = screenList[i].name;
        }else{
            layer.style.display = "none";
        }
    }
}

function reFix(){
    const nodeFix = ["florbo1"]
    for(let i = 0;i< nodeFix.length; i ++){
        centerFix(nodeFix[i]);
    }
}
function centerFix(id){
    let $fix = document.getElementById(id);
    $fix.style.marginTop = (document.getElementById(id).parentElement.clientHeight/2) - (document.getElementById(id).clientHeight/2) +"px";
}

const enemyCard = document.getElementById("enemyCardNum");
const enemySumm = document.getElementById("enemySumm");
const enemyButton =  document.getElementById("sumbitEnemy");
enemyCard.oninput = function() {
    inputControl();
};
enemySumm.oninput = function() {
    inputControl();
};
function inputControl(){
    let card = enemyCard.value;
    let summ =  enemySumm.value;
    if(card.length > 16 && summ.length>0){
        enemyButton.classList.add('btnCardActive');
    }else{
        enemyButton.classList.remove('btnCardActive');
    }
};

enemyButton.addEventListener("click",()=>{
    if(enemyButton.classList.length == 6){
        enemyCard.value="";
        enemySumm.value="";
        enemyButton.classList.remove('btnCardActive');
        showNoty("Перевод выполнен успешно!",1)
    }
})