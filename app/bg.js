const body = document.querySelector("body");

// function handleImg() {
//     console.log("loaded img");
// }

function printImage(imgNumber) {
    const image = new Image();
    image.src = `images/${imgNumber + 1}.jpg`;
    image.classList.add("bgImage");
    body.prepend(image);
    //body.addEventListener("loadend", handleImg);
}

function getRandom() {
    const number = Math.floor(Math.random() * 5);
    return number;
}

function init() {
    const randomNumber = getRandom();
    printImage(randomNumber);
}

init();