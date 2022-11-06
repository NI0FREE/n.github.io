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
    const seed = 894198712345;
    const threshold = 0.6;
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

function updateFuncs(){

    eval(`
    lifeField.draw = function(imagePixels) {
        for(var i = 0; i < `+imagePixels.length+`; i += 2) {
            const val = this.fieldBytes[`+LifeField.WIDTH+`/2 + (i>>1)];
            imagePixels[i] = (val & 1) == 0 ? `+lifeField.background+` : `+lifeField.cells+`;
            imagePixels[i + 1] = (val & 16) == 0 ? `+lifeField.background+` : `+lifeField.cells+`;
        }
    }
    `)
    eval(
    `
    lifeField.step = function() {
        this.generation++;
        for(var i = 0; i < `+lifeField.tempInts.length+`; i++) this.tempInts[i] = 0;

        for (var j = `+LifeField.WIDTH+`; j < `+(LifeField.WIDTH * LifeField.HEIGHT / 2)+`; j += 4)
        {
            const i = j / 4;

            const src1 = this.fieldInts[i - `+(LifeField.WIDTH / 8)+`];
            const src2 = this.fieldInts[i];
            const src3 = this.fieldInts[i + `+(LifeField.WIDTH / 8)+`];

            const src4 = this.fieldInts[i - `+(LifeField.WIDTH / 8 - 1)+`];
            const src5 = this.fieldInts[i - 1];
            const src6 = this.fieldInts[i + `+(LifeField.WIDTH / 8 - 1)+`];

            const src7 = this.fieldInts[i - `+(LifeField.WIDTH / 8 + 1)+`];
            const src8 = this.fieldInts[i + 1];
            const src9 = this.fieldInts[i + `+(LifeField.WIDTH / 8 + 1)+`];

            this.tempInts[i] += (src1 << 4) + src1 + (src1 >> 4);
            this.tempInts[i] += (src2 << 4) + (src2 >> 4);
            this.tempInts[i] += (src3 << 4) + src3 + (src3 >> 4);

            this.tempInts[i] += (src4 >> 28) + (src5 >> 28) + (src6 >> 28);
            this.tempInts[i] += (src7 << 28) + (src8 << 28) + (src9 << 28);
        }

        for (var j = `+LifeField.WIDTH+`; j < `+(LifeField.WIDTH * LifeField.HEIGHT / 2)+`; j += 4) {
            const i = j / 4;
            const neighours = this.tempInts[i] & 0x77777777;
            const alive = this.fieldInts[i];

            var keepAlive = ((neighours & ~0x11111111) >> 1) | (alive << 2);
            keepAlive ^= ~0x55555555;
            keepAlive &= (keepAlive >> 2);
            keepAlive &= (keepAlive >> 1);
            keepAlive &= 0x11111111;

            var makeNewLife = neighours | (alive << 3);
            makeNewLife ^= ~0x33333333;
            makeNewLife &= (makeNewLife >> 2);
            makeNewLife &= (makeNewLife >> 1);
            makeNewLife &= 0x11111111;

            this.fieldInts[i] = keepAlive | makeNewLife;
        }

        for(var y = 1; y <` +(LifeField.WIDTH - 1)+`; y++) {
            this.set(0, y, false);
            this.set(`+(LifeField.WIDTH - 1)+`, y, false);
        }
    }
    `
    )
    
    

}

