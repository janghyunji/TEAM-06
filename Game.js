class Game{
    constructor(app){
        this.app = app;
        this.mapAddress = [
            [0,0,1,1,1,1,0],
            [0,1,1,1,1,0,0],
            [0,1,1,1,1,1,0],
            [1,1,0,0,1,1,1],
            [1,0,1,0,1,0,1],
            [1,1,0,1,0,1,0],
            [1,0,1,1,1,1,1],
            [0,0,1,1,1,1,0],
            [1,1,0,1,1,0,0]
        ];
        this.map;
        this.timer;
        this.started = false;

        this.players = [];


        this.keySetting = [
            [
                {key : 83, func: "Bottom", type: "move"},
                {key : 87, func: "Top", type: "move"},
                {key : 68, func: "Right", type: "move"},
                {key : 65, func: "Left", type: "move"},
            ],
            [
                {key : 37, func: "Left", type: "move"},
                {key : 38, func: "Top", type: "move"},
                {key : 39, func: "Right", type: "move"},
                {key : 40, func: "Bottom", type: "move"}
            ]
        ];

        this.fieldItems = [];
    }

    keyEvent(keyCode, type){
        this.keySetting.forEach((events, playerIdx) => {
            
            events.forEach((event) => {
                if(event.type == "move" && keyCode == event.key){
                    this.players[playerIdx].direct[event.func] = type;
                }
            });
        });
    }

    start(){
        this.frame();
        this.map = this.mapAddress;
        this.players = [
            new Player(20, 20, this),
            new Player(430, 330, this)
        ];

        this.started = true;
        this.fieldItems = [];
    }

    frame(){
        this.timer = setInterval(() => {
            this.app.drawBoard();
            this.players.forEach((player) => {
                player.move({canvas : this.app.DOM.canvas, map : this.map, fieldItems : this.fieldItems});
            });
        }, 1000 / 60);
    }


}