export class Rain {
    constructor(container) {
        this.container = container;
        this.raining = true;
        this.interval = null;
    }

    start() {

        this.raining = true;
        this.interval = setInterval(() => this.createDrop(), 100); // 드롭 생성 간격
    }

    stop() {
        this.raining = false;
        clearInterval(this.interval);
        this.container.innerHTML = ''; // 모든 드롭 제거
    }

    createDrop() {
        const drop = document.createElement('div');
        drop.className = 'drop';
        drop.style.left = Math.random() * 100 + 'vw'; // 랜덤한 위치
        drop.style.animationDuration = Math.random() * 1 + 0.5 + 's'; // 랜덤한 속도
        this.container.appendChild(drop);

        // 드롭이 떨어진 후 제거
        drop.addEventListener('animationend', () => {
            drop.remove();
        });
    }
}

const rainContainer = document.getElementById('overlay');
const rain = new Rain(rainContainer);
rain.start();

