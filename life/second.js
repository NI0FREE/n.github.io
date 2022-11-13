'use strict'

var lifeField;

var contextRE;
var imageData;
var imagePixels;
var imageClampedArray;

var loadedImageData;

//var performanceHtml;

var lastElapsed = performance.now();
var countedSteps = 0;
var stepsPerFrame = 1;
var manualStep = false;

var running = false;
var isDialogShown = false;

var loadedPatternType = 'random';

function Start() {
    // = document.getElementById("performance");

    lifeField = new LifeField();

    const canvasRE = document.getElementById("field");
    contextRE = canvasRE.getContext('2d');
    imageData = contextRE.createImageData(LifeField.WIDTH, LifeField.HEIGHT);
    var imageBuffer = new ArrayBuffer(imageData.data.length);
    imagePixels = new Uint32Array(imageBuffer);
    imageClampedArray = new Uint8ClampedArray(imageBuffer);

    window.addEventListener('keydown', keyPressed);

    drawW();
    //loadRandom();

}

function keyPressed(e) {
    if(isDialogShown) return;
    if(e.keyCode == 32) {
        e.stopPropagation();
        e.preventDefault();
        if(running) stopSimulation();
        else startSimulation();
    }
}

function step(timestamp) {
    if(running) {
        countedSteps += stepsPerFrame;
        lifeField.run(stepsPerFrame);
    }

    drawW();
    
    if(running && !manualStep) {
        window.requestAnimationFrame(step);
    }

}

function drawW() {
    lifeField.draw(imagePixels);
    imageData.data.set(imageClampedArray);
    contextRE.putImageData(imageData, 0, 0);
    //updateStatus();
}

function updateStatus() {
    const nowElapsed = performance.now();
    if (manualStep || !running || nowElapsed - lastElapsed >= 1000) {
        const stepsPerSecond = countedSteps * 1000.0 / (nowElapsed - lastElapsed);
        
        var status =
            stepsPerSecond == 0 ?
              `Generation: ${lifeField.generation}; living cells: ${lifeField.count()}` :
              `Generation: ${lifeField.generation} at ${Math.round(stepsPerSecond)} steps per second; living cells: ${lifeField.count()}`;
        //performanceHtml.innerText = status;
        countedSteps = 0;
        lastElapsed = nowElapsed;
    }
}

function startSimulation() {
    if(manualStep) {
        lastElapsed = performance.now();
        countedSteps = stepsPerFrame;
        lifeField.run(stepsPerFrame);
        drawW();
        //setGray('control-pause');
        //clearGray('control-start');
        return;
    }

    if(running) return;
    running = true;
    lastElapsed = performance.now();
    countedSteps = 0;
    //clearGray('control-pause');
    //setGray('control-start');
    window.requestAnimationFrame(step);
}

function stopSimulation() {
    // setGray('control-pause');
    // clearGray('control-start');
    running = false;
    drawW();
}


function rewindSimulation() {
    stopSimulation();
    if(loadedPatternType == 'random') loadRandom();
    else if(loadedPatternType == 'image') loadImage();
    else loadLif();
    drawW();
}

function selectSpeed() {
    const speedChoser = 0.5;
    const selectedVal = 0.5;
    stepsPerFrame = parseInt(selectedVal);
    if(stepsPerFrame < 0) {
        stepsPerFrame = -stepsPerFrame;
        manualStep = true;
        stopSimulation();
     }
    else {
        manualStep = false;
    }
}

function loadLif() {
    stopSimulation();
    const lifContents = document.getElementById("lif").value;
    lifeField.initializeWithLifFile(lifContents);
    loadedPatternType = 'lif';
    drawW();
}

function loadRandom() {
    stopSimulation();
    const seed = 12345;
    const threshold = 0.5;
    lifeField.initializeWithRandom(seed, threshold);
    loadedPatternType = 'random';
    drawW();
}

function loadImage() {
    lifeField.initializeWithImage(loadedImageData);
    stopSimulation();
    loadedPatternType = 'image';
}

function loadImg() {
    lifeField.clear();
    drawW();
    const img = new Image();
    img.onload = function () {
        contextRE.drawImage(img, LifeField.WIDTH / 2 - img.width / 2, LifeField.HEIGHT / 2 - img.height / 2);
        loadedImageData = contextRE.getImageData(0, 0, LifeField.WIDTH, LifeField.HEIGHT);
        loadImage();
    }
    img.src = URL.createObjectURL(document.getElementById('file-img').files[0]);
    document.getElementById('file-img').value = null;
}

function convert(r,g,b,a) {
    r = r.toString(16);g = g.toString(16);b = b.toString(16);a = a.toString(16);
    r= '0'.repeat(Math.max(2 - r.length, 0)) + r;
    g= '0'.repeat(Math.max(2 - g.length, 0)) + g;
    b= '0'.repeat(Math.max(2 - b.length, 0)) + b;
    a= '0'.repeat(Math.max(2 - a.length, 0)) + a;
    return "0x"+a+b+g+r;
};

function getSaveString(){
    var string = "1";
    for(let y = 0; y < LifeField.HEIGHT; y ++){
        for(let x = 0; x < LifeField.WIDTH; x ++){
            
            string+= lifeField.getNormal(x,y)? 1:0 ;
            //if(y<5){console.log(" / x: "+x+" y: "+y +"//"+(lifeField.getNormal(x,y)? 1:0))}
        }
    }
    console.log(string);
    console.log(pack(string+'1'));
    //console.log(pack2(string+'1'));
    console.log(unpack(pack(string+'1')));
    SAVE =  pack(string+'1');
    return pack(string+'1');
    //return string
}
var SAVE =0;
function loadSaveString(string){
    string = unpack(string);
    console.log(string);
    for(let i = 1; i < LifeField.HEIGHT*LifeField.WIDTH; i ++){
        let y = Math.trunc((i-1)/LifeField.WIDTH);
        let x = i-(y*LifeField.WIDTH)-1;
      //if(i<10000){console.log(i+" / x: "+x+" y: "+y +"//"+string[i])}
        lifeField.set(x,y,parseInt(string[i])) ;

    }

    drawW();
}
///////////////
function pack(a){a=a.match(/.{1,16}/g);for(var c="",b=0;b<a.length;b++)c+=String.fromCharCode(parseInt(a[b].padEnd(16,"0"),2));return c}function unpack(a){for(var c="",b=0;b<a.length;b++){var d=a.charCodeAt(b).toString(2);d=d.padStart(16,"0");c+=d}return c};

// function pack(/* string */ values) {
//     var chunks = values.match(/.{1,15}/g), packed = '';
//     for (var i=0; i < chunks.length; i++) {
//     packed += String.fromCharCode(parseInt('1'+chunks[i], 2));
//     }
//     return packed;
//     }
//     function unpack(/* string */ packed) {
//     var values = '';
//     for (var i=0; i < packed.length; i++) {
//     values += packed.charCodeAt(i).toString(2);
//     }
//     return values;
// }
// function unpack(/* string */ packed) {
//     var values = '';
//     for (var i=0; i < packed.length; i++) {
//     values += packed.charCodeAt(i).toString(2);
//     }
//     let result="";
//     var chunks = values.match(/.{1,16}/g);
//     for (var i=0; i < chunks.length; i++) {
//     result +=  chunks[i].substring(1);
//     }
//     return result;
// }


function updateFuncs(){

    eval(`
    lifeField.draw = function(imagePixels) {
        for(var i = 0; i < `+imagePixels.length+`; i += 2) {
            const val = this.fieldBytes[`+(LifeField.WIDTH/2)+` + (i>>1)];
            imagePixels[i] = 0 == (val & 1) ? `+lifeField.background+` : `+lifeField.cells+`;
            imagePixels[i + 1] = 0 == (val & 16) ? `+lifeField.background+` : `+lifeField.cells+`;
        }
    }
    `)
    // eval(
    // `
    // lifeField.step = function() {
    //     this.generation++;
    //     for(var i = 0; i < lifeField.tempInts.length; i++) this.tempInts[i] = 0;

    //     for (var j = LifeField.WIDTH; j < LifeField.WIDTH * LifeField.HEIGHT / 2; j += 4)
    //     {
    //         const i = j / 4;

    //         const src1 = this.fieldInts[i - LifeField.WIDTH / 8];
    //         const src2 = this.fieldInts[i];
    //         const src3 = this.fieldInts[i + LifeField.WIDTH / 8];

    //         const src4 = this.fieldInts[i - LifeField.WIDTH / 8 - 1];
    //         const src5 = this.fieldInts[i - 1];
    //         const src6 = this.fieldInts[i + LifeField.WIDTH / 8 - 1];

    //         const src7 = this.fieldInts[i - (LifeField.WIDTH / 8 + 1)];
    //         const src8 = this.fieldInts[i + 1];
    //         const src9 = this.fieldInts[i + LifeField.WIDTH / 8 + 1];

    //         this.tempInts[i] += (src1 << 4) + src1 + (src1 >> 4);
    //         this.tempInts[i] += (src2 << 4) + (src2 >> 4);
    //         this.tempInts[i] += (src3 << 4) + src3 + (src3 >> 4);

    //         this.tempInts[i] += (src4 >> 28) + (src5 >> 28) + (src6 >> 28);
    //         this.tempInts[i] += (src7 << 28) + (src8 << 28) + (src9 << 28);
    //     }

    //     for (var j = LifeField.WIDTH; j < (LifeField.WIDTH * LifeField.HEIGHT / 2); j += 4) {
    //         const i = j / 4;
    //         const neighours = this.tempInts[i] & 0x77777777;
    //         const alive = this.fieldInts[i];

    //         var keepAlive = ((neighours & ~0x11111111) >> 1) | (alive << 2);
    //         keepAlive ^= ~0x55555555;
    //         keepAlive &= (keepAlive >> 2);
    //         keepAlive &= (keepAlive >> 1);
    //         keepAlive &= 0x11111111;

    //         var makeNewLife = neighours | (alive << 3);
    //         makeNewLife ^= ~0x33333333;
    //         makeNewLife &= (makeNewLife >> 2);
    //         makeNewLife &= (makeNewLife >> 1);
    //         makeNewLife &= 0x11111111;

    //         this.fieldInts[i] = keepAlive | makeNewLife;
    //     }

    //     for(var y = 1; y <(LifeField.WIDTH - 1); y++) {
    //         this.set(0, y, false);
    //         this.set((LifeField.WIDTH - 1), y, false);
    //     }
    // }
    // `
    // )

    // eval(
    //     `
    //     lifeField.step = function step() {
    //         this.generation++;
    //         for (var b = 0; b < `+lifeField.tempInts.length+`; b++) {
    //           this.tempInts[b] = 0;
    //         }
    //         for (b = `+LifeField.WIDTH+`; b < `+(LifeField.WIDTH * LifeField.HEIGHT / 2)+`; b += 4) {
    //           var a = b / 4, d = this.fieldInts[a - `+(LifeField.WIDTH / 8)+`], c = this.fieldInts[a], e = this.fieldInts[a + `+(LifeField.WIDTH / 8)+`], f = this.fieldInts[a - `+((LifeField.WIDTH / 8) - 1)+`], g = this.fieldInts[a - 1], h = this.fieldInts[a +`+((LifeField.WIDTH / 8) - 1)+`], k = this.fieldInts[a - `+((LifeField.WIDTH / 8) + 1)+`], l = this.fieldInts[a + 1], m = this.fieldInts[a + `+((LifeField.WIDTH / 8) + 1)+`];
    //           this.tempInts[a] += (d << 4) + d + (d >> 4);
    //           this.tempInts[a] += (c << 4) + (c >> 4);
    //           this.tempInts[a] += (e << 4) + e + (e >> 4);
    //           this.tempInts[a] += (f >> 28) + (g >> 28) + (h >> 28);
    //           this.tempInts[a] += (k << 28) + (l << 28) + (m << 28);
    //         }
    //         for (b = `+LifeField.WIDTH+`; b < `+(LifeField.WIDTH * LifeField.HEIGHT / 2)+`; b += 4) {
    //           a = b / 4, c = this.tempInts[a] & 2004318071, e = this.fieldInts[a], d = (c & -286331154) >> 1 | e << 2, d ^= -1431655766, d &= d >> 2, d &= d >> 1, d &= 286331153, c |= e << 3, c ^= -858993460, c &= c >> 2, c &= c >> 1, c &= 286331153, this.fieldInts[a] = d | c;
    //         }
    //         for (b = 1; b <` +(LifeField.WIDTH - 1)+`; b++) {
    //           this.set(0, b, !1), this.set(`+(LifeField.WIDTH - 1)+`, b, !1);
    //         }
    //       }
    //     `)
        eval(
            `
        lifeField.initializeWithRandom = function initializeWithRandom(c, d) {
            this.generation = 0;
            for (var a = 1; a < `+(LifeField.WIDTH - 1)+`; a++) {
              for (var b = 1; b < `+(LifeField.HEIGHT - 1)+`; b++) {
                var e = random(c++);
                this.set(a, b, e < d);
              }
            }
          }
          `
        )
    

}

