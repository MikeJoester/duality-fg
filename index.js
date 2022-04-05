//import platform from 'https://png.pngitem.com/pimgs/s/461-4610714_game-platform-png-transparent-background-platform-for-game.png';

const canvas = document.querySelector('canvas');

const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gravity = .6;

class Player {
    constructor() {
        this.position = {
            x: 300,
            y: 300
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 100
        this.height = 300
    }

    draw() {
        context.fillStyle = 'blue';
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
        this.draw();

        if (this.position.y + this.height + this.velocity.y <= canvas.height)
            this.velocity.y += gravity;
        else this.velocity.y = 0;
    }
}

class Enemy {
    constructor() {
        this.position = {
            x: 700,
            y: 300
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 100
        this.height = 300
    }

    draw() {
        context.fillStyle = 'red';
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
        this.draw();

        if (this.position.y + this.height + this.velocity.y <= canvas.height)
            this.velocity.y += gravity;
        else this.velocity.y = 0;
    }
}

class Platform {
    constructor({x, y}) {
        this.position = {
            x,
            y
        }
        this.width = 200;
        this.height = 20;
    }

    draw() {
        context.fillStyle = 'black';
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

const player = new Player();
const enemy = new Enemy();

const platforms = [new Platform({x: 200, y: 100}), new Platform({x: 300, y: 400})];

const keys = {
    right: {
        pressed: false
    },

    left: {
        pressed: false
    }
}

let scrollOffset = 0;

function animate() { //animate the player
    requestAnimationFrame(animate);
    
    context.clearRect(0, 0, canvas.width, canvas.height); //clear the remaning clones
    
    player.update(); //update the player
    enemy.update();

    platforms.forEach(platform => { //draw platforms
        platform.draw();
    });

    if ((keys.right.pressed) && (player.position.x < 700)) {
        player.velocity.x = 5;
    } 
    else if ((keys.left.pressed) && (player.position.x > 50)) {
        player.velocity.x = -5;
    }
    else {
        player.velocity.x = 0;

        if (keys.right.pressed) {
            scrollOffset += 5;
            platforms.forEach(platform => {
                platform.position.x -= 5;
            });
        } 
        else if (keys.left.pressed) {
            scrollOffset -= 5;
            platforms.forEach(platform => {
                platform.position.x += 5;
            });
        }
    }


    //platform collision detection
    platforms.forEach(platform => {
        if ((player.position.y + player.height <= platform.position.y) 
        && (player.position.y + player.height + player.velocity.y >= platform.position.y)
        && (player.position.x + player.width >= platform.position.x)
        && (player.position.x <= platform.position.x + platform.width)) {
            player.velocity.y = 0;
        }
    });

    if (scrollOffset > 1000) {
        console.log('Stop');
    }
}

animate();

window.addEventListener('keydown', ({keyCode}) => {
    switch(keyCode) {
        case 65:
        case 37:
            console.log('Left');
            keys.left.pressed = true;
            break;

        case 68:
        case 39:
            console.log('Right');
            keys.right.pressed = true; 
            break;

        case 87:
        case 38:
            console.log('Jump');
            player.velocity.y -= 10;
            break;
    }
});

window.addEventListener('keyup', ({keyCode}) => {
    switch(keyCode) {
        case 65:
        case 37:
            console.log('Left');
            keys.left.pressed = false; 
            break;

        case 68:
        case 39:
            console.log('Right');
            keys.right.pressed = false; 
            break;

        case 87:
        case 38:
            console.log('Jump');
            break;
    }
});