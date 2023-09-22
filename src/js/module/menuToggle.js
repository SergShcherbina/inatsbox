export const menuToggle = () => {
    const menu = document.querySelector('.menu');
    const burger = document.querySelector('.burger');

    function toggleMenu(e) {
        if (burger.contains(e.target) && !menu.classList.contains('menu_active')) {
            burger.classList.add('burger_active');
            menu.classList.add('menu_active');
            return
        }
        if (e.target !== menu && menu.classList.contains('menu_active')) {
            burger.classList.remove('burger_active');
            menu.classList.remove('menu_active');
        }
    }

    document.addEventListener('click', (e) => toggleMenu(e))
    document.removeEventListener('click', toggleMenu)
}