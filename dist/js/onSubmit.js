import confetti from 'https://cdn.skypack.dev/canvas-confetti'

const onSubmit = () => {
    const form = document.querySelector('.contacts__form')
    const btn = form.querySelector('.contacts__form-btn')

    const handleSubmit = async (e) => {
        e.preventDefault();

        btn.textContent = 'отправляется...';

        const formData = new FormData(form);
        const response = await fetch('mailer/sendMail.php', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            btn.textContent = 'успешно отправлено! 🚀';
            confetti()
            form.reset()
        } else {
            btn.textContent = 'произошла ошибка 🥴'
            btn.style.background = 'red'
        }

        setTimeout(() => {
            btn.textContent = 'Отправить сообщение'
            btn.style.background = 'transparent'
        }, 4000);

    }

    form.addEventListener('submit', handleSubmit);
}
onSubmit()