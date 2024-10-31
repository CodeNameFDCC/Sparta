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
    imageButton1.style.display= istoggle? 'none':'block';
    imageButton2.style.display = !istoggle? 'none':'block';
    
    header.classList.toggle('dark-mode');
    banner.classList.toggle('dark-mode');
    gridItems.forEach(item => item.classList.toggle('dark-mode'));
});

