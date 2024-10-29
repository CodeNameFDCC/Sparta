let currentPage = 1;
let isScrolling = false;
const totalPages = 8;

// 페이지 변경 함수
function changePage(newPage) {
    if (newPage < 1 || newPage > totalPages || isScrolling) return;

    isScrolling = true;

    // 현재 활성 페이지의 클래스 제거
    document.querySelector('.page.active').classList.remove('active');
    document.querySelector('.nav-dot.active').classList.remove('active');

    // 새 페이지 활성화
    document.querySelector(`#page${newPage}`).classList.add('active');
    document.querySelector(`[data-page="${newPage}"]`).classList.add('active');
    
    currentPage = newPage;

    // 스크롤 쿨다운
    setTimeout(() => {
        isScrolling = false;
    }, 200);
}

// 휠 이벤트 리스너
window.addEventListener('wheel', (e) => {
    if (isScrolling) return;

    if (e.deltaY > 0 && currentPage < totalPages) {
        // 아래로 스크롤
        changePage(currentPage + 1);
    } else if (e.deltaY < 0 && currentPage > 1) {
        // 위로 스크롤
        changePage(currentPage - 1);
    }
});

// 네비게이션 닷 클릭 이벤트
document.querySelectorAll('.nav-dot').forEach(dot => {
    dot.addEventListener('click', () => {
        const pageNumber = parseInt(dot.getAttribute('data-page'));
        changePage(pageNumber);
    });
});

// 터치 이벤트 지원 (모바일)
let touchStartY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchmove', (e) => {
    if (isScrolling) return;

    const touchEndY = e.touches[0].clientY;
    const diff = touchStartY - touchEndY;

    if (Math.abs(diff) > 50) { // 50px 이상 스와이프했을 때만 페이지 전환
        if (diff > 0 && currentPage < totalPages) {
            // 위로 스와이프
            changePage(currentPage + 1);
        } else if (diff < 0 && currentPage > 1) {
            // 아래로 스와이프
            changePage(currentPage - 1);
        }
    }
});