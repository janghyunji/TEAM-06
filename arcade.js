const BLOCK_SIZE = 50;
const COLOR_DATA = {
    BOARD: "#EEEEEE",
    PLAYER: [
        "#FFE162",
        "#FF6464"
    ],
    BLOCK: [
        [
            "#91C483"
        ]
    ],
    LINE: [
        [
            "#000000"
        ]
    ]
}

class App{
    constructor(){
        this.DOM = {};
        this.DOM.canvas = document.getElementById('canvas');
        this.DOM.gameBtn = document.querySelector("#gameBtn");
        this.ctx = canvas.getContext('2d');

        this.game = new Game(this);
    }

    init(){
        this.DOM.gameBtn.addEventListener('click', () => {
            if(!this.game.started){
                this.game.start();
            }
        });

        window.addEventListener('keydown', (e) => {
            if(this.game.started){
                this.game.keyEvent(e.keyCode, true);
                this.drawBoard();
            }
        });
        window.addEventListener('keyup', (e) => {
            if(this.game.started){
                this.game.keyEvent(e.keyCode, false);
                this.drawBoard();
            }
        });
    }
    
    drawBoard(){
        if(!this.game.started){
            return;
        }
        this.ctx.fillStyle = COLOR_DATA["BOARD"];
        this.ctx.fillRect(0, 0, 450, 350);

        this.game.players.forEach((player, idx) => {
            if(player){
                this.ctx.fillStyle = COLOR_DATA["PLAYER"][idx];
                this.ctx.beginPath();
                this.ctx.arc(player.x, player.y, 20, 0, 2*Math.PI);
                this.ctx.stroke();
                this.ctx.fill();
            }
        });

        for(let i = 0; i < 9; i++)
            for(let j = 0; j < 7; j++)
                if(this.game.map[i][j] != 0){
                        this.drawBlock({x : i, y : j, blockCode : 0});
                    }

    }




    drawBlock({x, y, blockCode}){
        this.ctx.fillStyle = COLOR_DATA["BLOCK"][blockCode][0];
        this.ctx.strokeStyle = 'black';
        this.ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        this.ctx.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    }


}


window.onload = () => {
    let app = new App();
    app.init();
}
