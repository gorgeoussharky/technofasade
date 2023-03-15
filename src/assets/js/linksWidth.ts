document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('[data-animate-link]')

    links.forEach((link) => {
        const linkEl = link as HTMLElement

        setTimeout(() => {
            const width = linkEl.offsetWidth

            linkEl.style.width = `${width}px`

            linkEl.addEventListener('mouseover', () => {
                linkEl.style.width = '100%'
            })

            linkEl.addEventListener('mouseleave', () => {
                linkEl.style.width = `${width}px`
            })
        }, 300)
    })
})

export {}
