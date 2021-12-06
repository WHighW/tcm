// Música
var audio = new Audio('sounds/musica.mp3');
if (typeof audio.loop == 'boolean')
{
    audio.loop = true;
    audio.play();
    audio.volume = 0.15;
}
else
{
    audio.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
}

function mutarMusica(){
if(audio.muted == true) {
audio.muted = false;
}
else if(audio.muted == false) {
audio.muted = true;
}

var btn = document.getElementById('mutarMusica');
if (btn.value == "&#9654") {
btn.value = "&#9616;&nbsp;&#9612;";
btn.innerHTML = "&#9616;&nbsp;&#9612;";
}
else{
btn.value = "&#9654";
btn.innerHTML = "&#9654";
}
}

var
COLS = 26,
ROWS = 26,
EMPTY = 0,
SNAKE = 1,
FRUIT = 2,
LEFT  = 0,
UP    = 1,
RIGHT = 2,
DOWN  = 3,
KEY_LEFT  = 37,
KEY_UP    = 38,
KEY_RIGHT = 39,
KEY_DOWN  = 40,
canvas,   
ctx,   
keystate, 
frames,   
score;   
 
grid = {
 
 width: null,  
 height: null, 
 _grid: null,  
 
 
 init: function(d, c, r) {
 this.width = c;
 this.height = r;
 
 this._grid = [];
 for (var x=0; x < c; x++) {
 this._grid.push([]);
 for (var y=0; y < r; y++) {
 this._grid[x].push(d);
        }
    }
},
 
 
 set: function(val, x, y) {
 this._grid[x][y] = val;
 },
 
 
 get: function(x, y) {
 return this._grid[x][y];
 }
}
 
 
snake = {
 
 direction: null, 
 last: null, 
 _queue: null, 
 
 
 init: function(d, x, y) {
 this.direction = d;
 
 this._queue = [];
 this.insert(x, y);
 },
 
 
 insert: function(x, y) {
 
 this._queue.unshift({x:x, y:y});
 this.last = this._queue[0];
 },
 
 
 remove: function() {
 
 return this._queue.pop();
 }
};
 
 
function setFood() {
 var empty = [];
 
 for (var x=0; x < grid.width; x++) {
 for (var y=0; y < grid.height; y++) {
 if (grid.get(x, y) === EMPTY) {
 empty.push({x:x, y:y});
 }
 }
 }
 
 var randpos = empty[Math.round(Math.random()*(empty.length - 1))];
 grid.set(FRUIT, randpos.x, randpos.y);
}
 
 
function jogar() {
 document.getElementById("mutarMusica").style.marginTop = "20px";
 document.getElementById("setas").style.display = "inline-block";
 document.getElementById("snake").style.display = "none";
 document.getElementById("modo").style.display = "none";
 document.getElementById("sair").style.visibility = "visible";
 document.getElementById("reiniciar").style.visibility = "visible";
 document.getElementById("normal").style.visibility = "hidden";
 document.getElementById("voltar").style.visibility = "hidden";
 canvas = document.createElement("canvas");
 canvas.width = COLS*21;
 canvas.height = ROWS*20;
 ctx = canvas.getContext("2d");
 
 document.body.appendChild(canvas);
 
 
 ctx.font = "12px Helvetica";
 
 frames = 0;
 keystate = {};
 
 document.addEventListener("keydown", function(evt) {
 keystate[evt.keyCode] = true;
 });
 document.addEventListener("keyup", function(evt) {
 delete keystate[evt.keyCode];
 });
 
 
 init();
 loop();
}
 
 
function init() {
 score = 0;
 
 grid.init(EMPTY, COLS, ROWS);
 
 var sp = {x:Math.floor(COLS/2), y:ROWS-1};
 snake.init(UP, sp.x, sp.y);
 grid.set(SNAKE, sp.x, sp.y);
 
 setFood();
}
 
 
function loop() {
 update();
 draw();
 
 window.requestAnimationFrame(loop, canvas);
}
 
 
function update() {
 frames++;
 
 
 if (keystate[KEY_LEFT] && snake.direction !== RIGHT) {
 snake.direction = LEFT;
 }
 if (keystate[KEY_UP] && snake.direction !== DOWN) {
 snake.direction = UP;
 }
 if (keystate[KEY_RIGHT] && snake.direction !== LEFT) {
 snake.direction = RIGHT;
 }
 if (keystate[KEY_DOWN] && snake.direction !== UP) {
 snake.direction = DOWN;
 }
 
 
 if (frames%7 === 0) {
 
 var nx = snake.last.x;
 var ny = snake.last.y;
 
 
 switch (snake.direction) {
 case LEFT:
 nx--;
 break;
 case UP:
 ny--;
 break;
 case RIGHT:
 nx++;
 break;
 case DOWN:
 ny++;
 break;
 }
 
 
 if (0 > nx || nx > grid.width-1  || 0 > ny || ny > grid.height-1 || grid.get(nx, ny) === SNAKE
) {
 window.alert("VOCÊ PERDEU");
 return init();
 }
 
 if(grid.get(nx, ny) === FRUIT) {
 score++;
 setFood();
 }
 else {
 var tail = snake.remove();
 grid.set(EMPTY, tail.x, tail.y);
 }
 
 grid.set(SNAKE, nx, ny);
 snake.insert(nx, ny);
 }
}
 
 
function draw() {
 
 var tw = canvas.width/grid.width;
 var th = canvas.height/grid.height;
 
 for (var x=0; x < grid.width; x++) {
 for (var y=0; y < grid.height; y++) {
 
 switch (grid.get(x, y)) {
 case EMPTY:
 ctx.fillStyle = "black";
 break;
 case SNAKE:
 ctx.fillStyle = "purple";
 break;
 case FRUIT:
 ctx.fillStyle = "#FF0000";
 break;
 }
 ctx.fillRect(x*tw, y*th, tw, th);
 }
 }
 
 ctx.fillStyle = "#fff";
 ctx.fillText("PONTUAÇÃO: " + score, 10, canvas.height-10);
}