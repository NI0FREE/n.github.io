window.onload = function() {
    setTimeout(function() {
      loadRandom();
    }, 1250);
    setTimeout(function() {
      setInterval(function() {
        document.getElementById("log").innerHTML = "iterations per second: " + lifeField.generation;
        lifeField.generation = 0;
      }, 1000);
    }, 5000);
    var wallSIZE1 = 1024;
    var wallSIZE2 = 1024;
    Start();
    updateFuncs();
    gameGameGame();
    function gameGameGame() {
      var countMove = 0;
      setInterval(function() {
        if (countMove > 1) {
          countMove--;
        }
      }, 100);
      var colordecode = ["red", "green", "blue", "white", "black", "#641c00", "#f6d4c7", "#9e94de", "#b86b8d", "#ea28ab"];
      var scanv = document.getElementById("scanv");
      scanv.width = wallSIZE1 * 30;
      scanv.height = wallSIZE2 * 30;
      document.getElementById("scanv").remove();
      var scanvx = scanv.getContext("2d");
      scanvx.lineWidth = 1;
      for (var xl = 0; xl < wallSIZE1 * 30; xl += 30) {
        scanvx.moveTo(xl, 0);
        scanvx.lineTo(xl, wallSIZE1 * 30);
      }
      for (var yl = 0; yl < wallSIZE2 * 30; yl += 30) {
        scanvx.moveTo(0, yl);
        scanvx.lineTo(wallSIZE2 * 30, yl);
      }
      scanvx.strokeStyle = "#a9203e";
      scanvx.stroke();
      var canvcanv = document.getElementById("largecanv");
      var ctx = canvcanv.getContext("2d");
      var lcanv = document.getElementById("field");
      var gtx = lcanv.getContext("2d", {alpha:false});
      document.getElementById("field").remove();
      var pix = [];
      var bool = 0;
      var color = "red";
      console.log(pix);
      canvcanv.width = window.outerWidth;
      canvcanv.height = window.outerHeight;
      (function() {
        context = canvcanv.getContext("2d");
        canvcanv.width = window.innerWidth;
        canvcanv.height = window.innerHeight;
      })();
      function placePix(e) {
        console.log(e);
        var pixLenght = gSize / 300;
        var c = lifeField.cells;
        var b = lifeField.background;
        var Xx = Math.floor((e.clientX - gameX) / pixLenght);
        var Yy = Math.floor((e.clientY - gameY) / pixLenght);
        var moodPIX = lifeField.getNormal(Xx, Yy);
        console.log(moodPIX);
        if (moodPIX) {
          lifeField.set(Xx, Yy, false);
          gtx.fillStyle = "rgb(" + parseInt(b[8] + b[9], 16) + "," + parseInt(b[6] + b[7], 16) + "," + parseInt(b[4] + b[5], 16) + ")";
        } else {
          lifeField.set(Xx, Yy, true);
          gtx.fillStyle = "rgb(" + parseInt(c[8] + c[9], 16) + "," + parseInt(c[6] + c[7], 16) + "," + parseInt(c[4] + c[5], 16) + ")";
        }
        gtx.fillRect(Xx, Yy, 1, 1);
      }
      function draw(size, X) {
        if (!X) {
          X = 1;
        }
        ctx.clearRect(0, 0, canvcanv.width, canvcanv.height);
        ctx.mozImageSmoothingEnabled = false;
        ctx.webkitImageSmoothingEnabled = false;
        ctx.msImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;
        gtx.mozImageSmoothingEnabled = false;
        gtx.webkitImageSmoothingEnabled = false;
        gtx.msImageSmoothingEnabled = false;
        gtx.imageSmoothingEnabled = false;
        ctx.drawImage(lcanv, gameX * X, gameY * X, size / 300 * wallSIZE1, size / 300 * wallSIZE2);
        if (size > 5500) {
          ctx.drawImage(scanv, gameX * X, gameY * X, size / 300 * wallSIZE1, size / 300 * wallSIZE2);
        }
      }
      function randomInteger(min, max) {
        var rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
      }
      var gSize = 500 * 300 / wallSIZE1, gameX = window.innerWidth / 2 - 250, gameY = window.innerHeight / 2 - 250, lastX = 0, lastY = 0;
      var canvasDr = false, candraw = true;
      canvcanv.addEventListener("mousedown", function(event) {
        canvasDr = true;
      }, false);
      canvcanv.addEventListener("mousemove", function(event) {
        if (canvasDr) {
          if (countMove > 5) {
            candraw = false;
            gameX += event.clientX - lastX;
            gameY += event.clientY - lastY;
          } else {
            countMove++;
          }
        }
        lastX = event.clientX;
        lastY = event.clientY;
      }, false);
      canvcanv.addEventListener("mouseup", function(e) {
        if (candraw) {
          if (gSize > 6000) {
            placePix(e);
          }
        }
        canvasDr = false;
        candraw = true;
      }, false);
      function addOnWheel(elem, handler) {
        if (elem.addEventListener) {
          if ("onwheel" in document) {
            elem.addEventListener("wheel", handler);
          } else if ("onmousewheel" in document) {
            elem.addEventListener("mousewheel", handler);
          } else {
            elem.addEventListener("MozMousePixelScroll", handler);
          }
        } else {
          text.attachEvent("onmousewheel", handler);
        }
      }
      var zoomP = 70;
      var scaleresuctor = 60;
      addOnWheel(canvcanv, function(e) {
        if (e.deltaY < 0 && zoomP < 1315) {
          zoomP = zoomP + 10;
          var xxx = Math.trunc((gameX - lastX) * -1 / (gSize / zoomP) * 1000) / 1000;
          var yyy = Math.trunc((gameY - lastY) * -1 / (gSize / zoomP) * 1000) / 1000;
          gSize = gSize + zoomP;
          gameX = gameX - xxx;
          gameY = gameY - yyy;
          scaleresuctor + 5;
        } else if (e.deltaY > 0 && gSize > 505 * 300 / 1000) {
          var xxx$0 = Math.trunc((gameX - lastX) * -1 / (gSize / zoomP) * 1000) / 1000;
          var yyy$1 = Math.trunc((gameY - lastY) * -1 / (gSize / zoomP) * 1000) / 1000;
          gSize = gSize - zoomP;
          gameX = gameX + xxx$0;
          gameY = gameY + yyy$1;
          if (zoomP < 140) {
          } else {
            zoomP = zoomP - 10;
          }
          scaleresuctor - 5;
        }
        e.preventDefault();
      });
      var log = document.getElementById("log");
      function loglog(logg) {
        log.innerHTML = "VER 21.01.06.01 / " + logg;
      }
      var lastRazn = 0;
      var movecount = 0;
      canvcanv.addEventListener("touchstart", function(event) {
        canvasDr = true;
        lastX = event.touches[0].clientX;
        lastY = event.touches[0].clientY;
        event.preventDefault();
        lastRazn = 0;
        console.log(event);
      }, false);
      canvcanv.addEventListener("touchmove", function(event) {
        if (movecount > 1) {
          var allTouches = event.touches.length;
          if (canvasDr && allTouches == 1) {
            if (countMove > 1) {
              candraw = false;
              gameX += event.touches[0].clientX - lastX;
              gameY += event.touches[0].clientY - lastY;
              console.log("X: " + gameX + " Y: " + gameY);
              loglog(gSize);
            } else {
              countMove++;
            }
          } else if (allTouches == 2) {
            candraw = false;
            phoneZoom(event.touches[0], event.touches[1]);
          }
          lastX = event.touches[0].clientX;
          lastY = event.touches[0].clientY;
        } else {
          movecount = movecount + 1;
        }
        event.preventDefault();
      }, false, {passive:false});
      canvcanv.addEventListener("touchend", function(event) {
        movecount = 0;
        canvasDr = false;
        if (candraw) {
          if (gSize > 6000) {
            placePix(event.changedTouches[0]);
          }
        }
        if (event.touches.length == 0) {
          candraw = true;
        }
        console.log(event);
        event.preventDefault();
      }, false);
      var phoneZoomFix = 1;
      function phoneZoom(one, two) {
        zoomP = 7;
        var dist = Math.hypot(one.pageX - two.pageX, one.pageY - two.pageY);
        var x1, x2;
        if (one.pageX > two.pageX) {
          x1 = two.pageX;
          x2 = one.pageX;
        } else {
          x1 = one.pageX;
          x2 = two.pageX;
        }
        var y1, y2;
        if (one.pageY > two.pageY) {
          y1 = two.pageY;
          y2 = one.pageY;
        } else {
          y1 = one.pageY;
          y2 = two.pageY;
        }
        var touchCenterX = (x2 - x1) / 2 + x1;
        var touchCenterY = (y2 - y1) / 2 + y1;
        if (lastRazn == 0) {
          lastRazn = dist;
        } else {
          var raznrazn = lastRazn - dist;
          var strPress = Math.trunc(raznrazn * 100) / 100;
          if (strPress < 0) {
            strPress = strPress * -1;
          }
          var FZP = zoomP;
          var FZP1 = zoomP;
          var FGS1 = gSize + (FZP + 7 * strPress);
          if (FZP1 > 1) {
            FZP1 = FZP1 + 7 * strPress;
          }
          var FGS2 = gSize - FZP1;
          if (raznrazn < 0 && FGS1 < 13000 && strPress > 0.1) {
            zoomP = zoomP + 7 * strPress;
            var xxx = Math.trunc((gameX - touchCenterX) * -1 / (gSize / zoomP) * 100) / 100;
            var yyy = Math.trunc((gameY - touchCenterY) * -1 / (gSize / zoomP) * 100) / 100;
            gSize = gSize + zoomP;
            gameX = gameX - xxx;
            gameY = gameY - yyy;
          } else if (raznrazn > 1 && FGS2 > 250 && strPress > 0.1) {
            if (zoomP > 1) {
              zoomP = zoomP + 7 * strPress;
            }
            var xxx$2 = Math.trunc((gameX - touchCenterX) * -1 / (gSize / zoomP) * 100) / 100;
            var yyy$3 = Math.trunc((gameY - touchCenterY) * -1 / (gSize / zoomP) * 100) / 100;
            gSize = gSize - zoomP;
            gameX = gameX + xxx$2;
            gameY = gameY + yyy$3;
          }
          lastRazn = dist;
        }
      }
      animate();
      function animate() {
        requestAnimationFrame(animate);
        draw(gSize);
      }
    }
  };
