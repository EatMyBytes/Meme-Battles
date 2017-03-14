Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};
function reverseForIn(obj, f) {
  var arr = [];
  for (var key in obj) {
    // add hasOwnPropertyCheck if needed
    arr.push(key);
  }
  for (var i=arr.length-1; i>=0; i--) {
    f.call(obj, arr[i]);
  }
}
window.onload = function(){

  canvas = document.createElement("canvas");
  canvas.width = w = window.innerWidth;
  canvas.height = h = window.innerHeight;
  ctx = canvas.getContext("2d");
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, w, h);
  document.body.appendChild(canvas);
  gameW = 3500;
  gameH = h;
  panPos = w/2;
  gameX = 0//p.x - gameW/2;
  gameY = 0//p.y - gameH/2;
  mouseY = 0;
  mouseX = w/2;
  groundMax = h - 100;
  groundMin = (440/580) * gameH;
  canvas.onmousemove = function(e){
    mouseX = e.clientX;
    mouseY = e.clientY;
  }
  fps = 1000/60;
  images = ["blank", "barretScope", "chip", "dew", "diritosbag", "herecomedatboi", "boi1", "boi2", "boi3", "boi4", "boi5", "fbfield", "grass", "stadium", "shrekImg", "noshots", "shotfired", "hitmarker", "doge1", "doge2", "doge3", "doge4", "doge5", "doge6", "doge7", "doge8", "doge9", "doge10", "doge11", "doge12", "doge13", "doge14", "doge15", "doge16", "doge17", "doge18", "doge19", "doge20", "doge21", "doge22", "doge23", "doge24", "doge25", "doge26", "doge27", "doge28", "doge29", "doge30", "smgnoshots", "smgshotsfired"];
  console.log(chip);
  p = new player();
  new caption(w/2, h/2, "30px Arial", "NO SCOPE!!")
  loadRecources();
  function loadRecources(){
    for(var i in images){
      eval(images[i] +"= new Image()");
      eval(images[i] +".src = " + "'" + images[i] +  ".png'");
    }
    setInterval(update, fps);

  }
  //b = new dogePowerUp(w/2, h/2, 100, 100);
  setInterval(function(){
    new dogePowerUp(Math.random() * gameW*4 - gameW*2, h/2, 100, 100);
  }, 15000);
  setInterval(function(){
    new boi(Math.random() * gameW*4 - gameW*2, groundMin, 50, 50);
    //new shrek(Math.random() * gameW*4 - gameW*2, groundMin, 50, 50);
    //new boi(400, groundMin, 50, 50);
  }, 1000/2);
  function update(){
    draw();
  }
  function draw(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, w, h);
    panPos += (mouseX - w/2) * 0.03;
    for(var i in memes){
      memes[i].x -= (mouseX - w/2) * 0.03;
    }
    rX = -100;
    for(var i = 0; i < 200; i++){
      ctx.drawImage(stadium, gameW * rX - panPos, 0, gameW, gameH);
      rX++;
    }
    for(var i in memes){
      memes[i].update();
    }
    reverseForIn(memes, function(key){this[key].draw()});

    p.draw();
  }
}
