const canvas = document.getElementById("title");
const ctx = canvas.getContext("2d");

const bgImage = new Image();
bgImage.src = "./images/bg.jpg";

const bgmSound = new Audio(); // 배경 음악
bgmSound.src = "./sounds/bgm.mp3";

let bgImageLoaded = new Promise((resolve) => {
    bgImage.onload = resolve;
});

Promise.all([bgImageLoaded]).then(drawStartScreen);

function backgroundImg(bgX) {
    ctx.drawImage(bgImage, canvas.width/4, canvas.height/4, canvas.width/2, canvas.height/2);
}

function drawStartScreen() {
    // 배경 이미지 그리기
    ctx.clearRect(0, 0, 800, 800);
    backgroundImg(0);
    animate();
}

const BG_MOVING_SPEED = 5;
let bgX = 0;
function animate()
{
    let scrollContainer = document.querySelector(".title");
    scrollContainer.scrollLeft = bgX;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bgmSound.play();
    backgroundImg(bgX);
    backgroundImg(bgX + canvas.width/4);
    console.log(bgX+ canvas.width/4);
    bgX -= BG_MOVING_SPEED;
    if (bgX < -canvas.width) bgX = 0;
    requestAnimationFrame(animate);
}