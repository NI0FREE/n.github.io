
const storage = document.getElementById("storage");

function formCard(id,name,c){
    return `   <div class="box ratio1_1"><span onclick="showinfo([`+id+`,`+c+`])" class="content" style="width: 100%;height: 100%;  background-image: url(pics/`+id+`.png); background-repeat: no-repeat; border-radius: 5px;background-size: 101%;"></span><div class="vksrf">`+name+`</div></div> `
}

var itemNames   = ["Сырьё","Сырьё","Брус","Слиток","Волокно","Пластина","Ткань","Оболочка","Пластик","Металл"]
var userStorage = [[0,5],[1,5],[2,5],[3,5],[4,5],[5,5],[6,5],[7,5],[8,5],[9,5]];
var itemFullName= ["Угольное сырьё","Железное сырьё","Угольный брус","Металический слиток","Углеволокно","Металическая пластина","Углеткань","Промышленая оболочка","Металлопластик","Угле-мет. оболочка"]
var prices= ["25","50","50","70","85","100","150","210","170","450"]
drawStorage();
function drawStorage(){
    let result = '';
    for(let i = 0; i< userStorage.length; i ++){
        result += formCard(userStorage[i][0],itemNames[userStorage[i][0]],userStorage[i][1]);
    }
    storage.innerHTML = result;
}

function showinfo(row){
    console.log(row)
    showItemCard({name:itemFullName[row[0]],count:row[1],price:prices[row[0]],logo:row[0]})

}

function sell(id){


}

function send(id){


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

    <div class="vkNoty2 notyAnim-2" id="`+id+`" style="
        height: 157px;
    ">
            
    <div style="width: 100%;height: calc(28px - -13px);overflow: hidden;margin-top: 4px;">
                <button  style="padding: 0px;outline: none;width: 25px;float: left;background-color: #2c3e5000;border-width: 0px;margin: 7px;margin-right: 7px;margin-top: 6px;" class=""><i class="material-icons three unselectable" style="color: #795548;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" id="cube_box_outline_28"><g fill-rule="nonzero" fill="none"><path opacity=".216" d="M0 0h28v28H0z"></path><path d="M13.507 1.545c.33-.06.655-.06.986 0 .33.059.599.154 1.134.397l8.58 3.9c.528.24.793.404 1.055.66.26.253.451.55.574.89.124.346.164.655.164 1.234v10.35c0 .579-.04.888-.164 1.233-.123.34-.315.638-.574.89-.262.257-.527.421-1.054.66l-8.77 3.986c-.414.181-.656.26-.945.312a2.75 2.75 0 01-.986 0c-.33-.059-.599-.154-1.134-.397l-8.58-3.9c-.528-.24-.793-.404-1.055-.66a2.337 2.337 0 01-.574-.89C2.04 19.863 2 19.554 2 18.975l.002-10.555c.01-.452.053-.726.162-1.028.123-.34.315-.638.574-.89.262-.257.527-.421 1.054-.66l8.77-3.985c.414-.182.656-.261.945-.313zM4 8.854v10.231a2 2 0 00.024.372l.022.074c.02.055.046.096.088.137.07.069.151.119.486.27l8.38 3.81V12.932a3 3 0 01-.042-.015l-.2-.082L4 8.854zm20-.001l-8.759 3.982c-.079.036-.159.068-.24.097L15 23.748l8.38-3.81c.215-.097.325-.153.396-.198l.032-.022.058-.05a.339.339 0 00.088-.137c.034-.093.046-.187.046-.555V8.853zM8.5 5.899L5.416 7.301l8.17 3.713a1 1 0 00.713.044l.115-.044 2.669-1.213L8.5 5.899zm5.64-2.386a.752.752 0 00-.28 0c-.136.025-.262.07-.66.25L10.917 4.8 19.5 8.702l3.083-1.401-7.784-3.538c-.265-.12-.409-.18-.516-.214l-.05-.015z" fill="currentColor"></path></g></svg>  </i></button>
                <div id="n3" class="userinf standartTitle" style="color: #795548;margin: 10px 0px 0px;font-size: 15px;width: calc((100% - 12px) - 27px);height: auto;">
                <div style="float: left;">`+info.name+`</div><div id="coal" style="color: #e2e2e2;"></div>
                </div>
            </div>
            <div style="width: 100%;height: calc(28px - -13px);overflow: hidden;margin-top: -7px;">
                <button style="padding: 0px;outline: none;width: 25px;float: left;background-color: #2c3e5000;border-width: 0px;margin: 7px;margin-right: 7px;margin-top: 6px;" class=""><i class="material-icons three unselectable" style="color: #795548;"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 36 36" id="coins_stacks_2_outline_36"><path d="M23 6c4.802 0 8.836 1.969 8.995 4.824L32 11v15l-.005.176C31.835 29.03 27.802 31 23 31c-4.347 0-8.065-1.614-8.848-4.038-.377.025-.762.038-1.152.038-4.9 0-9-2.05-9-5V12l.005-.176C4.165 8.97 8.198 7 13 7c1.29 0 2.525.142 3.644.405C18.282 6.517 20.54 6 23 6zm7.002 18.206C28.34 25.33 25.8 26 23 26s-5.339-.67-7-1.794V26l.005.107C16.15 27.543 19.16 29 23 29s6.85-1.458 6.995-2.893L30 26zM6 20.206V22l.005.108C6.15 23.542 9.16 25 13 25c.34 0 .675-.011 1-.033l.001-2.996c-.33.02-.663.029-1.001.029-2.8 0-5.339-.67-7-1.794zm24.002-1C28.34 20.33 25.8 21 23 21s-5.339-.67-7-1.794V21c0 1.468 3.063 3 7 3 3.84 0 6.85-1.458 6.995-2.892L30 21zM6 15.206V17c0 1.468 3.063 3 7 3 .34 0 .675-.011 1-.033l.001-2.996c-.33.02-.663.029-1.001.029-2.8 0-5.339-.67-7-1.794zm24.002-1C28.34 15.33 25.8 16 23 16s-5.339-.67-7-1.794V16c0 1.468 3.063 3 7 3 3.84 0 6.85-1.458 6.995-2.892L30 16zM13 9c-3.937 0-7 1.532-7 3s3.063 3 7 3c.34 0 .675-.011 1-.033V11l.005-.176c.035-.624.255-1.206.627-1.734C14.112 9.032 13.565 9 13 9zm10-1c-3.937 0-7 1.532-7 3s3.063 3 7 3 7-1.532 7-3-3.063-3-7-3z" fill="currentColor"></path></svg>  </i></button>
                <div id="n3" class="userinf standartTitle" style="color: #795548;margin: 10px 0px 0px;font-size: 15px;width: calc((100% - 12px) - 27px);height: auto;">
                <div style="float: left;">Количество:</div><div id="coal" style="color: #000000;">&nbsp; `+info.count+` шт</div>
                </div>
            </div><div class="vkNoty2Btn" id="`+"-"+id+`" style="width: calc(100% - 108px);" onclick="`+rmProgram+`"
        ><h5 style="color: white; margin-top: 7px;">`+notyAnswers[rint(0,10)]+`</h5></div> <button onclick="sell(`+info.logo+`);`+rmProgram+` " style="padding: 0px;outline: none;width: 36px;float: right;background-color: #2c3e5000;border-width: 0px;margin: 3px;margin-right: 0px;margin-top: 7px;bottom: 1px;position: absolute;right: 8px;" class=""><i class="material-icons three unselectable" style="color: rgb(185 185 185);"><div style="font-size: 38px;color: #ff9800;">f</div>  </i></button><button   onclick="send(`+info.logo+`);`+rmProgram+` " style="padding: 0px;outline: none;width: 36px;float: right;background-color: #2c3e5000;border-width: 0px;margin: 3px;margin-right: 0px;margin-top: 7px;bottom: 1px;position: absolute;right: 50px;" class=""><i class="material-icons three unselectable" style="color: #e91e63;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" id="user_outgoing_outline_28"><g fill="none" fill-rule="evenodd"><path d="M0 0h28v28H0z"></path><path d="M10.25 15c4.951 0 9.25 1.763 9.25 5.643 0 2.016-.781 2.857-2.456 2.857H3.456C1.78 23.5 1 22.66 1 20.643 1 16.763 5.299 15 10.25 15zm0 2C6.304 17 3 18.355 3 20.643c0 .89-.071.863.372.858l13.672-.001c.536 0 .456.086.456-.857 0-2.288-3.304-3.643-7.25-3.643zm12.043-9.707a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L24.585 13H18.5a1 1 0 01-.993-.883L17.5 12a1 1 0 011-1h6.085l-2.292-2.293a1 1 0 01-.083-1.32zM10 3c3.039 0 5.5 2.461 5.5 5.5S13.039 14 10 14a5.499 5.499 0 01-5.5-5.5C4.5 5.461 6.961 3 10 3zm0 2a3.499 3.499 0 00-3.5 3.5c0 1.934 1.566 3.5 3.5 3.5s3.5-1.566 3.5-3.5S11.934 5 10 5z" fill="currentColor" fill-rule="nonzero"></path></g></svg>  </i></button>
             <div style="width: 100%;height: calc(28px - -13px);overflow: hidden;margin-top: -7px;">
                <button  style="padding: 0px;outline: none;width: 25px;float: left;background-color: #2c3e5000;border-width: 0px;margin: 7px;margin-right: 7px;margin-top: 6px;" class=""><i class="material-icons three unselectable" style="color: #795548;"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 36 36" id="diamond_outline_36"><path d="M4 14.965v-.012a1 1 0 01.006-.06l.002-.023a.817.817 0 01.023-.116l.004-.016a1.043 1.043 0 01.046-.132l-.033.086a1.003 1.003 0 01.137-.272l.01-.014.013-.016 4.484-5.981a.981.981 0 01.158-.17l.03-.024a1 1 0 01.124-.083l-.08.05a.993.993 0 01.067-.043l.013-.007 3.5-2A1 1 0 0113 6h10a1 1 0 01.496.132l3.5 2a.811.811 0 01.12.08l.044.036c.057.05.106.103.148.16L31.8 14.4l.011.015a.95.95 0 01.108.191l-.045-.093a.988.988 0 01.033.065l.016.037a1.152 1.152 0 01.036.1l.004.014.003.01a.857.857 0 01.02.088v.01a.931.931 0 01.012.102l.001.014a1.219 1.219 0 01-.007.172.808.808 0 01-.005.035l-.003.02a1.184 1.184 0 01-.016.07l-.004.017-.007.022a1.416 1.416 0 01-.022.067l-.006.015-.012.028a1.017 1.017 0 01-.03.065l-.02.035-.018.03a1.023 1.023 0 01-.093.126l.07-.09a.901.901 0 01-.08.101l-12.97 14.967a.975.975 0 01-.29.243l-.024.011a.7.7 0 01-.105.048l-.02.007a.786.786 0 01-.091.028l-.023.005a.902.902 0 01-.092.017c-.01 0-.019.002-.028.003a.978.978 0 01-.326-.02l-.023-.005a.858.858 0 01-.087-.026l-.028-.01a.964.964 0 01-.41-.295L4.245 15.655a.434.434 0 01-.045-.056 1.014 1.014 0 01-.028-.04l-.003-.004-.009-.013a.987.987 0 01-.026-.043l-.015-.028a1.296 1.296 0 01-.008-.015l-.004-.007a1.111 1.111 0 01-.048-.111l-.004-.014a1.018 1.018 0 01-.033-.118l-.003-.015a.94.94 0 01-.012-.085l-.002-.017A1.097 1.097 0 014 15.01v-.023zM22.38 19h-8.762L18 27.764zm5.014-1.367l-2.664 1.142-2.284 4.568zm-18.79 0l4.948 5.708-2.283-4.567zM22.133 12h-8.266l-.714 5h9.694zM9.77 10.306l-3.206 4.276 4.63 1.985.72-5.036zm16.46 0l-2.144 1.225.719 5.035 4.63-1.985zM22.734 8h-9.468l-1.75 1 1.75 1h9.468l1.75-1z" fill="currentColor"></path></svg>  </i></button>
                <div id="n3" class="userinf standartTitle" style="color: #795548;margin: 10px 0px 0px;font-size: 15px;width: calc((100% - 12px) - 27px);height: auto;">
                <div style="float: left;">Цена за единицу:</div><div id="coal" style="color: #000000;">&nbsp; `+info.price+` f</div>
                </div>
            </div></div>
    `;
        document.getElementById("-"+id).children[0].style.marginTop = 35/2 - (document.getElementById("-"+id).children[0].clientHeight/2)+"px";

    function setZ(num){
        notyLayer.style.zIndex = num;
    }
}