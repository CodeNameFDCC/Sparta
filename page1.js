
const canvas1 = document.getElementById('canvas');
const ctx1 = canvas1.getContext('2d');
canvas1.width = 1920;
canvas1.height = 1080;

const titleText1 = "1석 2조";
const fontSize1 = 240;
let particles1 = [];
let time1 =0;

// 파티클 객체 생성자 함수
function Particle(x, y) {
    this.x = Math.random() * canvas1.width;
    this.y = Math.random() * canvas1.height;
    this.size = 1;
    this.baseX = x;
    this.baseY = y;
    this.density = Math.random() * 20 + 50;

    this.draw = function () {
        ctx1.fillStyle = 'rgba(150, 200, 250, 1)';
        ctx1.beginPath();
        ctx1.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx1.closePath();
        ctx1.fill();
    }

    this.update = function () {
        time1++;
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy); //현재 거리
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        //마우스로 밀어낼 거리
        let maxDistance = 200;
        let force = (maxDistance - distance) / maxDistance;
        // sin 과 cos 을 사용하면 흩날리는 효과가 적용된다.
        let sin = Math.sin(time1) * 5;
        let cos = Math.cos(time1 ) * 5;
        const power = 10; //이 값은 마치 소금과 같은것이다 과하면 골로 간다.
        const defaultPower = 0.1; //이 값은 평소의 소금 과하면 회전이 너무 심해진다.
        if (distance < maxDistance) {
            this.x -= forceDirectionX * force * this.density + sin * power;
            this.y -= forceDirectionY * force * this.density + cos * power;
        } 
        else {
            // 파티클이 원래 위치로 돌아감
            if (this.x !== this.baseX) {
                let dx = this.x - this.baseX + sin * defaultPower;
                this.x -= dx / 10;
            }
            if (this.y !== this.baseY) {
                let dy = this.y - this.baseY + cos * defaultPower;
                this.y -= dy / 10;
            }
        }
    }

    this.reset = function()
    {
        this.x = Math.random() * canvas1.width;
        this.y = Math.random() * canvas1.height;
    }
}

// 마우스 객체 생성
const mouse = {
    x: null,
    y: null,
    radius: 100
};

window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

// 텍스트를 파티클로 변환
function init2() {
    ctx1.font = `${fontSize1}px Arial`;
    ctx1.font = "350px verdana";
    ctx1.fillText(titleText1, canvas1.width / 2 - ctx1.measureText(titleText1).width / 2, canvas1.height / 2);
    ctx1.font = "100px verdana";
    ctx1.fillText("하나의 돌과 두마리의 새",canvas1.width/ 2 - ctx1.measureText("하나의 돌과 두마리의 새").width /2,canvas1.height/2 +200);
    
    const textCoordinates = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);

    for (let y = 0; y < textCoordinates.height; y += 5) {
        for (let x = 0; x < textCoordinates.width; x += 5) {
            const index = (y * textCoordinates.width + x) * 4;
            if (textCoordinates.data[index + 3] > 128) {
                const positionX = x;
                const positionY = y;
                particles1.push(new Particle(positionX, positionY));
            }
        }
    }
    
}

let isReset = false;

// 애니메이션 루프
function animate1() {
    if(currentPage!=1) {requestAnimationFrame(animate1); isReset = true;return;} 
    if(isReset)
    {
        particles1.forEach(element => {
            element.reset();
            isReset=false;
        });
    }
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
    for (let i = 0; i < particles1.length; i++) {
        particles1[i].draw();
        particles1[i].update();
    }
    requestAnimationFrame(animate1);
}

init2();
animate1();

// 창 크기 변경 시 리사이즈
window.addEventListener('resize', () => {
    canvas1.width = window.innerWidth;
    canvas1.height = window.innerHeight;
    particles1 = [];
    init2();
});

// 마우스가 캔버스를 떠나면 좌표 초기화
window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
});