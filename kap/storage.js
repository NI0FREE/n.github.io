
const storage = document.getElementById("storage");

function formCard(id,name){
    return `   <div class="box ratio1_1"><span onclick="showinfo(`+id+`)" class="content" style="width: 100%;height: 100%;  background-image: url(pics/`+id+`.png); background-repeat: no-repeat; border-radius: 5px;background-size: 101%;"></span><div class="vksrf">`+name+`</div></div> `
}

var itemNames   = ["Сырьё"]
var userStorage = [[0,5],[0,5],[0,5],[0,5],[0,5],[0,5],[0,5],[0,5],[0,5],[0,5],[0,5],[0,5],[0,5],[0,5],[0,5],[0,5],[0,5],[0,5],[0,5],[0,5],[0,5],[0,5],[0,5],[0,5],[0,5],[0,5],[0,5],[0,5],[0,5],[0,5],[0,5],[0,5],[0,5],[0,5],[0,5],[0,5],[0,5]];

drawStorage();
function drawStorage(){
    let result = '';
    for(let i = 0; i< userStorage.length; i ++){
        result += formCard(userStorage[i][0],itemNames[userStorage[i][0]]);
    }
    storage.innerHTML = result;
}

function showinfo(id){

    showItemCard({text:0})

}