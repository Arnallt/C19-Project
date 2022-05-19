var PLAY = 1;
var END = 0;
var gameState = PLAY;

var wayls, running, collided;
var ground, invisibleGround, groundImage;
var gameOverImg,restartImg
var cow,cows,cowImg;
var sky,skyImg;

function preload(){
  running = loadImage("wayls.png");
  collided = loadImage("collided.png");
  
  groundImage = loadImage("ground2.png");
  
  restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")

  cowImg = loadImage("cows.png");
  skyImg = loadImage("sky.png")
  
}

function setup() {
  createCanvas(600, 200);
  background("blue")
  
  wayls = createSprite(50,160,20,50);
 wayls.addAnimation("running", running);
  wayls.addAnimation("collided", collided);
  
  cow = createSprite();
  cows = createGroup();


  wayls.scale = 0.1;

  sky = createSprite(300,100);
  sky.addImage(skyImg);
  sky.scale = 0.258;
  sky.depth = 2;
  
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);

  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  invisibleGround = createSprite(200,170,400,10);
  invisibleGround.visible = false;

  wayls.setCollider("rectangle",0,0,wayls.width,wayls.height);


cows.debug = true;
  
  
  score = 0;
  
}

function draw() {
  
  background(180);
  
  
  
  if(gameState === PLAY){

    gameOver.visible = false;
    restart.visible = false;

    wayls.depth = 10;

    if(keyDown("space") && wayls.y > 100) {
      wayls.velocityY = -12;
      
  }

    wayls.rotation += 6;

    spawnObstacles();

    ground.velocityX = -(4 + 3* score/100)

    score = score + Math.round(getFrameRate()/60);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
     
    
    

    wayls.velocityY = wayls.velocityY + 0.8

    if(wayls.isTouching(cows)){
      gameState = END;
    }

  }
   else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;

     
      wayls.changeAnimation("collided", collided);
    
     
      cows.destroyEach();
      ground.velocityX = 0;
      wayls.velocityY = 0
      wayls.rotation = wayls.rotation;
      fill("black");
      rectMode(CENTER);
      var screen = rect(300,100,600,200);
      rect.depth = wayls.depth + cows.depth + ground.depth;
      
     
     
     if(mousePressedOver(restart)) {
      reset();
    }
   }
  
 

  wayls.collide(invisibleGround);
  
 


  drawSprites();
}

function reset(){
  gameState = PLAY;

  restart.visible = false;
  gameOver.visible = false;
  cows.destroyEach();



  wayls.changeAnimation("running", running);

  score = 0;
  

}

  function spawnObstacles(){
    if (frameCount % 60 === 0){
      var posi = [600,590,580,570];
      var cow = createSprite(random(posi),171,10,40);
      cow.velocityX = -(6 + score/100);
      cow.scale = 0.3;
      cow.lifetime = 300;
      cow.addImage(cowImg);
      cows.add(cow);
      cow.depth = wayls.depth - 1;
 }
}

