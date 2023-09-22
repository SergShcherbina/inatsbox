//hide menu when scrolling
export const hideHeader = () => {
    let lastScroll = 0;
    const defaultOffset = 100;
    const header = document.querySelector('.header')

    const scrollPosition = () => window.scrollY || document.documentElement
    const containHide = () => header.classList.contains('hide')

    window.addEventListener('scroll', () => {
        if (scrollPosition() > lastScroll && !containHide() && scrollPosition() > defaultOffset) {
            header.classList.add('hide');
        } else if (scrollPosition() < lastScroll && containHide()) {
            header.classList.remove('hide')
        }

        lastScroll = scrollPosition();
    })
}