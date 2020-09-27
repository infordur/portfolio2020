let buttonSound = new Audio("./js/sound/button.mp3");
let clickSound = new Audio("./js/sound/click.mp3");

let keys = [
    new Audio("./js/sound/key1.mp3"),
    new Audio("./js/sound/key2.mp3"),
    new Audio("./js/sound/key3.mp3"),
    new Audio("./js/sound/key4.mp3"),
];

function button() {
    buttonSound.play();
}
function click() {
    clickSound.play();
}

function typeSound() {
    let i = Math.floor(Math.random() * keys.length);
    keys[i].currentTime = 0;
    keys[i].play();
}

export { button, click, typeSound };
