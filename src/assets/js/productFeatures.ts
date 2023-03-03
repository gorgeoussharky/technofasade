document.addEventListener('DOMContentLoaded', () => {
    const featureToggles = document.querySelectorAll('.feature-item__toggle')

    featureToggles.forEach((toggle) => {
        toggle.addEventListener('click' , () => {
            const parent = toggle.parentElement as HTMLElement

            parent.classList.toggle('feature-item--active')
        })
    })
})

export {}