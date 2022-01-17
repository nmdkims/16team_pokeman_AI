const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gradient = ctx.createRadialGradient(canvas.width/2, canvas.height/2,
    100, canvas.width/2 ,canvas.height/2, 400);
gradient.addColorStop(0.5, '#005192');
gradient.addColorStop(1, '#533fc2');


class Symbol {
    constructor(x, y, fontSize, canvasHeight) {
        this.characters = '김 훈 희 최 양 임 남 효 정 김 지 용 한 태 영';
        // this.characters = 'ア ァ カ サ タ ナ ハ マ ヤ ャ ラ ワ ガ ザ ダ バ パ イ ィ キ シ チ ニ ヒ ミ リ ヰ ギ ジ ヂ ビ ピ ウ ゥ ク ス ツ ヌ フ ム ユ ュ ル グ ズ ブ ヅ プ エ ェ ケ セ テ ネ ヘ メ レ ヱ ゲ ゼ デ ベ ペ オ ォ コ ソ ト ノ ホ モ ヨ ョ ロ ヲ ゴ ゾ ド ボ ポ ヴ ッ ン 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.text = '';
        this.canvasHeight = canvasHeight;
    }

    draw(context) {
        this.text = this.characters.charAt(Math.floor(Math.random()*this.characters.length));
        context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
        if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.98) {
            this.y = 0;
        } else {
            this.y += 1;
        }
    }
}

class Effect{
    constructor(canvasWidth, canvasHeight){
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight ;
        this.fontSize = 25;
        this.columns = this.canvasWidth / this.fontSize;
        this.symbols = [];
        this.#initialize();
        console.log(this.symbols)
    }
    #initialize(){
        for (let i = 0; i < this.columns; i++) {
            this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight)
        }
    }
}

const effect = new Effect(canvas.width, canvas.height);
let lastTime = 0;
const fps = 30;
const nextFrame = 1000/fps;
let timer = 0;

function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    if (timer > nextFrame) {
        ctx.fillStyle = 'rgba(0,0,0,0.09)';
        ctx.textAlign = 'center';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = gradient;
        ctx.font = effect.fontSize + 'px monospace';
        effect.symbols.forEach(symbol => symbol.draw(ctx));
        timer = 0;
    } else {
        timer += deltaTime;
    }
    requestAnimationFrame(animate);
}
animate(0);