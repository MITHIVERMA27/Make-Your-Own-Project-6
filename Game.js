class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    fish1 = createSprite(200,100);
    fish1.scale=0.5;
    fish1.addImage("blue",fish1_img);
    fish2 = createSprite(200,300);
    fish2.scale=0.5;
    fish2.addImage("red",fish2_img);
    fish3 = createSprite(200,500);
    fish3.scale=0.5;
    fish3.addImage("yellow",fish3_img);
    fish4 = createSprite(200,700);
    fish4.scale=0.5;
    fish4.addImage("green",fish4_img);
    fishes = [fish1, fish2, fish3, fish4];
  }

  play(){
    form.hide();
  
    Player.getPlayerInfo();
    player.getCarsAtEnd();
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(aquarium,0,0,displayWidth*5,displayHeight);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var y = 0 ;
      var x = 0;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        y = y + 150;
        //use data form the database to display the cars in y direction
        x = allPlayers[plr].distance;
        console.log(x)
        fishes[index-1].y = y;
        fishes[index-1].x = x;
        console.log(allPlayers[plr].name)
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          fishes[index - 1].shapeColor = "red";
          camera.position.y = displayHeight/2;
          camera.position.x = fishes[index-1].x;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(player.distance > displayWidth*5){
      gameState = 2;
      player.rank+=1
      Player.updateCarsAtEnd(player.rank);
    }
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
    console.log(player.rank);
  }
}
