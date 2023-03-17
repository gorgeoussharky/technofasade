document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a')

    links.forEach((link) => {
        const { hash } = link

        if (hash) {
            const target = document.querySelector(hash) as HTMLElement | undefined

            if (!target) return

            link.addEventListener('click', (e) => {
                e.preventDefault()

                window.scrollTo({
                    top: target.offsetTop - 200,
                    behavior: 'smooth'
                })
            })
        }
    })
})

export {}
