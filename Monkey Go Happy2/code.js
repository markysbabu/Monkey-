var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["a6870703-0124-47f7-acff-dbe905f5014c","5ce44e39-12ac-4a66-88cf-a87a0ed6a180","33841f90-7a53-4346-b956-e51d1961959b","19735913-7394-455b-ba71-8d42e6b5851d","2c96386f-2791-4367-839e-ff795e9cb014"],"propsByKey":{"a6870703-0124-47f7-acff-dbe905f5014c":{"name":"monkey","sourceUrl":null,"frameSize":{"x":560,"y":614},"frameCount":10,"looping":true,"frameDelay":12,"version":"rzvbqHT7UuL7cemGRupOUmvOtiWW8xtU","loadedFromSource":true,"saved":true,"sourceSize":{"x":1680,"y":1842},"rootRelativePath":"assets/a6870703-0124-47f7-acff-dbe905f5014c.png"},"5ce44e39-12ac-4a66-88cf-a87a0ed6a180":{"name":"Banana","sourceUrl":"assets/v3/animations/0Pmc2UypwJxUUUBBxMOOYmiSvh97BJLRo_BQZbjyEto/5ce44e39-12ac-4a66-88cf-a87a0ed6a180.png","frameSize":{"x":1080,"y":1080},"frameCount":1,"looping":true,"frameDelay":4,"version":"o8DT7T.H_r5KvM5Dn9Vm07VxyVLa1dt0","loadedFromSource":true,"saved":true,"sourceSize":{"x":1080,"y":1080},"rootRelativePath":"assets/v3/animations/0Pmc2UypwJxUUUBBxMOOYmiSvh97BJLRo_BQZbjyEto/5ce44e39-12ac-4a66-88cf-a87a0ed6a180.png"},"33841f90-7a53-4346-b956-e51d1961959b":{"name":"Stone","sourceUrl":"assets/v3/animations/0Pmc2UypwJxUUUBBxMOOYmiSvh97BJLRo_BQZbjyEto/33841f90-7a53-4346-b956-e51d1961959b.png","frameSize":{"x":512,"y":512},"frameCount":1,"looping":true,"frameDelay":4,"version":"II3XbskLvWklj4oKAFRvkQFyb5htiMvi","loadedFromSource":true,"saved":true,"sourceSize":{"x":512,"y":512},"rootRelativePath":"assets/v3/animations/0Pmc2UypwJxUUUBBxMOOYmiSvh97BJLRo_BQZbjyEto/33841f90-7a53-4346-b956-e51d1961959b.png"},"19735913-7394-455b-ba71-8d42e6b5851d":{"name":"farmland","frameCount":1,"frameSize":{"x":400,"y":400},"looping":true,"frameDelay":2,"categories":["backgrounds"],"jsonLastModified":"2020-07-16 22:27:34 UTC","pngLastModified":"2020-01-29 19:48:00 UTC","version":"8RkOLYC69Uhn.b7A1GaLNOBfPiC_hGvT","sourceUrl":"assets/api/v1/animation-library/gamelab/8RkOLYC69Uhn.b7A1GaLNOBfPiC_hGvT/category_backgrounds/farm_land.png","sourceSize":{"x":400,"y":400},"loadedFromSource":true,"saved":true,"rootRelativePath":"assets/api/v1/animation-library/gamelab/8RkOLYC69Uhn.b7A1GaLNOBfPiC_hGvT/category_backgrounds/farm_land.png"},"2c96386f-2791-4367-839e-ff795e9cb014":{"sourceSize":{"x":1003,"y":771},"frameSize":{"x":1003,"y":771},"frameCount":1,"frameDelay":4,"name":"jungle","sourceUrl":"assets/v3/animations/nUaKg3GPaDwYstYBVLuPwpLHr2LbCquw1MunPB1QjuM/2c96386f-2791-4367-839e-ff795e9cb014.png","size":87268,"version":"WS.pVJ8R3xR4YdsNlVQCFbzCyT9eH2Wk","looping":true,"loadedFromSource":true,"saved":true,"rootRelativePath":"assets/v3/animations/nUaKg3GPaDwYstYBVLuPwpLHr2LbCquw1MunPB1QjuM/2c96386f-2791-4367-839e-ff795e9cb014.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

var monkey = createSprite(100,340,20,50);
monkey.setAnimation("monkey");
monkey.scale = 0.1;


var ground = createSprite(400,340,800,10);
ground.velocityX = -4;
ground.x=ground.width/2;

var bananaGroup = createGroup();
var obstacleGroup = createGroup();
var area = createSprite(200,200,400,400);
area.setAnimation("jungle");
area.x = area.width/2;
area.velocityX = -4;
//var survivaltime = 0;
var score = 0;

function draw() {
 
  background("white");
  if (area.x<0) {
   area.x=area.width/2;
  }
  if (keyDown("space")) {
    monkey.velocityY = -12;
    
  }
  monkey.velocityY =  monkey.velocityY + 0.8;
  monkey.collide(ground);
  spawnbananas();
  
  spawnobstacles();
  //console.log(monkey.y);
  
if (bananaGroup.isTouching(monkey)) {
  bananaGroup.destroyEach();
  score++;
}

if (obstacleGroup.isTouching(monkey)) {
  score = 0;
}









drawSprites();
/*stroke("black");
 textSize(20);
 fill("black");
 survivaltime=Math.ceil(frameCount/frameRate())
 text("Survival Time:" + survivaltime,100,50);*/
 textSize(20);
 fill("black");
 text("score:"+score,100,50);
}

function spawnbananas() {
if (World.frameCount % 80 === 0) {
var banana = createSprite(600,250,40,10);
banana.y  = randomNumber(120,200);
banana.setAnimation("Banana");
banana.scale = 0.05;
banana.velocityX = -4;
banana.lifetime = 150;

banana.depth = monkey.depth;
monkey.depth = monkey.depth + 1;

bananaGroup.add(banana);

}  
  
  
}

function spawnobstacles() {
if (World.frameCount % 300 === 0) {
var obstacle = createSprite(600,305,40,10);
obstacle.setAnimation("Stone");
obstacle.scale = 0.2;
obstacle.velocityX = -4;
obstacle.lifetime = 150;

obstacleGroup.add(obstacle);
}  
  
  
}








  

// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
