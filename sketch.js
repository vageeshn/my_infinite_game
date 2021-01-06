var runner,runnerImage; 
var ground,groundImage,invisibleground;
var spike,trapGroup;
var coin,coingroup,coinImage,coinSound;
var deathSound,gameover,gameoverImage;
var score;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var points;

function preload(){
   runnerImage= loadAnimation("runner.gif");
  groundImage = loadImage("nground.jpg");
  spikeImage = loadImage("spikes.jpg");
  coinImage = loadImage("coin.jpg");
  coinSound = loadSound("Hr_coin #20807.wav");
  deathSound = loadSound("Hr_death #20836.wav");
  gameoverImage = loadImage("gameover.png");
}

function setup() {
 createCanvas(800,600);
  
  ground=createSprite(400,450,1400,100);
  ground.addImage(groundImage);
  ground.scale = 5.25;
  
  
  runner = createSprite(100,450,30,60);
  runner.addAnimation("running",runnerImage);
  runner.scale=0.15;
  
  invisibleground = createSprite(300,560,600,50);
  invisibleground.visible = false;
  
  score=0;
  points =0;
  
  trapGroup = new Group();
  coinGroup = new Group();
  
}

function draw() {
  background('lightblue');
  
  console.log(runner.y);
   textSize(20);
  fill("black");
  text("SCORE: "+ score,600,50);
  
    
    textSize(20);
  fill("yellow");
  text("POINTS: "+ points,600,100);
 
  if(gamestate===PLAY){
    
    ground.velocityX=-4;
  if(ground.x<0){
  ground.x = ground.width/2; 
 }
     ground.velocityX = -(4+2*(score/100));
  
    score = score + Math.round(getFrameRate()/60);
    
  if(keyDown("space")&&runner.y >= 449){
    runner.velocityY=-19;
  }
  
  runner.velocityY=runner.velocityY+0.45;
  
  runner.collide(invisibleground);
    
     if(runner.isTouching(coinGroup)){
         points = points +5;
         coinGroup.destroyEach();
         coinSound.play();
       }
  
  spikes();
  coins();
    
  if(runner.isTouching(trapGroup)){                         gamestate=END;
      deathSound.play();                             
     }
  }
  else if(gamestate===END) {
    ground.velocityX=0; 
    spike.velocityX=0;
    coinGroup.destroyEach();
    trapGroup.destroyEach();
    runner.destroy();
    ground.destroy();
    gameover=createSprite(400,300,800,600);
    gameover.addImage(gameoverImage);
    gameover.scale =0.5;
  runner.velocityY=0;
  }
  drawSprites();
}

function spikes(){
    if (frameCount%200===0){
      spike = createSprite(575,520,50,50);
      spike.addImage(spikeImage);
      spike.scale=0.3;
      spike.velocityX=-(4+score/100);
      spike.lifetime = 200;
      trapGroup.add(spike);
    }
}

function coins(){
    if (frameCount%150===0){
      coin = createSprite(600,500,50,50);
      coin.y=Math.round(random(100,400));
      coin.addImage(coinImage);
      coin.scale=0.2;
      coin.velocityX=-4;
      coin.lifetime = 200;
      coinGroup.add(coin);
    }
}