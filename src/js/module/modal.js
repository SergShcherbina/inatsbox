export const modal = () => {
    const overlay = document.querySelector('.overlay'),
        triggerModal = document.querySelectorAll('[data-trigger]');

    triggerModal.forEach(btn => {
        btn.addEventListener('click', () => {
            overlay.classList.remove('hideOverlay')
            overlay.classList.add('showOverlay')
            document.body.classList.add('modal-active')
        })
    });

    overlay.addEventListener('click', () => {
        overlay.classList.remove('showOverlay')
        overlay.classList.add('hideOverlay')
        document.body.classList.remove('modal-active')
    });
}
