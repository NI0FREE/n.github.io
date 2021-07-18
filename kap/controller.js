
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

function showItemCard(info){
    setZ(99999)
    let id = rint(1000000000,9000000000) + "";


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
            
        </h5>
        <div class="vkNoty2Btn" id="`+"-"+id+`" style="width: calc(100% - 108px);" onclick="`+rmProgram+`"><h5 style="color: white">`+notyAnswers[rint(0,10)]+`</h5></div> <button style="padding: 0px;outline: none;width: 36px;float: right;background-color: #2c3e5000;border-width: 0px;margin: 3px;margin-right: 0px;margin-top: 7px;bottom: 1px;position: absolute;right: 8px;" class=""><i class="material-icons three unselectable" style="color: rgb(185 185 185);"><div style="font-size: 38px;color: #ff9800;">f</div>  </i></button><button style="padding: 0px;outline: none;width: 36px;float: right;background-color: #2c3e5000;border-width: 0px;margin: 3px;margin-right: 0px;margin-top: 7px;bottom: 1px;position: absolute;right: 50px;" class=""><i class="material-icons three unselectable" style="color: #e91e63;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" id="user_outgoing_outline_28"><g fill="none" fill-rule="evenodd"><path d="M0 0h28v28H0z"></path><path d="M10.25 15c4.951 0 9.25 1.763 9.25 5.643 0 2.016-.781 2.857-2.456 2.857H3.456C1.78 23.5 1 22.66 1 20.643 1 16.763 5.299 15 10.25 15zm0 2C6.304 17 3 18.355 3 20.643c0 .89-.071.863.372.858l13.672-.001c.536 0 .456.086.456-.857 0-2.288-3.304-3.643-7.25-3.643zm12.043-9.707a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L24.585 13H18.5a1 1 0 01-.993-.883L17.5 12a1 1 0 011-1h6.085l-2.292-2.293a1 1 0 01-.083-1.32zM10 3c3.039 0 5.5 2.461 5.5 5.5S13.039 14 10 14a5.499 5.499 0 01-5.5-5.5C4.5 5.461 6.961 3 10 3zm0 2a3.499 3.499 0 00-3.5 3.5c0 1.934 1.566 3.5 3.5 3.5s3.5-1.566 3.5-3.5S11.934 5 10 5z" fill="currentColor" fill-rule="nonzero"></path></g></svg>  </i></button>
         </div>
        `;


    function setZ(num){
        notyLayer.style.zIndex = num;
    }
}
function rint(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}



