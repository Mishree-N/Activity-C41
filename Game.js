class Game {

    constructor (){


    }

    getState(){

        var gameStateRef;

        //refer to gameState in DB
        gameStateRef = database.ref("/gameState");
        
        // listen to gameState changes in DB
        gameStateRef.on ("value", 
            function(data){
            gameState = data.val ();
            console.log ("GAME STATE : "+ gameState);
        }
        );

    }

    update(state){

        //update the gameState
        var gameStateRef=database.ref("/").update ({"gameState":state});
        

    }

    start(){

        if (gameState==0){

            //create player
            player=new Player();
            //get the player count
            var playerCount = player.getPlayerCount();
            //create form and display it
            form=new Form();
            form.display();
        }

        //create 4 sprites for cars
        car1=createSprite(100,200);
        car1.addImage(car1Img);
        car2=createSprite(300,200);
        car2.addImage(car2Img);
        car3=createSprite(500,200);
        car3.addImage(car3Img);
        car4=createSprite(700,200);
        car4.addImage(car4Img);

        //create an array and add car sprites to it
        cars=[car1,car2,car3,car4];
        
    }

    play(){

        //hide the form
        form.hide();
        //display game start message
        textSize(30);
        text("Game Start", displayWidth/2-50, 70);

        //get player information
        Player.getPlayerInfo();
        //read rank
        player.getCarsAtEnd();

        //if all the players is not equal to undefined,
        if (allPlayers != undefined) {

            //add ground image to background
            background(groundImg);
            //add track image
            image(trackImg, 0, -displayHeight*4, displayWidth, displayHeight*5);

            //variables
            var x=150, y;
            var index=0;

            //loop through all the players to display them
            for (var plr in allPlayers){

                //increment index 
                index++;
                
                //space out between sprites
                x=x+200;
                //take total height minus distance travelled to get current y position
                y=displayHeight-allPlayers[plr].distance;

                //to set every car sprite's x value as the x variable
                cars[index-1].x=x;
                //to set every car sprite's y value as the y variable
                cars[index-1].y=y;

                //if playerIndex and index match (if it's current player,)
                if (index == player.index){

                    //make his car's color red
                    cars[index-1].shapeColor="red";

                    //make ellipse to circle current player's car
                    stroke(4);
                    fill("red");
                    ellipse(x,y,90,120);

                    //focus on middle of screen for x position
                    camera.position.x = displayWidth/2;
                    //focus on wherever current player goes for the y position (if player goes up, focus goes up)
                    camera.position.y = cars[index-1].y;
                }

                
            }

        
            
        }

        //if up arrow key is pressed and player index is NOT(!) equal to null
        if (keyIsDown(UP_ARROW) && player.index!=null){

            //increment by 20
            player.distance=player.distance+20;
            //update the name & distance
            player.update();

        }

        //if player reaches end of track
        if (player.distance>3860){

            //increment rank to assign it
            player.rank=player.rank+1;
            //update the rank in DB so all players will have correct info
            Player.updateCarsAtEnd(player.rank);

            //change gameState to END
            gameState=2;

        }

    }

    end(){

        console.log("game end");
        
        console.log("Rank : " + player.rank);

        text("Rank : " + player.rank, displayWidth/2, camera.position.y+20);


    }

}

