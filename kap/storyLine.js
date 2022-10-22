var storyList =  [{status:0,summ:2311,senderID:1,time:"1320"},
                  {status:1,summ:60000,senderID:1,time:"1532"},
                  {status:1,summ:60000,senderID:1,time:"1140"},
                  {status:0,summ:15744,senderID:1,time:"2201"},
                  {status:1,summ:1000000,senderID:1,time:"0630"},
                  {status:0,summ:95222,senderID:1,time:"0522"},
                  {status:0,summ:1110000,senderID:1,time:"0322"},
                 ];



function storyUpdate(){
    var listpayersIDS=[];
    var cardSEND = "1546 5684 1532 8796";
    var cardUPPR = "5245 4788 4114 3857";
    var resultList = '';
    for(let i = 0; i < storyList.length; i++){
        
        listpayersIDS.push(rint(1000000000,9000000000));
        var storyContaner;
        
        if(storyList[i].status){
            storyContaner = 
             `
             <div class="infoCard"  onclick="`+'showNoty('+' `Время операции:  '+storyList[i].time[0]+storyList[i].time[1]+':'+storyList[i].time[2]+storyList[i].time[3]+'(МСК) <br> Номер карты отправителя: <br>'+cardSEND+' <br> Номер карты получателя: <br>'+cardUPPR+'<br> Сумма операции: '+storyList[i].summ+'f`,2)'+`" style="background: #7ba97a;height: 52px;position: relative;overflow: hidden;">
             <div id="`+listpayersIDS[i]+`" class="userinf standartTitle" style="font-size: 14px;position: relative;z-index: 10;margin-top: 14.5px;width: calc(50% - 41px);" id="nameMine">Входящий платеж</div>
             <img width="40" height="40" style="width: calc(100% - 22px); margin-left: 11px;border-radius: 50%;width: auto;height: 70%;margin: 6px;border: 2px solid rgb(255 255 255);color: rgb(191, 192, 193);float: right;margin-left: 10px;" class="Avatar" src="https://sun9-79.userapi.com/impg/lUxuZEZF4Sm8xNpwF2LB0ZFdf-1as8ETbGLa1A/Kywn0yGLdLk.jpg?size=360x360&amp;quality=96&amp;sign=29230a8470d53f622d849a474a165054&amp;type=album"><div class="userinf standartTitle" style="position: relative;z-index: 10;margin-top: 14.5px;width: calc(49% - 41px);text-align: end;margin-left: 0;margin-right: 0;">+ `+storyList[i].summ+`f</div></div>
             `
        }else{
            storyContaner = 
            `
            <div class="infoCard"  onclick="`+'showNoty('+' `Время операции:  '+storyList[i].time[0]+storyList[i].time[1]+':'+storyList[i].time[2]+storyList[i].time[3]+'(МСК) <br> Номер карты отправителя: <br>'+cardSEND+' <br> Номер карты получателя: <br>'+cardUPPR+'<br> Сумма операции: '+storyList[i].summ+'f`,2)'+`"  style="background: #7a91a9;height: 52px;position: relative;overflow: hidden;">
            <div id="`+listpayersIDS[i]+`" class="userinf standartTitle" style="font-size: 14px;position: relative;z-index: 10;width: calc(50% - 41px);margin-top: 14.5px;" id="nameMine">Исходящий платеж</div>
            <img width="40" height="40" style="width: calc(100% - 22px); margin-left: 11px;border-radius: 50%;width: auto;height: 70%;margin: 6px;border: 2px solid rgb(255 255 255);color: rgb(191, 192, 193);float: right;margin-left: 10px;" class="Avatar"  src="https://sun9-79.userapi.com/impg/lUxuZEZF4Sm8xNpwF2LB0ZFdf-1as8ETbGLa1A/Kywn0yGLdLk.jpg?size=360x360&amp;quality=96&amp;sign=29230a8470d53f622d849a474a165054&amp;type=album"><div class="userinf standartTitle" style="position: relative;z-index: 10;margin-top: 14.5px;width: calc(49% - 41px);text-align: end;margin-left: 0;margin-right: 0;" id="nameMine">-  `+storyList[i].summ+`f</div></div>
            `
        }
        resultList+=storyContaner;

    }
    document.getElementById("storyLine").innerHTML=resultList;
    for(let i = 0;i< listpayersIDS.length; i ++){
        centerFix2(listpayersIDS[i]);
    }
    

}


function centerFix2(id){
    let $fix = document.getElementById(id);
    $fix.style.marginTop = (document.getElementById(id).parentElement.clientHeight/2) - (document.getElementById(id).clientHeight/2)-1 +"px";
}
