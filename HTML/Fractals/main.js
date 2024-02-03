const canvas = document.getElementById("Set");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "#000000";
ctx.fillRect(0, 0, 1000, 1000);

drawPixel = function(x, y, c){ctx.fillStyle = c; ctx.fillRect(x, y, 1, 1)}

let frame = 0;

let zoom = 1000;
let posX = 1;
let posY = 0;
let depth = 100

function renderPixel(a, b, dx, dy, x, y) {
    for(frame = 0; frame<depth; frame++){
        let d = (a * a) - (b * b) + dx;
        b = 2 * (a * b) + dy;
        a = d;

        let H = d > 200;

        //frame++

        if(H) {
            drawPixel(x, y, "rgb("+ frame * 3 +","+ frame +","+ frame * 0.5 +")"); 
            break;
        }
    }
}
function main() {
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, 1000, 1000);

    for(let y = 0; y<1000; y++){
        for(let x = 0; x<1000; x++){
            let dx = (x-500)/zoom - posX;
            let dy = (y-500)/zoom - posY;
        
            let a = dx;
            let b = dy;
            
            renderPixel(a, b, dx, dy, x, y)
        }
    }

    requestAnimationFrame(main);
}

main();