document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tabs')

    tabs.forEach((tab) => {
        const btns = tab.querySelectorAll('.tabs__btn')

        btns.forEach((btn) => {
            const btnEl = btn as HTMLButtonElement
            btn.addEventListener('click', (e) => {
                e.preventDefault()

                const target = btnEl.dataset.tab
                if (!target) return

                const contentEl = document.querySelector(`[data-tab-content=${target}]`)

                if (!contentEl) return

                const activeBtn = tab.querySelector('.tabs__btn--active')

                if (activeBtn) activeBtn.classList.remove('tabs__btn--active')
                btnEl.classList.add('tabs__btn--active')

                const activeContent = tab.querySelector('.tabs__content--active')

                if (activeContent) activeContent.classList.remove('tabs__content--active')
                contentEl.classList.add('tabs__content--active')
                


            })
        })
    })
})

export {}
