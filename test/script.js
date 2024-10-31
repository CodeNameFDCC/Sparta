const toggleButton = document.getElementById('toggle-button');
let toggleTemp = "btn btn-primary";
toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    const btnName =toggleButton.className;
    let nowTemp = toggleButton.className;
    toggleButton.className = toggleTemp;
    toggleTemp = nowTemp;
    const header = document.querySelector('header');
    const banner = document.querySelector('.banner');
    const gridItems = document.querySelectorAll('.grid-item');
    
    header.classList.toggle('dark-mode');
    banner.classList.toggle('dark-mode');
    gridItems.forEach(item => item.classList.toggle('dark-mode'));
});