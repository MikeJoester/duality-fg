//import platform from 'https://png.pngitem.com/pimgs/s/461-4610714_game-platform-png-transparent-background-platform-for-game.png';

const canvas = document.querySelector('canvas');

const context = canvas.getContext('2d');

canvas.width = 1600;
canvas.height = 900;

//context.fillRect(0, 0, canvas.width, canvas.height);

const gravity = .6;

class Sprite {
    constructor({position, velocity}) {
        this.position = position;
        this.velocity = velocity;
        this.width = 100;
        this.height = 300;
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

const player = new Sprite({
    position: { 
        x: 0, 
        y: 0
    },

    velocity: { 
        x: 0, 
        y: 1
    }
});

const enemy = new Sprite({
    position: { 
        x: 400, 
        y: 0
    },
    
    velocity: { 
        x: 0, 
        y: 1
    }
});

const keys = {
    right: {
        pressed: false
    },

    left: {
        pressed: false
    }
}

function animate() { //animate the sprites
    window.requestAnimationFrame(animate);    
    
    context.clearRect(0, 0, canvas.width, canvas.height); //clear the remaning clones

    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);

    player.update(); //update the player
    enemy.update(); //update the enemy

    if ((keys.right.pressed) && (player.position.x < 1590)) {
        player.velocity.x = 5;
    } 
    else if ((keys.left.pressed) && (player.position.x > 0)) {
        player.velocity.x = -5;
    }
    else {
        player.velocity.x = 0;
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