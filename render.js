
const outline = new PIXI.filters.OutlineFilter(2, 0xFFFFFF);
const canvas = document.getElementById('mycanvas');

const app = new PIXI.Application({
    view: canvas,
    width: window.innerWidth,
    height: window.innerHeight
});

const tileTexture = PIXI.Texture.from('sprite2.png');
const unitTexture = PIXI.Texture.from('sprite.png');

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


let tileSprites = [];
let unitSprites = [];

//app.ticker.add(animate);

const ROW_LENGTH = gameboard.length
const TILE_SCALE = app.renderer.screen.height / ROW_LENGTH;

function renderBoard() {
    for (let y = 0; y < gameboard.length; y++){
        // console.log("curr y", gameboard[y]);
        //let rowSize = ROW_LENGTH;
        let offset = 0;
        for (let x = 0; x < gameboard[y].length; x++) {
            // console.log('curr x', gameboard[y][x])
            let tileSprite = new PIXI.Sprite(tileTexture);
            tileSprite.data = {coordinates: {x, y}}
            tileSprite.width= TILE_SCALE;
            tileSprite.height= TILE_SCALE;
            if((y % 2 ==  0)){
                offset = TILE_SCALE / 2
            }
            //coordinates where current tile will be inserted
            tileSprite.x = x * TILE_SCALE + offset;
            tileSprite.y = y * TILE_SCALE;
            if(gameboard[y][x] === 0) tileSprite.tint = 0x008000;
            else if (gameboard[y][x] === 1 ) tileSprite.tint = 0xA52A2A;

            // tileSprite.buttonMode = true;
            tileSprite.interactive = true;
            tileSprite.on('click', (e) => {
                if(selectedUnit.coordinates){
                    console.log('tile clicked, coordinates: ', tileSprite.data.coordinates)
                    selectedUnit.move(tileSprite.data.coordinates)
                    selectedUnit = {};
                }
            })

            tileSprite.filters = [outline];

            tileSprite.type = 'tile'

            container.addChild(tileSprite);
            tileSprites.push(tileSprite);
        }
    }

}

let selectedUnit = {}

const unit = new Unit({x: 1, y: 1})

function renderUnit(unit) {
    // console.log(unit)
    unitSprites.forEach(sprite => container.removeChild(sprite))
    
    let offset = 0
    
    if((unit.coordinates.y % 2 ==  0)){
        offset = TILE_SCALE / 2
    }
    
    let unitSprite = new PIXI.Sprite(unitTexture)

    unitSprite.data = unit;

    //setting events
    unitSprite.interactive = true;
    unitSprite.buttonMode = true;
    unitSprite.on('click', (e) => {
        console.log('Sprite: ', unitSprite)
        console.log('unit clicked!\n Event: ', e)
        selectedUnit = unitSprite.data
    })


    // setting position
    unitSprite.x = unit.coordinates.x * TILE_SCALE + offset
    unitSprite.y = unit.coordinates.y * TILE_SCALE

    unitSprite.height = TILE_SCALE
    unitSprite.width = TILE_SCALE / 2

    unitSprite.type = 'unit'

    container.addChild(unitSprite)
    unitSprites.push(unitSprite)

    // console.log(container)
}

renderBoard();
renderUnit(unit);
