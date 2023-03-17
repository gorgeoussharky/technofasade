const createObserver = (el: HTMLElement, link: HTMLElement) => {
    const handleIntersect = (e: IntersectionObserverEntry[]) => {
        if (e[0].isIntersecting) {
            link.classList.add('nav-menu__link--active')  
            return
        }

        link.classList.remove('nav-menu__link--active')  
    }

    const observer = new IntersectionObserver(handleIntersect, {
        root: null,
        rootMargin: '0px',
        threshold: 0.05
    })

    observer.observe(el)
}

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('[data-navbar]')
    const content = document.querySelector('[data-content]')

    if (!navbar || !content) return

    content.querySelectorAll('h2').forEach((h2, index) => {
        h2.id = `heading_${index}`

        const navitem = document.createElement('li')
        const navlink = document.createElement('a')
        navitem.classList.add('nav-menu__item')
        navlink.classList.add('nav-menu__link')

        navlink.href = `#heading_${index}`
        navlink.textContent = h2.textContent

        navitem.appendChild(navlink)

        navbar.appendChild(navitem)

        createObserver(h2, navlink)
    })
})

export {}
