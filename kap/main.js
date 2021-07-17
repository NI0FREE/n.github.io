//const orange = new Controller("box");
startApp();
const screenList = [{id:"menu",status: "0",name:"Меню"},{id:"cardPlace",status: "0",name:"Управление средствами"}];
const header     = document.getElementById("vkHeaderText");
screenShow("menu");
document.getElementById("sendMoney").addEventListener("click",()=>{
    //showNoty("К большому сожалению, перевод Флорбов на данный момент невозможен!",2)
    screenShow("cardPlace");
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