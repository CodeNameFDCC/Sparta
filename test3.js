const canvas2 = document.getElementById('canvas2');
const ctx2 = canvas2.getContext('2d');

canvas2.width = 1920;
canvas2.height = 1080;

// 캔버스 중앙에 위치하도록 playSize3의 위치를 설정
const playSize3 = { x: 640, y: 480 };
const playAreaX = (canvas2.width - playSize3.x) / 2;
const playAreaY = (canvas2.height - playSize3.y) / 2;

const imagesSrc = [
    { flag: false, src: "images/kjt.png", name: "[팀장] 김정태", dsc: "탈주는 이제 그만! 도망 못가!!" },
    { flag: false, src: "images/cjh.png", name: "[팀원] 최진형", dsc: "머리가 못 따라 가지만 파이팅해보자!" },
    { flag: false, src: "images/cdh.png", name: "[팀원] 최동현", dsc: "극단 전자공주 화이팅" },
    { flag: false, src: "images/hys.png", name: "[팀원] 황윤석", dsc: "안녕하세요! 다들 파이팅입니다!!!" },
];

const images2 = [];
let loadedImages2 = 0;

function ImageObject2(src, name, description) {
    this.img = new Image();
    this.img.src = src;
    this.name = name;
    this.description = description;
    
    this.x = playAreaX + Math.random() * (playSize3.x - 50);
    this.y = playAreaY + Math.random() * (playSize3.y - 50);
    this.vx = Math.random() * 2 + 2;
    this.vy = Math.random() * 2 + 2;
    this.isHovered = false;
    this.showDescription = false; // 랜덤으로 텍스트를 표시하기 위한 플래그

    this.img.onload = () => {
        loadedImages2++;
    };

    this.draw = function () {
        if (!this.isHovered) {
            this.x += this.vx;
            this.y += this.vy;

            // 경계 체크
            if (this.x < playAreaX || this.x + this.img.width > playAreaX + playSize3.x) this.vx *= -1;
            if (this.y < playAreaY || this.y + this.img.height > playAreaY + playSize3.y) this.vy *= -1;
        }

        ctx2.font = "20px Arial";
        ctx2.drawImage(this.img, this.x, this.y);

        // hover 또는 랜덤 선택된 경우 dsc 표시
        if (this.isHovered || this.showDescription) {
            ctx2.fillStyle = "red";
            ctx2.fillText(this.description, (this.x - ctx2.measureText(this.description).width / 2) + 30, this.y - 30);
        }

        ctx2.fillStyle = "blue";
        ctx2.fillText(this.name, this.x + 60, this.y + 30);
    };

    this.checkHover = function (mouseX, mouseY) {
        this.isHovered = mouseX >= this.x && mouseX <= this.x + this.img.width &&
            mouseY >= this.y && mouseY <= this.y + this.img.height;
        return this.isHovered;
    };
}

let isInit2 = false;
function init2() {
    if (isInit2) return;
    isInit2 = true;
    for (let i = 0; i < imagesSrc.length; i++) {
        images2.push(new ImageObject2(imagesSrc[i].src, imagesSrc[i].name, imagesSrc[i].dsc));
    }
    animate2();
}

function getRandomInt2(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function animate2() {
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    images2.forEach(image => {
        image.draw();
    });

    requestAnimationFrame(animate2);
}

function randCloud2() {
    const select = getRandomInt2(0, images2.length - 1);

    images2.forEach((image, index) => {
        image.showDescription = (index === select);
    });
}

canvas2.addEventListener('mousemove', (e) => {
    images2.forEach(image => {
        if (image.checkHover(e.clientX, e.clientY + 90)) {
            image.showDescription = false; // hover 시에만 showDescription이 무효화됨
        } else {
            image.isHovered = false;
        }
    });
});

init2();
