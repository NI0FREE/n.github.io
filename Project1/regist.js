var email_inp = document.getElementsByClassName("in")[0];
var passw_inp = document.getElementsByClassName("in")[1];
var paswl_inp = document.getElementsByClassName("in")[2];
var sumbt_btn = document.getElementsByClassName("btn")[0]; 
var conro_btn = document.getElementsByClassName("conr")[0]; 

var email = false;
var passw = false;
var isucc = false;
var canic = false;

var mail;
email_inp.oninput = function() {
    clearTimeout(mail);
    
    mail = setTimeout(()=>{
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    email = re.test(String(email_inp.value).toLowerCase());
    if(!email){
        email_inp.style.color = "#ff5722";
        email_inp.style.border= "1px solid #ff5722"
    }else{
        email_inp.style.color = "#495057";
        email_inp.style.border= "1px solid #dee2e6";
    }
    checkgo();
    },1000)
};
var pass;
passw_inp.oninput = function() {
    clearTimeout(pass);
    
    pass = setTimeout(()=>{
        passw=true;
        if(passw_inp.value.length < 8){
            passw_inp.style.color = "#ff5722";
            passw_inp.style.border= "1px solid #ff5722"
            ppasswasw=false;
            document.getElementById("1111").style.color="#ff5722"
        }else{
            passw_inp.style.color = "#495057";
            passw_inp.style.border= "1px solid #dee2e6";
            document.getElementById("1111").style.color="#adb5bd"
        }
        if(paswl_inp.value != passw_inp.value){
            paswl_inp.style.color = "#ff5722";
            paswl_inp.style.border= "1px solid #ff5722"
            passw=false;
        }else{
            paswl_inp.style.color = "#495057";
            paswl_inp.style.border= "1px solid #dee2e6";
        }
        checkgo();
    },1000)
};
console.log(1)
var pasw;
paswl_inp.oninput = function() {
    clearTimeout(pasw);
    
    pasw = setTimeout(()=>{
        passw=true;
        if(paswl_inp.value != passw_inp.value){
            paswl_inp.style.color = "#ff5722";
            paswl_inp.style.border= "1px solid #ff5722"
            passw=false;
        }else{
            paswl_inp.style.color = "#495057";
            paswl_inp.style.border= "1px solid #dee2e6";
            document.getElementById("1111").style.color="#adb5bd;"
        }
        if(passw_inp.value.length < 8){
            passw_inp.style.color = "#ff5722";
            passw_inp.style.border= "1px solid #ff5722"
            passw=false;
        }else{
            passw_inp.style.color = "#495057";
            passw_inp.style.border= "1px solid #dee2e6";
        }
        checkgo();
    },1000)
};



conro_btn.onclick = function () {
    isucc=!isucc;
    checkgo()
}

function checkgo(){
    if(isucc && passw && email){
        canic=true;
        sumbt_btn.style.backgroundColor = "#3755be";
        
    }else{
        canic=false;
        sumbt_btn.style.backgroundColor = "#3755be8f";
    }
}

sumbt_btn.onclick = function () {
   if(!isucc){
    document.getElementById("2222").style.color="#ff5722"
   }else{
    document.getElementById("2222").style.color="#adb5bd"
    if(canic){
        console.log("???????????????????????????????????????????")
    }
   }
}