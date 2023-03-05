import IMask from 'imask'

document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('input')

    inputs.forEach((input) => {
        const { type } = input

        if (type === 'tel') {
            const mask = IMask(input, {
                mask: '+{7} (000) 000-00-00'
            })
        }

        input.addEventListener('input', () => {
            const parent = input.closest('.input')
            if (input.value.length) {
                parent?.classList.add('input--active')
                return
            }

            parent?.classList.remove('input--active')
        })
    })
})