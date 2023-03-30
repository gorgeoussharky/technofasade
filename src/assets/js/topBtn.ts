document.addEventListener('DOMContentLoaded', () => {
    const topBtn = document.querySelector('.top-btn__toggle') as HTMLElement | undefined
    const footer = document.querySelector('.footer') as HTMLElement

    if (!topBtn) return

    document.addEventListener('scroll', () => {
        const bodyHeight = document.body.offsetHeight
        
        if ((window.scrollY + window.innerHeight) >= footer.offsetTop - 200) {
            topBtn.classList.remove('top-btn__toggle--visible')
            return
        }

        if (window.scrollY > bodyHeight / 3) {
            topBtn.classList.add('top-btn__toggle--visible')
            return
        }

        topBtn.classList.remove('top-btn__toggle--visible')
    })

    topBtn?.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    })
})

export {}