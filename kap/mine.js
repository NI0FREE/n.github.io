document.getElementById("takeCoal").addEventListener("click",()=>{
    showNoty("Сырье успешно собрано!",1)
 })


 function makeMineCard(id,color,btnColor,ftext,ltext,price){
return `
    <div class="infoCard" style="background: `+color+`;height: 42px;position: relative;overflow: hidden;">
            <div id=`+id+` class="userinf standartTitle" style="color: rgb(187, 187, 187); margin: 10.5px 12px 12px; font-size: 14px; width: 100%; height: auto;">
              <div style="float: left;">`+ftext+`</div>
            <div id="coalAdd1" style="color: #e2e2e2;width: 100%;">&nbsp;`+ltext+`</div>
    <div id="+`+id+`" style="
        width: 76px;
        height: 27px;
        position: absolute;
        top: 0;
        right: 0;
        background-color: `+btnColor+`;
        margin: 7px;
        border-radius: 4px;
                "><div id="-`+id+`" style="text-align: center; color: rgb(239, 185, 107); margin-top: 3px;">`+price+`f</div></div>
    </div>
              
          </div>

`;
 }
 let uplist = 
 [
     {id:"m1f",c:"#1a6f67",b:"#015850",f:"Новая вагонетка",l:"+ 1,5 с/мин",p:"100"},
     {id:"m2f",c:"#1a6f67",b:"#015850",f:"Новая развилка",l:"+ 4 с/мин",p:"200"},
     {id:"m3f",c:"#1a6f67",b:"#015850",f:"Новый этаж",l:"+ 14 с/мин",p:"600"},
     {id:"m4f",c:"#a53e61",b:"#7d1a3c",f:"Взорвать динамит",l:"+ ~200c",p:"400"},
     {id:"m5f",c:"#594e6f",b:"#322a42",f:"Купить рабочим мороженого",l:"",p:"2500"},
 
];
 let result = document.getElementById("mine").innerHTML;
 for(let i =0; i < uplist.length; i++){
    result+= makeMineCard(uplist[i].id,uplist[i].c,uplist[i].b,uplist[i].f,uplist[i].l,uplist[i].p);
    document.getElementById("mine").innerHTML = result;
 }