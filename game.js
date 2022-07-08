kaboom({
  global: true,
  fullscreen: true,
  scale: 2,
  clearColor: [0, 0, 1, 0.7],
});

const MOVE_SPEED = 120;
const JUMP_FORCE = 400;
let isJumping = false;

loadRoot("./sprites/");
loadSprite("icey","ico.png");
loadSprite("ice","icey.png");
loadSprite("heart", "heart.png");
loadSprite("cage","cage.png");
loadSprite("double","double.png");
loadSprite("mario", "mario.png");
loadSprite("dino","dino.png");
loadSprite("coin", "coin.png");
loadSprite("block", "block.png");
loadSprite("pipe", "pipe_up.png");
loadSprite("surprise", "surprise.png");
loadSprite("unboxed", "unboxed.png");
loadSprite("mushroom", "mushroom.png");
loadSprite("bg", "bg.png")
loadSound("gameSound", "gameSound.mp3");
loadSound("jumpSound", "jumpSound.mp3");
 
let score =0 

scene("game", () => {
  play("gameSound");
  layers(["bg", "obj", "ui"], "obj");

  const map = [
    "                                                     ",
    "                                                     ",
    "                                                     ",
    "                                          =          ",
    "                                                      ",
    "     ?%   !==%=?                             ^       ",
    "     +                                        =         ",
    "     +    =                                =        $ $  ",
    "     +        $                 x      $     =  $   == $   =   = $$$$$   =  = = $$    =  =  == =  $$ = = = =  = =  == ===   = = =    $$$$           =   =    $     $ ",
    "==============================   ===================== == ================== ==== =========  ============================== ========= ======== = = = = ====== =",
  ];

  const mapSymbols = {
    width: 20,
    height: 20,
    "+": [sprite("cage"), solid()],
    "=": [sprite("block"), solid()],
    $: [sprite("coin"), "coin"],
    x: [sprite("pipe"), solid()],
    "?": [sprite("surprise"), solid(), "surprise-coin"],
    "!": [sprite("surprise"), solid(), "surprise-mushroom"],
    M: [sprite("mushroom"), solid(), body(), "mushroom"],
    u: [sprite("unboxed"), solid(), "unboxed"],
    "*": [sprite("bg"), solid(), "bg"],
  };

  
  const ScoreLabel = add([text("score:0")]);
  const gameLevel = addLevel(map, mapSymbols);
const heart = add ([
  sprite("heart"),
  text("    x3" , 12),
  origin("center"),
  layer('ui')
])
  const player = add([
    sprite("icey"),
    solid(),
    pos(30, 0), //30px far from left - 0px from top
    body(), // responds to physics and gravity
    origin("bot"), //the origin to draw the object
    big()
  ]);

  const background = add([sprite("bg"), pos(player.pos), origin('center'), scale(2.1), layer("bg")])

  const player2 = add([
    sprite("ice"),
    solid(),
    pos(30, 0), //30px far from left - 0px from top
    body(), // responds to physics and gravity
    origin("bot"), //the origin to draw the object
    big()
  ]);

  keyDown("d", () => {
    player.move(MOVE_SPEED, 0); //move right 120 , move down 0
  });



  keyDown("a", () => {
    player.move(-MOVE_SPEED, 0); //move right 120 , move down 0
  });

  keyDown("w", () => {
    if (player.grounded()) {
      isJumping = true;
      play("jumpSound");
      player.jump(CURRENT_JUMP_FORCE); //move rig  ht 120 , move down
    }
  });


  keyDown("right", () => {
    player2.move(MOVE_SPEED, 0); //move right 120 , move down 0
  });


  keyDown("left", () => {
    player2.move(-MOVE_SPEED, 0); //move right 120 , move down 0
  });



  keyDown("up", () => {
    if (player2.grounded()) {
      isJumping = true;
      play("jumpSound");
      player2.jump(CURRENT_JUMP_FORCE); //move rig  ht 120 , move down
    }
  });

  keyDown("2", () => {
    camPos(player2.pos);
  });

  player.action(()=>{
    keyDown("1", () => {
      camPos(player2``.pos);
    });
  })
  

  player.on("headbump", (obj) => {
    if (obj.is("surprise-coin")) {
      //need to give a nickName
      gameLevel.spawn("$", obj.gridPos.sub(0, 1));
      destroy(obj);
      gameLevel.spawn("u", obj.gridPos);
    }

    if (obj.is("surprise-mushroom")) {
      //need to give a nickName
      gameLevel.spawn("M", obj.gridPos.sub(0, 1));
      destroy(obj);
      gameLevel.spawn("u", obj.gridPos);
    }
  });


  player2.on("headbump", (obj) => {
    if (obj.is("surprise-coin")) {
      //need to give a nickName
      gameLevel.spawn("$", obj.gridPos.sub(0, 1));
      destroy(obj);
      gameLevel.spawn("u", obj.gridPos);
    }

    if (obj.is("surprise-mushroom")) {
      //need to give a nickName
      gameLevel.spawn("M", obj.gridPos.sub(0, 1));
      destroy(obj);
      gameLevel.spawn("u", obj.gridPos);
    }
  });


  action("mushroom", (obj) => {
    obj.move(20, 0);
  });
  player.collides("coin", (obj) => {
    destroy(obj)
    if(player.isBig()){
      score+=20;
    }else{
      score+=10; 
    }
  });
  player.collides("mushroom", (obj) => {
    destroy(obj)
    player.biggify()
  });
  player2.collides("coin", (obj) => {
    destroy(obj)
  });
  player2.collides("mushroom", (obj) => {
    destroy(obj)
    player2.biggify()
  });
  const double = add([sprite("double"), pos(9999,9999), scale(0.1)])
  player.action(() => {
    camPos(player.pos);
    ScoreLabel.pos = player.pos.sub(400,200);
    ScoreLabel.text = "score: " + score;
    heart.pos = player.pos.sub(400,180);
    background.pos = player.pos 
    if(player.isBig()){
      double.pos = player.pos.sub(400, 150)
    }
    else{
      double.pos = pos(9999,9999)
    }
    if (player.pos.y > 300)
      go("game")
    if (player2.pos.y > 300)
      go("game")

  });
 

  // scene end

});



start("game"); //start the scene called game
