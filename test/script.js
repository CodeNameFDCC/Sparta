import { Rain } from './rain.js';
const rainContainer = document.getElementById('overlay');
const rain = new Rain(rainContainer);

const toggleButton = document.getElementById('toggle-button');
const imageButton1 = document.getElementById('imageButton1');
const imageButton2 = document.getElementById('imageButton2');

let istoggle = false;
toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    const header = document.querySelector('header');
    const banner = document.querySelector('.banner');
    const gridItems = document.querySelectorAll('.grid-item');
    istoggle =!istoggle;
    if(istoggle) rain.start();
    else rain.stop();

    imageButton1.style.display= istoggle? 'none':'block';
    imageButton2.style.display = !istoggle? 'none':'block';
    
    header.classList.toggle('dark-mode');
    banner.classList.toggle('dark-mode');
    gridItems.forEach(item => item.classList.toggle('dark-mode'));
});

const blogbtn = document.getElementById('blogbtn');
blogbtn.addEventListener('click',gotoblogpath);
function gotoblogpath()
{
    window.location.href = "https://explosion149.tistory.com/#"; // 내 블로그 주소
}

