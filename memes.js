memes = {};
memeID = 0;
chatElem = document.getElementById("chat")
chatIndex = 0;
chat = {
  0: "First comment HAHA :D",
  1: "Hey that kids pretty good! O_o",
  2: "dang that 5 peice was godlike",
  3: "what gun r u using?",
  4: "OMG MY FRIGGEN GOSH!!! :O",
  5: "Do you have a youtube channel?",
  6: "WHAT THE HELL!??!?!",
  7: "hacker!",
  8: "This is why i hate this game >:(",
  9: "im tellehn ya it was da dew ",
  10: "R u kidden ME!",
  11: "U what m8",
  12: "hard scoper..",
  13: "STOP USING CAPS",
  14: "Your using CAPS! (dumb) gr(ass)",
  15: "Oh ;c",
  16: "kill ur yourself",
  17: "if your 13 im 13 ( ͡° ͜ʖ ͡°)",
  18: "O_o what?",
  19: "1v1 me scrub",
  20: "wanna join my clan",
  21: "SHOTS FIRED!!",
  22: "what is it??",
  23: "SWEET MOTHER OF HEAVEN A 10 PIECE!",
  24: "look at the score board",
  25: "noob",
}
function player(){
  this.x = w/2;
  this.y = h - 305;
  this.breathRate = 0.25;
  this.upA = this.y - 20;
  this.u = true;
  this.downA = this.y + 20;
  this.d = false;
  this.fired = false;
  this.img = "noshots";
  this.aim = w/2;
  this.gun = "barret";
  this.scopedIn = false;
  this.shoot = function(){
    this.fired = true;
    switch(this.gun){
      case "barret":
        boltsniper = document.createElement("audio");
        boltsniper.src = "sniperSound.mp3";
        boltsniper.autoplay = true;
        document.body.appendChild(boltsniper);
        // setTimeout(function(){
        //   shelldrop = document.createElement("audio");
        //   shelldrop.src = "shelldrop.mp3";
        //   shelldrop.autoplay = true;
        //   document.body.appendChild(shelldrop);
        // }, 200);
        break
      case "smg":
        // smgsound = document.createElement("audio");
        // smgsound.src = "machineGun.mp3";
        // smgsound.autoplay = true;
        // document.body.appendChild(smgsound);
    }
    var shotAniInt = setInterval(a = v => {
      switch(this.gun){
        case "barret":
          this.img = "shotfired";
          break
        case "smg":
          this.img = "smgshotsfired";
          break
      }
    }, 1000/60);

    setTimeout(a = v => {
      clearInterval(shotAniInt);
      this.fired = false;
      switch(this.gun){
        case "barret":
          this.img = "noshots";
          break
        case "smg":
          this.img = "smgnoshots";
          break
      }
    }, 500);
    var strike = 0;
    averageX = 0;
    averageY = 0;
    for(var i in memes){
      if(memes[i].x - 40 < this.aim && memes[i].x + memes[i].w + 50 > this.aim){
        strike++;
        if(memes[i].type == "dogePowerUp"){
          this.gun = "smg";
          new caption(memes[i].x, memes[i].y - 20, "30px Verdana", "POWER UP");
        }
        averageX += memes[i].x;
        averageY += memes[i].y;
        new hitM(memes[i].x + memes[i].w/2 - 15, memes[i].y);
        delete memes[i];
      }
    }
    if(strike > 0){
      averageX = averageX/strike;
      averageY = averageY/strike - 50;
      if(strike > 1){
          new caption(averageX, averageY, "30px Verdana", strike + " PIECE!!");
      }
      comment = document.createElement("div");
      comment.innerHTML = chat[chatIndex];
      //breakElem = document.createElement("br");
      chatElem.append(comment);
      chatElem.scrollTop = chatElem.scrollHeight;
      //chatElem.appendChild(breakElem);
      chatIndex++;
      if(chatIndex > Object.size(chat) - 1){
        chatIndex = 0;
      }
    }
    if(strike == 3){
      obat = document.createElement("audio");
      obat.src = "ohbabyatriple.mp3";
      obat.autoplay = true;
      document.body.appendChild(obat);
    }
  }
  // canvas.onmousedown = (ev) => {
  //   //1 for left, 2 for middle, 3 for right mouse;
  //     if(ev.which == 2){
  //       this.img = "blank";
  //     }
  // };
  canvas.onclick  = a = v => {
    switch(this.gun){
      case "barret":
        this.shoot();
        break;
      case "smg":
        if(this.fired == false){
          counter = 0;
          smgsound = document.createElement("audio");
          smgsound.src = "machineGun.mp3";
          smgsound.autoplay = true;
          document.body.appendChild(smgsound);
          smgRapidFire = setInterval(a = v => {
            counter++
            this.shoot();
            if(counter >= 20){
              clearInterval(smgRapidFire);
            }
          }, 500/20);
        }
        break;
    }
  }
  this.draw = function(){
    if(this.y < this.upA){
      this.u = false;
      this.d = true;
    }
    if(this.y > this.downA){
      this.u = true;
      this.d = false;
    }
    if(this.u){
      this.y -= this.breathRate;
    }
    if(this.d){
      this.y += this.breathRate;
    }
    ctx.drawImage(eval(this.img), this.x - 400, this.y, 800, 330)
  }
}
function hitM(x, y){
  this.id = memeID;
  memes[this.id] = this;
  memeID++;
  this.x = x;
  this.y = y;
  this.w = 30;
  this.h = 30;
  setTimeout(a = v => {
    delete memes[this.id];
  }, 400);
  var sound = document.createElement("audio");
  sound.src = "hitmarkersound.mp3";
  sound.autoplay = true;
  document.body.appendChild(sound);
//  document.body.appendChild("<audio src='hitmarkersound.mp3' autoplay='true'></audio>");
  this.update = function(){}
  this.draw = function(){
    ctx.drawImage(hitmarker, this.x, this.y, this.w, this.h);
  }
}
function shrek(x, y, width, height){
  this.id = memeID;
  memes[this.id] = this;
  memeID++;
  this.w = width;
  this.h = height;
  this.x = x;
  this.initX = this.x;
  this.y = y - this.h;
  this.update = function(){
    this.y += 0.005;
    //this.x -= 0.05;
    this.w += 0.2;
    this.h += 0.2;
     if(this.x + this.w > gameW * 2){
       this.x = -this.w;
     }
     if(this.x < -gameW * 2 + w){
       this.x = w;
       //console.log(this.x);
     }
  }
  this.draw = function(){
    ctx.drawImage(shrekImg, this.x, this.y, this.w, this.h);
  }
}
function caption(x, y, font, text){
  this.id = memeID;
  memes[this.id] = this;
  memeID++;
  this.x = x;
  this.y = y;
  //"30px Verdana"
  this.font = font;
  this.text = text;
  this.colors = ["red", "yellow", "purple", "green", "blue"];
  this.color = "red";
  this.frame = 0;
  setInterval(x = v => {
    this.color = this.colors[this.frame];
    this.frame++;
    if(this.frame > this.colors.length){
      this.frame = 0;
    }
  }, 1000/20);
  setTimeout(x = v => {
    delete memes[this.id];
  }, 2500);
  this.update = function(){
  }
  this.draw = function(){
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(this.text, this.x, this.y)
  }
}
function dogePowerUp(x, y, width, height){
  this.id = memeID;
  memes[this.id] = this;
  memeID++;
  this.type = "dogePowerUp";
  this.w = width;
  this.h = height;
  this.x = x;
  this.initX = this.x;
  this.y = y - this.h;
  this.sprite = ["doge1", "doge2", "doge3", "doge4", "doge5", "doge6", "doge7", "doge8", "doge9", "doge10", "doge11", "doge12", "doge13", "doge14", "doge15", "doge16", "doge17", "doge18", "doge19", "doge20", "doge21", "doge22", "doge23", "doge24", "doge25", "doge26", "doge27", "doge28", "doge29", "doge30"];
  this.frame = 0;
  for(var i in this.sprite){
    this.sprite[i] = eval(this.sprite[i]);
  }
  setInterval(a = v => {
    this.frame++;
    if(this.frame > this.sprite.length - 1){
      this.frame = 0;
    }
  }, 1000/17)
  this.update = function(){
     if(this.x + this.w > gameW * 2){
       this.x = -this.w;
     }
     if(this.x < -gameW * 2 + w){
       this.x = w;
       //console.log(this.x);
     }
  }
  this.draw = function(){
    ctx.drawImage(this.sprite[this.frame], this.x, this.y, this.w, this.h);
  }
}
function boi(x, y, width, height){
  this.id = memeID;
  memes[this.id] = this;
  memeID++;
  this.w = width;
  this.h = height;
  this.x = x;
  this.initX = this.x;
  this.y = y - this.h;
  this.sprite = [boi1, boi2, boi3, boi4, boi5];
  this.frame = 0;
  setInterval(a = v => {
    this.frame++;
    if(this.frame > this.sprite.length - 1){
      this.frame = 0;
    }
  }, 1000/5)
  this.update = function(){
    this.y += 0.005;
    //this.x -= 0.05;
    this.w += 0.2;
    this.h += 0.2;
     if(this.x + this.w > gameW * 2){
       this.x = -this.w;
     }
     if(this.x < -gameW * 2 + w){
       this.x = w;
       //console.log(this.x);
     }
  }
  this.draw = function(){
    ctx.drawImage(this.sprite[this.frame], this.x, this.y, this.w, this.h);
  }
}
