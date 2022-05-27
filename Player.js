class Player{
    constructor(x, y, game){
        this.x = x;
        this.y = y;
        this.width = 0;
        this.height = 0;
        this.position = this.getBlockPosition();
        this.direct ={ 
            Left: false,
            Right: false,
            Top: false,
            Bottom: false
        };
        this.live = true;

        this.speed = 2;

        this.game = game;
    }

    move({canvas, map}){
        for (const [key, value] of Object.entries(this.direct)) {
            let temp = {...this};
            if(value){
                this["move"+key](canvas);
            }
            let movedBlock = this.getBlockPosition();
            if(map[movedBlock.x][movedBlock.y] != 0 && map[movedBlock.x][movedBlock.y] != 3){
                this.x = temp.x;
                this.y = temp.y;
            }else{

            }

            this.game.fieldItems.forEach(item => {
                if(item.x == movedBlock.x && item.y == movedBlock.y){
                    this.getItem(item);
                } 
            });
        }
        
        this.position = this.getBlockPosition();
    }

    moveLeft({width, height}){
        this.x -= this.speed;
        if(this.x < 0)this.x = 0;
    }

    moveTop({width, height}){
        this.y -= this.speed;
        if(this.y < 0)this.y = 0;
    }

    moveRight({width, height}){
        this.x += this.speed;
        if(this.x + this.width > width)this.x = width - this.width;
    }

    moveBottom({width, height}){
        this.y += this.speed;
        if(this.y + this.height > height)this.y = height - this.height;
    }

    getBlockPosition(){
        let x = Math.floor((this.x + 9) / 50);
        let y = Math.floor((this.y + 7) / 50);

        return {x, y};
    }

}