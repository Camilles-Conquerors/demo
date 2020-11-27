
const outline = new PIXI.filters.OutlineFilter(2, 0xFFFFFF);
const canvas = document.getElementById('mycanvas');

const app = new PIXI.Application({
    view: canvas,
    width: window.innerWidth,
    height: window.innerHeight
});

const texture = PIXI.Texture.from('sprite2.png');
const texture2 = PIXI.Texture.from('sprite.png');

let sprite1,
    sprite2,
    sprite3;

// img = new PIXI.Sprite(texture);
// img.x = app.renderer.width / 2;
// img.y = app.renderer.height / 2;
// img.anchor.x = 0.5;
// img.anchor.y = 0.5;
//app.stage.addChild(img);

let container = new PIXI.Container();
app.stage.addChild(container);


let sprites = [];

renderBoard();

//app.ticker.add(animate);


function renderBoard() {
    gameboard

    const ROW_LENGTH = gameboard.length
    const TILE_SCALE = app.renderer.screen.height / ROW_LENGTH;
    for (let y = 0; y < gameboard.length; y++){
        console.log("curr y", gameboard[y]);
        //let rowSize = ROW_LENGTH;
        let offset = 0;
        for (let x = 0; x < gameboard[y].length; x++) {
            console.log('curr x', gameboard[y][x])
            let sprite = new PIXI.Sprite(texture);
            sprite.width= TILE_SCALE;
            sprite.height= TILE_SCALE;
            if((y % 2 ==  0)){
                offset = TILE_SCALE / 2
            }
            //coordinates where current tile will be inserted
            sprite.x = x * TILE_SCALE + offset;
            sprite.y = y * TILE_SCALE;
            if(gameboard[y][x] === 0) sprite.tint = 0x008000;
            else if (gameboard[y][x] === 1 ) sprite.tint = 0xA52A2A;

            sprite.interactive = true;
            sprite.buttonMode = true;
            sprite.filters = [outline];

            container.addChild(sprite);
            sprites.push(sprite);
        }
    }

}


let delta = 0;

function animate() {
    delta += 0.1;

    container.y = Math.sin(delta) * 100;

    for (let i = 0; i < sprites.length; i++) {
        sprites[i].rotation += 0.1;
    }
}
