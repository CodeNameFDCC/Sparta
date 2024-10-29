/** 캔버스 설정 */
const canvas = document.getElementById("canvas"); // 캔버스 요소 가져오기
canvas.width = 800; // 캔버스 너비 설정
canvas.height = 500; // 캔버스 높이 설정
const ctx = canvas.getContext("2d"); // 2D 렌더링

/** 게임 상태 변수 */
const BG_MOVING_SPEED = 10; // 배경 이동 속도
let bgX = 0; // 배경 X 좌표
let scoreText = document.getElementById("score"); // 점수 표시 요소
let score = 0; // 현재 점수

/** 게임 변수 */
let timer = 0; // 장애물 생성 시간



/** 오디오 객체 생성 및 설정 */
const jumpSound = new Audio(); // 점프 소리
jumpSound.src = "./sounds/jump.mp3";
const bgmSound = new Audio(); // 배경 음악
bgmSound.src = "./sounds/bgm.mp3";
const scoreSound = new Audio(); // 점수 획득 소리
scoreSound.src = "./sounds/score.mp3";

/** 이미지 객체 생성 및 설정 */
// (1) 배경
const bgImage = new Image();
bgImage.src = "./images/bg.jpg";
// (2) 게임 시작
const startImage = new Image();
startImage.src = "./images/gamestart.png";
// (3) 게임 오버
const gameoverImage = new Image();
gameoverImage.src = "./images/gameover.png";
// (4) 게임 재시작
const restartImage = new Image();
restartImage.src = "./images/restart.png";
// (5) 달리는 르탄이 A
const rtanAImage = new Image();
rtanAImage.src = "./images/rtan_running_a.png";
// (6) 달리는 르탄이 B
const rtanBImage = new Image();
rtanBImage.src = "./images/rtan_running_b.png";

/** 1-1 르탄이 그리기 */
const RTAN_WIDTH = 50; // 르탄이 가로 너비
const RTAN_HEIGHT = 50; // 르탄이 세로 높이
const RTAN_X = 10; // 르탄이의 초기 X 좌표
const RTAN_Y = 400; // 르탄이의 초기 Y 좌표

/** 르탄이 객체 정의 */
const rtan = {
    x: RTAN_X,
    y: RTAN_Y,
    width: RTAN_WIDTH,
    height: RTAN_HEIGHT,
    draw() {      // 달리는 애니메이션 구현

        // 달리는 애니메이션 구현
        if (timer % 60 > 30) {
            ctx.drawImage(rtanAImage, this.x + Math.sin(timer * 0.1) * 15, this.y, this.width, this.height);
        } else {
            ctx.drawImage(rtanBImage, this.x + Math.sin(timer * 0.1) * 15, this.y, this.width, this.height);
        }

    },
};
/** end of 1-1 르탄이 그리기 */

function backgroundImg(bgX) {
    ctx.drawImage(bgImage, bgX, 0, canvas.width, canvas.height);
}
// 시작 화면 그리기
function drawStartScreen() {
    // 배경 이미지 그리기
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    backgroundImg(0);
    animate();
}

let bgImageLoaded = new Promise((resolve) => {
    bgImage.onload = resolve;
});

Promise.all([bgImageLoaded]).then(drawStartScreen);
/** end of 3-1 게임 시작 화면을 그리는 함수 */

/** 게임 애니메이션 함수 */
function animate() {
    requestAnimationFrame(animate);
    if (currentPage != 1) {
        bgmSound.pause();
        return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    timer++;

    backgroundImg(bgX);
    backgroundImg(bgX + canvas.width);
    bgX -= BG_MOVING_SPEED;
    if (bgX < -canvas.width) bgX = 0;

    bgmSound.play();

    rtan.draw();
}