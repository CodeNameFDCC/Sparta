const canvas6 = document.getElementById("canvas3");
const ctx6 = canvas6.getContext("2d");

// 랜덤 색상 생성 함수
function getRandomColor6() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// 랜덤 도형 그리기 함수
function drawRandomShape6() {
    const x = Math.random() * canvas6.width;
    const y = Math.random() * canvas6.height;
    const size = Math.random() * 100 + 20; // 20~120 크기 랜덤

    ctx6.fillStyle = getRandomColor6();

    if (Math.random() > 0.5) {
        // 랜덤하게 원 또는 사각형 그리기
        ctx6.beginPath();
        ctx6.arc(x, y, size / 2, 0, Math.PI * 2); // 원 그리기
        ctx6.fill();
    } else {
        ctx6.fillRect(x, y, size, size); // 사각형 그리기
    }
}

// 계속해서 도형을 랜덤하게 그리는 애니메이션 함수
function animateShapes6() {
    if (currentPage != 3) {
        ctx6.clearRect(0, 0, canvas6.width, canvas6.height); // 캔버스 지우기
        requestAnimationFrame(animateShapes6); // 반복 호출하여 애니메이션 유지
        return;
    }
    drawRandomShape6();
    requestAnimationFrame(animateShapes6); // 반복 호출하여 애니메이션 유지
}

// 애니메이션 시작
animateShapes6();

