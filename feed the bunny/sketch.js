const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground,rope,fruit,fl,bgi,fi,bi,bunny,blink,eat,sad,grd,bgs,cs,ss,es,air,bw,mtbtn,mt,sd
function preload(){
  bgi=loadImage("background.png")
  fi=loadImage("melon.png")
  bi=loadImage("Rabbit-01.png")
  bgs=loadSound("sound1.mp3")
  cs=loadSound("rope_cut.mp3")
  ss=loadSound("sad.wav")
  es=loadSound("eating_sound.mp3")
  air=loadSound("air.wav")
  md=loadAnimation("mute1.png")
  sd=loadAnimation("volume.png")

 
  blink=loadAnimation("blink_1.png","blink_2.png","blink_3.png")
  eat=loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png")
  sad=loadAnimation("sad_1.png","sad_2.png","sad_3.png")
 
  blink.playing=true
  eat.playing=true
  eat.looping=false
  sad.looping=false

}



function setup() 
{
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,690,600,20);
  rope=new Rope(5,{x:250,y:50})
  fruit=Bodies.circle(250,350,20)
  blink.frameDelay=20
  Matter.Composite.add(rope.body,fruit)
  //sad.frameDelay=30
  fl=new Link(rope,fruit)
  bunny= createSprite(width-50,600)
 // bunny.addImage(bi)
 bunny.addAnimation("blink",blink)
 bunny.addAnimation("eat",eat)
 bunny.addAnimation("sad",sad)
 
  bunny.scale=0.25
  mtbtn=createSprite(width-50,50)
  mtbtn.addAnimation("volume",sd)
  mtbtn.addAnimation("mute",md)
 
mtbtn.scale=0.08
 // bgs.play()
  bgs.setVolume(0.05)
 
  imageMode(CENTER)

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  btn1= createImg("cut_button.png")
  btn1. position(230,50)
  btn1.size(50,50)
  btn1.mouseClicked(drop)
  grd=createSprite(width/2,height-10,width,20)
  grd.visible=false
  bw= createImg("balloon.png")
  bw. position(10,200)
  bw.size(150,100)
  bw.mouseClicked(blow)
}


function draw() 
{
  background(51);
  image(bgi,width/2,height/2,width,height)
 // ground.show();
  
  Engine.update(engine);

  rope.show()
  if(fruit)
image(fi,fruit.position.x,fruit.position.y,70,70)
if(collide(fruit,bunny)){
  bunny.changeAnimation("eat")
}
if(collide(fruit,ground.body)){
  bunny.changeAnimation("sad")
  console.log(78)
}
//mtbtn.mousePressedOver(()=>{
//mtbtn.changeAnimation("mute")
//})
if(mousePressesOver(mtbtn)){
  mtbtn.changeAnimation("mute")
}

  
  

 
  drawSprites()
   
}
function drop(){
  fl.detach()
  rope.break()
  fl=null
}
function collide(body,sprite){
  if(body){
    var d=dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)
   // console.log(d)
    if(d<=80){
      Matter.World.remove(world,fruit)
      fruit=null
      return true
    }
    else{
      return false
    }
  }
  
}
function blow(){
  Matter.Body.applyForce(fruit,fruit.position,{x:0.05,y:0})
  air.play()
}
