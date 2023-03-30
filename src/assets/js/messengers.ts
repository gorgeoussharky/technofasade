document.addEventListener('DOMContentLoaded', () => {
    const messengers = document.querySelector('.messengers') as HTMLElement | undefined
    const topBtn = document.querySelector('.top-btn__toggle') as HTMLElement | undefined
    const toggle = messengers?.querySelector('.messengers__toggle') as HTMLElement | undefined
    const footer = document.querySelector('.footer') as HTMLElement

    if (!messengers) return

    const state = new Proxy(
        {
            expanded: false
        },
        {
            set(target, key, value: boolean) {
                if (value) {
                    target.expanded = true
                    messengers.classList.add('messengers--active')

                    if (topBtn) {
                        if (window.matchMedia('(min-width: 1399px)').matches) {
                            topBtn.style.transform = 'translateY(-220px)'
                        } else {
                            topBtn.style.transform = 'translateY(-140px)'
                        }
                    }

                    return true
                }

                target.expanded = false
                messengers.classList.remove('messengers--active')
                if (topBtn) topBtn.style.transform = 'translateY(0)'

                return true
            }
        }
    )


    toggle?.addEventListener('click', () => {
        state.expanded = !state.expanded
    })

    document.addEventListener('scroll', () => {        
        if ((window.scrollY + window.innerHeight) >= footer.offsetTop - 200) {
            messengers.classList.add('messengers--hidden')
            return
        }

        messengers.classList.remove('messengers--hidden')
    })
})

export {}
