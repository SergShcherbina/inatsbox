//scroll animation
export const scrollAnimation = () => {
    const options = {
        threshold: [.4],
    };

    const callback = (entries, observer) => {
        entries.forEach((change) => {
            if (change.isIntersecting === true) {
                change.target.classList.add('element-show')
                // } else if (change.isIntersecting === false) {
                // change.target.classList.remove('element-show')
            }
        })
    };

    const observer = new IntersectionObserver(callback, options);
    const items = document.querySelectorAll(".element-animation")

    for (let i of items) {
        observer.observe(i)
    }
}