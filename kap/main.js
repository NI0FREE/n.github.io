//const orange = new Controller("box");
startApp();
const backbtn = `<div onclick=" screenShow('menu');" style=" width: 30px; color: #efb96b; margin-top: calc((55px / 2) - 30px / 2); margin-left: 10px; float: left; "><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="browser_back_24"><g fill="none" fill-rule="evenodd"><path d="M0 0h24v24H0z"></path><path d="M8.656 12l7.122 7.122a1.1 1.1 0 11-1.556 1.556l-7.9-7.9a1.1 1.1 0 010-1.556l7.9-7.9a1.1 1.1 0 011.556 1.556L8.656 12z" fill="currentColor" fill-rule="nonzero"></path></g></svg></div>`;
const screenList = [{id:"menu",status: "0",name:"Меню", back:0 },{id:"cardPlace",status: "0",name:" Управление средствами", back: 1}];
const header     = document.getElementById("head");
screenShow("menu");
document.getElementById("sendMoney").addEventListener("click",()=>{
    //showNoty("К большому сожалению, перевод Флорбов на данный момент невозможен!",2)
    screenShow("cardPlace");
  
})


document.getElementById("card").addEventListener("click",()=>{
   showNoty("Номер успешно скопирован!",1)


   setInterval(() => {
       document.getElementById("cardPlace").style.marginTop =  document.getElementById("cardPlace").style.marginTop +3+"px";
   }, 100);
})

function screenShow(id){
    for(let i = 0; i < screenList.length; i++){
        let layer = document.getElementById(screenList[i].id);
        if(screenList[i].id==id){
            layer.classList.remove('notyAnim-2-2');
            layer.classList.add('notyAnim-2');
            setTimeout(()=>{
                layer.style.display = "block";
                let back = "";
                if(screenList[i].back){
                    back = backbtn;
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



