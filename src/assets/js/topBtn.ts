document.addEventListener('DOMContentLoaded', () => {
    const topBtn = document.querySelector('.top-btn') as HTMLElement | undefined

    if (!topBtn) return

    document.addEventListener('scroll', () => {
        const bodyHeight = document.body.offsetHeight

        if (window.scrollY > bodyHeight / 2) {
            topBtn.style.opacity = '1'
            return
        }

        topBtn.style.opacity = '0'
    })

    topBtn?.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    })
})

export {}