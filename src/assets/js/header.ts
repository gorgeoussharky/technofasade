document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header') as HTMLElement | undefined
    const menuToggler = document.querySelector('.header__toggler') as HTMLElement | undefined
    const headerMenu = document.querySelector('.header__header-menu') as HTMLElement| undefined
    const menuTransition = headerMenu ? parseFloat(getComputedStyle(headerMenu).transitionDuration) * 1000 : 500

    const headerObj = {
        fixed: false,
        menuExpanded: false,
        menuTransitioning: false,
        scrollPosition: 0
    }

    if (!header) return

    document.body.style.paddingTop = `${header.offsetHeight}px`

    const headerState = new Proxy(headerObj, {
        set(target, key: keyof typeof headerObj, value: boolean & number) {
            target[key] = value

            if (headerMenu && key === 'menuExpanded') {
                if (target.menuExpanded) {
                    menuToggler?.classList.add('header__toggler--active')
                    document.documentElement.classList.add('locked')

                    target.menuTransitioning = true

                    Object.assign(headerMenu.style, {
                        opacity: 0,
                        display: 'flex'
                    })

                    setTimeout(() => {
                        headerMenu.style.opacity = '1'
                        target.menuTransitioning = false
                    })

                    return true
                }

                menuToggler?.classList.remove('header__toggler--active')
                document.documentElement.classList.remove('locked')

                target.menuTransitioning = true
                headerMenu.style.opacity = '0'

                setTimeout(() => {
                    headerMenu.style.display = 'none'
                    target.menuTransitioning = false
                }, menuTransition)
            }

            return true
        }
    })

    document.addEventListener('scroll', () => {
        const { scrollY } = window
        const prevScrollY = headerState.scrollPosition
        
        if (scrollY > window.innerHeight / 2) {
            header.classList.remove('header--slide-out')
            header.classList.add('header--fixed')
            header.classList.add('header--slide-in')
        }

        if (prevScrollY > scrollY) {
            // if scroll is less than viewport height and scroll is up
            if (scrollY < window.innerHeight / 2) {
                header.classList.remove('header--slide-in')
                header.classList.add('header--slide-out')
            }

            if (scrollY <= header.offsetHeight) {
                header.classList.remove('header--fixed')
                header.classList.remove('header--slide-out')
            }
        }

        // set prev scroll position
        headerState.scrollPosition = scrollY
    })

    menuToggler?.addEventListener('click', (e) => {
        e.preventDefault()
        if (!headerState.menuTransitioning) headerState.menuExpanded = !headerState.menuExpanded
    })

    headerMenu?.querySelectorAll('.header-menu__link').forEach((link) => {
        const linkEl = link as HTMLAnchorElement
        const { hash } = linkEl

        if (hash && window.matchMedia('(max-width:1200px)').matches) {
            linkEl.addEventListener('click', () => {
                headerState.menuExpanded = false
            })
        }
    })
})

export {}
