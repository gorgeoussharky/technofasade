interface GalleryItem {
    caption: string
    img: string
}

interface ModalDOM {
    modal: HTMLDialogElement
    prevBtn: HTMLElement
    nextBtn: HTMLElement
    img: HTMLImageElement
    caption: HTMLElement
}

const renderModal = (galleryName: string):ModalDOM => {
    const modal = document.createElement('dialog')
    modal.classList.add('modal')
    modal.id = galleryName

    const modalContent = document.createElement('div')
    modalContent.classList.add('modal__content')
    modal.appendChild(modalContent)

    const modalClose = document.createElement('button')
    modalClose.classList.add('modal__close')
    modalClose.innerHTML = `<svg width="85" height="85" viewBox="0 0 85 85" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M63.6328 21.2031L21.2064 63.6295" stroke="white" stroke-width="4" stroke-linecap="round"></path>
        <path d="M21.2266 21.2031L63.653 63.6295" stroke="white" stroke-width="4" stroke-linecap="round"></path>
    </svg>`

    modalContent.appendChild(modalClose)

    const modalGallery = document.createElement('div')
    modalGallery.classList.add('modal__modal-gallery')
    modalGallery.classList.add('modal-gallery')
    modalContent.appendChild(modalGallery)

    const galleryWrap = document.createElement('div')
    galleryWrap.classList.add('modal-gallery__wrap')
    modalGallery.appendChild(galleryWrap)

    const prevBtn = document.createElement('button')
    prevBtn.classList.add('modal-gallery__control')
    prevBtn.classList.add('modal-gallery__control--prev')
    prevBtn.innerHTML = `<svg width="48" height="68" viewBox="0 0 48 68" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 34.4978L48 67.9978L26.5 34.4978L48 0.997772L15 34.4978Z" fill="white"></path>
    <path d="M0 34.4978L25 58.9978L9.5 34.4978L25 9.99777L0 34.4978Z" fill="white"></path>
    </svg>`
    
    const nextBtn = document.createElement('button')
    nextBtn.classList.add('modal-gallery__control')
    nextBtn.classList.add('modal-gallery__control--next')
    nextBtn.innerHTML = `<svg width="48" height="68" viewBox="0 0 48 68" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M33 34.4978L0 67.9978L21.5 34.4978L0 0.997772L33 34.4978Z" fill="white"></path>
    <path d="M48 34.4978L23 58.9978L38.5 34.4978L23 9.99777L48 34.4978Z" fill="white"></path>
    </svg>`

    galleryWrap.appendChild(prevBtn)
    galleryWrap.appendChild(nextBtn)

    const content = document.createElement('div')
    content.classList.add('modal-gallery__content')
    galleryWrap.appendChild(content)

    const imgWrap = document.createElement('figure')
    imgWrap.classList.add('modal-gallery__img-wrap')

    const img = document.createElement('img')
    img.classList.add('modal-gallery__img')
    imgWrap.appendChild(img)

    const caption = document.createElement('figcaption')
    caption.classList.add('modal-gallery__img-caption')
    imgWrap.appendChild(caption)

    content.appendChild(imgWrap)

    document.body.appendChild(modal)

    return { modal, img, prevBtn, nextBtn, caption }
}

document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('[data-gallery]')
    // const modalImg = galleryModal.querySelector('[data-img]') as HTMLImageElement
    // const modalCaption = galleryModal.querySelector('[data-caption]') as HTMLElement
    // const galleryPrev = galleryModal.querySelector('.modal-gallery__control--prev') as HTMLElement
    // const galleryNext = galleryModal.querySelector('.modal-gallery__control--next') as HTMLElement

    const galleries = new Set<string>()

    // Iterate through all gallery items and create galleries set
    galleryItems.forEach((galleryItem) => {
        const galleryName = (galleryItem as HTMLElement).dataset.gallery

        if (!galleryName) return

        galleries.add(galleryName)
    })

    // Iterate galleries
    galleries.forEach((galleryName) => {
        // Create modal for each gallery
        const { modal, img, prevBtn, nextBtn, caption } = renderModal(galleryName)

        // Find every item is the current gallery
        const currentGalleryItems = document.querySelectorAll(`[data-gallery="${galleryName}"]`)

        const galleryObj = {
            index: 0,
            collection: [] as GalleryItem[]
        }

        // Create proxy for each gallery
        const galleryState = new Proxy(galleryObj, {
            set(target, key: keyof typeof galleryObj, value: number & GalleryItem) {
                if (key === 'index') {
                    target.index = value

                    img.src = target.collection[value].img
                    caption.textContent = target.collection[value].caption
                }

                if (key === 'collection') {
                    target.collection.push(value)
                }

                return true
            }
        })

        currentGalleryItems.forEach((currentGalleryItem, index) => {
            const itemCaption = currentGalleryItem.querySelector('[data-caption]') as HTMLElement | undefined
            const itemImg = (currentGalleryItem as HTMLLinkElement).href

            galleryState.collection.push({
                caption: itemCaption?.textContent || '',
                img: itemImg
            })

            currentGalleryItem.addEventListener('click', (event) => {
                event.preventDefault()

                galleryState.index = index

                modal.showModal()
            })
        })

        prevBtn.addEventListener('click', () => {
            if (galleryState.index > 0) {
                galleryState.index -= 1
                return
            }
    
            galleryState.index = galleryState.collection.length - 1
        })
    
        nextBtn.addEventListener('click', () => {
            if (galleryState.index < galleryState.collection.length - 1) {
                galleryState.index += 1
                return
            }
    
            galleryState.index = 0
        })
    })
})

export {}
