// 해커느낌글씨.
let timer; // 타이머 변수 선언

function paragraph(element) {
    // 기존 타이머가 있다면 종료 =============================================
    if (timer) clearInterval(timer);

    const array = element.innerText.split('')
    const special = ['~', '@', '!', '#', '$', '%', '^', '&', '*']
    const exception = [' ', '\n', '.', ',']
    const random = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    const numArray = []
    array.forEach(char => {
        const num = random(5, 40)
        numArray.push(num)
    })

    let completeCount
    let newText
    timer = setInterval(() => {
        completeCount = 0
        newText = ''
        numArray.forEach((num, i) => {
            if (exception.includes(array[i]) || numArray[i] === 0) {
                newText += array[i]
                completeCount += 1
            } else {
                newText += special[numArray[i] % special.length]
                numArray[i] = --num
            }
        })
        element.innerText = newText

        if (completeCount === numArray.length) {
            clearInterval(timer); // 타이머 종료
            timer = null; // 타이머 변수 초기화      
        }

        if (completeCount === numArray.length) clearInterval(timer)
    }, 100)

}

function paragraph_Tool(element) {
    const p = document.querySelector(element)
    paragraph(p)
}

// 카드효과 =================================================================
function movingCard(element01, element02, element03) {
    const frame = document.getElementById('frame')
    const card = document.getElementById('card')
    const light = document.getElementById('light')

    let { x, y, width, height } = frame.getBoundingClientRect()

    function mouseMove(e) {
        const left = e.clientX - x
        const top = e.clientY - y
        const centerX = left - width / 2
        const centerY = top - height / 2
        const d = Math.sqrt(centerX ** 2 + centerY ** 2)

        card.style.boxShadow = `${-centerX / 5}px ${-centerY / 10}px 10px rgba(0, 0, 0, 0.2)`

        card.style.transform = `rotate3d(${-centerY / 100}, ${centerX / 100}, 0, ${d / 8}deg)`

        light.style.backgroundImage = `radial-gradient(circle at ${left}px ${top}px, #00000040, #ffffff00, #ffffff99)`
    }

    frame.addEventListener('mouseenter', () => {
        frame.addEventListener('mousemove', mouseMove)
    })

    frame.addEventListener('mouseleave', () => {
        frame.removeEventListener('mousemove', mouseMove)
        card.style.boxShadow = ''
        card.style.transform = ''
        light.style.backgroundImage = ''
    })

    window.addEventListener('resize', () => {
        rect = frame.getBoundingClientRect()
        x = rect.x
        y = rect.y
        width = rect.width
        height = rect.height
    })
}


// 글리치효과 =============================================================
function glitch(element) {
    let count = 0
    setInterval(() => {
        // element
        const skew = Math.random() * 20 - 10

        // element::before
        const top1 = Math.random() * 100
        const btm1 = Math.random() * 100

        // element::after
        const top2 = Math.random() * 100
        const btm2 = Math.random() * 100

        element.style.setProperty('--skew', `${skew}deg`)
        element.style.setProperty('--t1', `${top1}%`)
        element.style.setProperty('--b1', `${btm1}%`)
        element.style.setProperty('--t2', `${top2}%`)
        element.style.setProperty('--b2', `${btm2}%`)

        // 찰나의 순간.
        element.style.setProperty('--scale', `1`)

        count++
        if (count % 15 === 0) {
            const bigSkew = Math.random() * 180 - 90
            element.style.setProperty('--skew', `${bigSkew}deg`)
        }
        if (count % 30 === 0) {
            const bigScale = 1 + Math.random() / 2
            element.style.setProperty('--scale', `${bigScale}deg`)
        }

    }, 100)
}

function glitch_Tool(element) {
    const h1 = document.querySelector(element)
    glitch(h1)

}

// 버튼 물결 효과 ======================================================
function hover_effect_Tool(element) {
    document.addEventListener("DOMContentLoaded", () => {
        const buttons = document.querySelectorAll(element) // 클래스 이름이 'sub_menu'인 요소들을 선택

        const onClick = e => {
            const btn = e.currentTarget
            const { x, y, width, height } = btn.getBoundingClientRect()
            const radius = Math.sqrt(width * width + height * height)
            btn.style.setProperty('--diameter', radius * 2 + 'px')
            const { clientX, clientY } = e
            const left = ((clientX - x - radius) / width) * 100 + '%'
            const top = ((clientY - y - radius) / height) * 100 + '%'

            btn.style.setProperty('--left', left)
            btn.style.setProperty('--top', top)
            btn.style.setProperty('--a', '')
            setTimeout(() => {
                btn.style.setProperty('--a', 'ripple-effect 500ms linear')
            }, 5)
        }

        buttons.forEach(btn => btn.addEventListener('click', onClick)) // 모든 버튼에 클릭 이벤트 추가
    })
}



// DOMContentLoaded 이벤트 리스너에서 호출
document.addEventListener("DOMContentLoaded", () => {
    hover_effect_Tool('.sub_menu'); // 이 클래스를 가진 버튼에 대해 hover 효과 적용
});


//이미지변경 ==============================================
function changeCardImage(element, index) {
    const idCard = document.getElementById(element);
    idCard.style.backgroundImage = `url(./images/card_0${index}.png)`;
}


//버튼 이벤트 ===========================================
let messages = [
    '안녕하세요! 저는 Node.js 7기 황윤석입니다.',
    '요즘 즐겨 하는 게임은 메이플랜드입니다.',
    'mbti는 INTJ 입니다.',
    '좋아하는 음식은 곱창입니다.',
    '저는 등산을 좋아합니다.',
    '잘 부탁드립니다. 다들 파이팅입니다.'
];

document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll('.sub_menu'); // 클래스 이름이 'sub_menu'인 요소들 선택
    const paragraph = document.getElementById('text02');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {

            const idValue = btn.id; // id 이름 가져옴
            const lastChar = idValue.slice(-1); // 마지막 문자 가져오기 (문자열)
            const messageIndex = Number(lastChar) - 1; // 숫자로 변환하고 1을 빼기
            paragraph.textContent = messages[messageIndex]; // 새 텍스트로 변경
            paragraph_Tool('p');

            changeCardImage('card', lastChar);
        });
    });
});


// 사운드 생성 ====================================================
function soundVolume(element, volume) {
    // 오디오 요소 선택
    const audioElement = document.querySelector(element);

    // 자동재생 시 음량 설정
    audioElement.volume = volume;
}

// 오디오 화면 나가면 꺼짐.=========================================
document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("myAudio");
    let isAudioPlaying = false; // 오디오 상태 추적

    // 스크롤 이벤트 감지
    window.addEventListener("scroll", () => {
        const playerRect = audio.getBoundingClientRect();

        // 플레이어가 화면 밖으로 넘어가면 오디오 정지
        if (playerRect.bottom < 0 || playerRect.top > window.innerHeight) {
            if (isAudioPlaying) {
                audio.pause();
                isAudioPlaying = false; // 오디오 상태 업데이트
            }
        } else {
            if (!isAudioPlaying) {
                audio.play();
                isAudioPlaying = true; // 오디오 상태 업데이트
            }
        }
    });
});