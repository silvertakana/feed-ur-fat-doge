var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood,fattening,kill_it,dead = false,deadDog;
var foodObj,lastfeed,lf,buynew,isDead;

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
deadDog=loadImage("dead dog.jpg");
}


function setup() {
  createCanvas(1000,400);
  database=firebase.database();
  
  foodObj = new Food();
  

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  lf=database.ref('lastfeed');
  lf.on("value",(data)=>{
    lastfeed = data.val();
  });
  isDead=database.ref('dead?');
  isDead.on("value",(data)=>{
    dead = data.val();
  });
  dog=createSprite(800,200,150,150);
  dog.scale=0.15;
  dog.addImage(sadDog);
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  fattening=createButton("fattening");
  fattening.position(700,95);
  fattening.mousePressed(feedDog);
  kill_it=createButton("Kill it");
  kill_it.position(600,95);
  kill_it.mousePressed(kill);
  buynew=createButton("buy new");
  buynew.position(500,95);
  buynew.mousePressed(newdog);

  //create feed the dog button here

  
}

function draw() {
  background(46,139,87);
  foodObj.display();
print(dead)
if(dead===true){
  dog.addImage(deadDog);
}
  //write code to read fedtime value from the database 
  
 
  //write code to display text lastFed time here

 
  drawSprites();
  let ampm
  if(lastfeed > 12){
    ampm = "pm"
  }else{
    ampm = "am"
  }
  push()
  fill(255)
  text("last feed "+lastfeed%12+" "+ampm,800,30)
  pop()
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}
function newdog(){
  dog.addImage(sadDog);
  dead = false
  database.ref('/').update({
    'dead?': dead
  })
}
function feedDog(){
  if(dead!==true){
    lastfeed = hour()
dog.addImage(happyDog);
    if(!(foodS <= 0)){
  foodS--;
  database.ref('/').update({
    Food:foodS,
    lastfeed:lastfeed
  })
}
}
  //write code here to update food stock and last fed time

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
function kill(){
  dog.addImage(deadDog);
  dead = true;
  database.ref('/').update({
    'dead?': dead
  })
  
}
