document.getElementById("checkbox21").addEventListener("click",()=>{
    document.getElementById("checkbox22").click();
})

if(document.documentElement.clientWidth < 440){
    document.getElementsByClassName("slogan2")[0].innerHTML=`Окунитесь с головой во вселенную <br>Minecraft серверов <div style="color:#d6e7f7;display: inline;">Plasma</div>`;
}

document.getElementById("15612").addEventListener("click",()=>{
    imgUpdate(15612)
})

document.getElementById("96412").addEventListener("click",()=>{
    imgUpdate(96412)
})

document.getElementById("28642").addEventListener("click",()=>{
    imgUpdate(28642);
})

function imgUpdate(code){
    var img = document.getElementsByClassName("imgServer")[0].children[0];
    if(code==15612){
        img.src = "imgs/hitech.jpg";
    }
    else if(code==96412){
        img.src = "imgs/hitech1.png";
    }
    if(code==28642){
        img.src = "imgs/hitech.jpg";
    }
}

for(let i = 0; i < 3; i ++){
    document.getElementsByClassName("item2")[i].addEventListener("click",()=>{
        document.getElementById("checkbox21").click();
    })
}



document.getElementById("next").addEventListener("click",()=>{

document.location.href = "file:///C:/Users/%D0%9D%D0%B0%D1%82%D0%B0%D0%BB%D1%8C%D1%8F/Desktop/Project1/reg.html";

})
document.getElementById("next2").addEventListener("click",()=>{

    document.location.href = "file:///C:/Users/%D0%9D%D0%B0%D1%82%D0%B0%D0%BB%D1%8C%D1%8F/Desktop/Project1/reg.html";
    
    })
 
    document.getElementById("next3").addEventListener("click",()=>{

        document.location.href = "file:///C:/Users/%D0%9D%D0%B0%D1%82%D0%B0%D0%BB%D1%8C%D1%8F/Desktop/Project1/reg.html";
        
        })