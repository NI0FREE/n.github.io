//const orange = new Controller("box");
startApp();
const screenList = [{id:"menu",status: "1"},{id:"notyLayer",status: "1"}]

document.getElementById("sendMoney").addEventListener("click",()=>{

    showNoty("К большому сожалению, перевод Флорбов на данный момент невозможен!",2)

})