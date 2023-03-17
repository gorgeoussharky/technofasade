import Swiper, { Navigation } from 'swiper'

const speed = 750

const updateCounter = (slides: HTMLElement[], counter: HTMLElement, currentIndex?: number) => {
    const total = slides.length.toString().padStart(2, '0')
    const current = currentIndex && (currentIndex + 1).toString().padStart(2, '0')

    let content:string

    if (!current) {
        content = `<span>01</span>/${total}`
        counter.innerHTML = content
        return
    }

    content = `<span>${current}</span>/${total}`
    counter.innerHTML = content
}

const controlClickHandler = (el: HTMLElement, instance: Swiper) => {
    const { direction } = el.dataset

    if (direction === 'next') instance.slideNext()
    if (direction === 'prev') instance.slidePrev()
}

document.addEventListener('DOMContentLoaded', () => {
    const heroCarousels = document.querySelectorAll('.hero-carousel__wrap')
    const productItemCarousels = document.querySelectorAll('.product-item__carousel')
    const variationsCarousels = document.querySelectorAll('.variations__carousel')
    const portfolioCarousels = document.querySelectorAll('.portfolio__carousel')
    const testimonialsCarousels = document.querySelectorAll('.testimonials__carousel')
    const basicCarousels = document.querySelectorAll('[data-carousel]')
    const productCarousels = document.querySelectorAll('.product-carousel__wrap')

    heroCarousels.forEach((carousel) => {
        const control = carousel.querySelector('.hero-carousel__control') as HTMLButtonElement | undefined
        const counter = carousel.querySelector('.hero-carousel__counter') as HTMLElement | undefined

        const instance = new Swiper(carousel as HTMLElement, {
            slidesPerView: 1,
            loop: true,
            speed,
            on: {
                init({ slides }) {
                    if (!counter) return

                    updateCounter(slides, counter)
                },
                slideChange({ slides, realIndex }) {
                    if (!counter) return

                    updateCounter(slides, counter, realIndex)
                }
            }
        })

        control?.addEventListener('click', () => {
            controlClickHandler(control, instance)
        })
    })

    productItemCarousels.forEach((carousel) => {
        const counter = carousel.querySelector('.product-item__carousel-counter') as HTMLElement | undefined
        const control = carousel.querySelector('.product-item__carousel-control') as HTMLButtonElement | undefined

        const instance = new Swiper(carousel as HTMLElement, {
            slidesPerView: 1,
            loop: true,
            centeredSlides: true,
            speed,
            on: {
                init({ slides }) {
                    if (!counter) return

                    updateCounter(slides, counter)
                },
                slideChange({ slides, realIndex }) {
                    if (!counter) return

                    updateCounter(slides, counter, realIndex)
                }
            }
        })

        control?.addEventListener('click', () => {
            controlClickHandler(control, instance)
        })
    })

    variationsCarousels.forEach((carousel) => {
        const control = carousel.querySelector('.variations__carousel-control') as HTMLButtonElement | undefined

        const instance = new Swiper(carousel as HTMLElement, {
            slidesPerView: 2,
            loop: true,
            speed,
            centeredSlides: true,
        })

        control?.addEventListener('click', () => {
            controlClickHandler(control, instance)
        })
    })

    portfolioCarousels.forEach((carousel) => {
        const control = carousel.querySelector('.portfolio__carousel-control') as HTMLButtonElement | undefined

        const instance = new Swiper(carousel as HTMLElement, {
            slidesPerView: 2,
            loop: true,
            speed,
            centeredSlides: true,
        })

        control?.addEventListener('click', () => {
            controlClickHandler(control, instance)
        })
    })

    testimonialsCarousels.forEach((carousel) => {
        const prevEl = carousel.querySelector('.testimonials__carousel-control--prev') as HTMLButtonElement | undefined
        const nextEl =  carousel.querySelector('.testimonials__carousel-control--next') as HTMLButtonElement | undefined

        const instance = new Swiper(carousel as HTMLElement, {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            modules: [Navigation],
            navigation: {
                prevEl,
                nextEl
            },
            breakpoints: {
                768: {
                    spaceBetween: 20,
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 2,
                    spaceBetween: 40,
                }
            }
        })
    })

    basicCarousels.forEach((carousel) => {
        const sliderEl =  carousel.querySelector('.swiper') as HTMLElement | undefined
        const prevEl = carousel.querySelector('[data-prev]') as HTMLButtonElement | undefined
        const nextEl =  carousel.querySelector('[data-next]') as HTMLButtonElement | undefined

        if (!sliderEl) return

        const instance = new Swiper(sliderEl, {
            slidesPerView: 'auto',
            spaceBetween: 20,
            modules: [Navigation],
            navigation: {
                prevEl,
                nextEl
            },
        })
    })

    productCarousels.forEach((carousel) => {
        const control = carousel.querySelector('.product-carousel__control') as HTMLButtonElement | undefined
        const counter = carousel.querySelector('.product-carousel__counter') as HTMLElement | undefined

        const instance = new Swiper(carousel as HTMLElement, {
            slidesPerView: 1,
            loop: true,
            speed,
            on: {
                init({ slides }) {
                    if (!counter) return

                    updateCounter(slides, counter)
                },
                slideChange({ slides, realIndex }) {
                    if (!counter) return

                    updateCounter(slides, counter, realIndex)
                }
            }
        })

        control?.addEventListener('click', () => {
            controlClickHandler(control, instance)
        })
    })
})
