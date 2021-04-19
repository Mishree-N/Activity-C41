class Form{

    constructor(){

        //properties
        this.input=createInput("Name");
        this.button=createButton("Play");
        this.greeting = createElement ("h3");
        this.title = createElement ("h2");
        this.reset=createButton("Reset");

    }

    display(){


        //make title say Car Racing Game
        this.title.html ("Car Racing Game");
        //position the title
        this.title.position (displayWidth/2-50,0);

        //position the input
        this.input.position (displayWidth/2-40,displayHeight/2-80);

        //position the button
        this.button.position (displayWidth/2+30,displayHeight/2);

        //position reset button
        this.reset.position(displayWidth/2+30, displayHeight-200);
        console.log(this.reset.x);
        console.log(this.reset.y);

        //when Play button is pressed,
        this.button.mousePressed ( ()=> {

            //stop displaying the Name input
            this.input.hide ();
            //stop displaying the Play button
            this.button.hide ();

            //make the Name from input equal to the player.name
            player.name=this.input.value();
            //increment playerCount because new player has just logged on and pressed "Play"
            playerCount=playerCount+1;
            //make player index equal to playerCount
            player.index=playerCount;
            //update player's name & distance using input value
            player.update();
            //update # of players 
            player.updatePlayerCount(playerCount);

            //make greeting variable say "Welcome name of player (using input value)"
            this.greeting.html("Welcome " + player.name);
            //position the greeting
            this.greeting.position(displayWidth/2-20,displayHeight/4);
        });

        //when reset button is pressed,
        this.reset.mousePressed (()=>{

            //change player count to 0
            player.updatePlayerCount(0);
            //change gameState to 1 to reset whole game
            game.update(0);

        });


        
    }

    hide(){

        //hide everything
        this.input.hide();
        this.button.hide();
        this.greeting.hide();

    }


}