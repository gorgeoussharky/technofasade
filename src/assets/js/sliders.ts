import Swiper from 'swiper'

document.addEventListener('DOMContentLoaded', () => {
    const heroCarousels = document.querySelectorAll('.hero-carousel__wrap')
    const productItemCarousels = document.querySelectorAll('.product-item__carousel')

    heroCarousels.forEach((carousel) => {
        const control = carousel.querySelector('.hero-carousel__control') as HTMLButtonElement | undefined
        const counter = carousel.querySelector('.hero-carousel__counter') as HTMLElement | undefined

        const instance = new Swiper(carousel as HTMLElement, {
            slidesPerView: 1,
            loop: true,
            on: {
                init({ slides }) {
                    const total = slides.length.toString().padStart(2, '0')
                    const content = `<span>01</span>/${total}`

                    if (counter) {
                        counter.innerHTML = content
                    }
                },
                slideChange({ slides, realIndex }) {
                    const current = (realIndex + 1).toString().padStart(2, '0')
                    const total = slides.length.toString().padStart(2, '0')
                    const content = `<span>${current}</span>/${total}`

                    if (counter) counter.innerHTML = content
                }
            }
        })

        control?.addEventListener('click', () => {
            const { direction } = control.dataset

            if (direction === 'next') instance.slideNext()
            if (direction === 'prev') instance.slidePrev()
        })
    })

    productItemCarousels.forEach((carousel) => {
        const counter = carousel.querySelector('.product-item__carousel-counter') as HTMLElement | undefined

        const instance = new Swiper(carousel as HTMLElement, {
            slidesPerView: 1,
            loop: true,
            on: {
                init({ slides }) {
                    const total = slides.length.toString().padStart(2, '0')
                    const content = `<span>01</span>/${total}`

                    if (counter) {
                        counter.innerHTML = content
                    }
                },
                slideChange({ slides, realIndex }) {
                    const current = (realIndex + 1).toString().padStart(2, '0')
                    const total = slides.length.toString().padStart(2, '0')
                    const content = `<span>${current}</span>/${total}`

                    if (counter) counter.innerHTML = content
                }
            }
        })
    })
})
