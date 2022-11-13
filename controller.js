
class Controller{
    constructor(selector){
        this.$el = document.getElementById(selector);
       //console.log(this.$el)
    }
    hide(){
        this.$el.style.display = "none";
    }
    show(){
        this.$el.style.display = "block";
    }
}

function startApp(){
    vkBridge.send('VKWebAppInit');
}

const notyLayer = document.getElementById("notyLayer");
const notyAnswers = ["ok","Хорошо","Понятно","Ясно","Понял!","Так точно!","Окей","Как скажете","Угу","Ага","Okay"]
function showNoty(text,type){
    setZ(99999)
    let id = rint(1000000000,9000000000) + "";
    
    if(type == 1){
        notyLayer.innerHTML += '<div class ="vkNoty1 notyAnim-1" style="background-color:'+notyBody+';" id = "'+id+'"><h5 style="color:'+notyText+'">'+text+'</h5></div>';
        setTimeout(()=>{
            document.getElementById(id).remove();
            setZ(-1)
        },1500);
    }else
    if(type == 2){
        let rmProgram = `
        setTimeout(()=>{
            let $el = document.getElementById(`+id+`);
            $el.classList.add('notyAnim-2-2');
            setTimeout(()=>{
                $el.remove();
                notyLayer.style.zIndex = -1;
            },80);
        },100);
        `;
        notyLayer.innerHTML += 
            `
            <div class="vkNoty2 notyAnim-2"  id="`+id+`">
            <h5>
                `+text+`
            </h5>
            <div class="vkNoty2Btn" id="`+"-"+id+`" onclick="`+rmProgram+`"><h5 style="color: white">`+notyAnswers[rint(0,10)]+`</h5></div></div>
            `;
        document.getElementById(id).children[0].style.marginTop = ((200 - 35 - 7)/2) - (document.getElementById(id).children[0].clientHeight/2)+"px";
        document.getElementById("-"+id).children[0].style.marginTop = 35/2 - (document.getElementById("-"+id).children[0].clientHeight/2)+"px";
          
    }
    function setZ(num){
        notyLayer.style.zIndex = num;
    }
  
}


function rint(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}



