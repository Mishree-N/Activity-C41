class Player{

    constructor(){

        //properties
        this.index = null;
        this.distance=0;
        this.name=null;
        this.rank;

    }

    getPlayerCount(){

         //refer to gameState location in DB
         var playerCountRef = database.ref ('/playerCount');

         // listen to gameState changes in DB
         playerCountRef.on ("value", 
                         function(data){
                             playerCount = data.val ();
                             
                         }
         );        

    }

    updatePlayerCount(count){

        //refer to playercount in DB
        var playerCountRef=database.ref("/");
        //updte playercount in DB
        playerCountRef.update({"playerCount" : count});

    }

    update(){

        //create a new player for every name and add to playerCount. playerIndex gives each player a unique 
        //identity, like a roll number
        var playerIndex = "players/player"+this.index;
        console.log (playerIndex);
        //refer to DB to set the name & distance
        database.ref (playerIndex).set ({name : this.name, distance : this.distance});
        

    }

    //get all of player's info (name and distance, etc.)
    static getPlayerInfo () {
        var playerInfoRef= database.ref("players");
        playerInfoRef.on("value", (data)=>{
            allPlayers = data.val ();
        }  );
    }

    //get carsAtEnd info and add to this.rank
    getCarsAtEnd (){

        //refer to DB location
        var carsAtEnd=database.ref("/carsAtEnd");

        carsAtEnd.on("value",  (data)=>{
                                //add info to this.rank
                                this.rank=data.val();
                                });

    }

    static updateCarsAtEnd (rank){

        //update cars at end as rank
        var carsAtEnd=database.ref('/');
        carsAtEnd.update({"carsAtEnd" : rank});

    }

}