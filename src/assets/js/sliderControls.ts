document.addEventListener('DOMContentLoaded', () => {
    const controls = document.querySelectorAll('[data-animate-controls]')

    controls.forEach((controlWrap) => {
        const control = controlWrap.querySelector('[data-control]') as HTMLButtonElement | undefined

        if (!control) {
            return
        }

        controlWrap.addEventListener('mouseenter', () => {
            control.style.opacity = '1'
        })

        controlWrap.addEventListener('mouseleave', () => {
            control.style.opacity = '0'
        })

        controlWrap.addEventListener('mousemove', (e) => {  
            const bounds = controlWrap.getBoundingClientRect()
            const x = (e as MouseEvent).clientX - bounds.left
            const y = (e as MouseEvent).clientY - bounds.top

            if (x < bounds.width / 2) {
                control.style.transform = 'rotate(180deg)'
                control.dataset.direction = 'prev'
            }

            if (x > bounds.width / 2) {
                control.style.transform = 'rotate(0deg)'
                control.dataset.direction = 'next'
            }

            Object.assign(control.style, {
                top: `${y - 40}px`,
                left: `${x - 40}px`
            })
        })
    })
})

export {}
