
<template>
    <div class="configurator" ref="configurator">
        <div class="container">
            <div class="configurator__wrap">
                <div class="configurator__col">
                    <div class="configurator__heading">Собери свое решение</div>
                    <div ref="configuratorPreviewWrap" class="configurator__configurator-preview-wrap">
                        <Suspense>
                            <Preview class="configurator__configurator-preview configurator__configurator-preview--static"
                                :class="fixedPreview && 'configurator__configurator-preview--hidden'" :data="previewData"
                                :current-part="currentPart" />
                        </Suspense>

                        <Suspense>
                            <Preview class="configurator__configurator-preview configurator__configurator-preview--sm"
                                :class="fixedPreview && 'configurator__configurator-preview--fixed'" :data="previewData"
                                :current-part="currentPart" />
                        </Suspense>
                    </div>
                </div>
                <div class="configurator__col">

                    <div class="configurator__text">

                        Воспользуйтесь удобным конструктором для составления своего комплекта, идеально подходящего под
                        фасад
                        вашего дома.
                        В конструкторе предусмотрена возможность выбора размеров и узоров
                    </div>

                    <div class="configurator__controls">
                        <Block class="configurator__configurator-block" index="01" title="Ставни верхние" active
                            @mouseover="currentPart = 'upperLayer'" @mouseout="currentPart = undefined"
                            @intersection="currentPart = 'upperLayer'">

                            <Input class="configurator__configurator-input" :value="upperLayer.size" label="Размер (мм)"
                                disabled />

                            <div class="configurator__row">
                                <div class="configurator__radio-group">

                                    <div class="configurator__radio-group-title">
                                        Узор
                                    </div>

                                    <div class="configurator__radio-group-content">

                                        <Radio class="configurator__configurator-radio" value="Жалюзи" name="texture_upper"
                                            label="Жалюзи" :checked="upperLayer.texture === 'Жалюзи'"
                                            v-model:model="upperLayer.texture" />

                                        <Radio class="configurator__configurator-radio" value="Филенка" name="texture_upper"
                                            label="Филенка" :checked="upperLayer.texture === 'Филенка'"
                                            v-model:model="upperLayer.texture" />

                                    </div>

                                </div>

                                <Select class="configurator__configurator-select" label="Цвет ставень" :colors="true"
                                    :options="colors" v-model:value="upperLayer.color" />

                            </div>

                            <div class="configurator__input-group">

                                <Input type="number" class="configurator__configurator-input"
                                    v-model:value="upperLayer.windows" label="Введите количество окон" large
                                    notice="* В комплекте 2 ставни (правая+левая) на каждую сторону окна" />

                                <div class="configurator__notice">
                                    * В комплекте 2 части (правая+левая) на каждую сторону окна
                                </div>

                            </div>

                        </Block>

                        <Block class="configurator__configurator-block" togglable index="02" title="Ставни нижние"
                            @mouseover="currentPart = 'bottomLayer'" @mouseout="currentPart = undefined"
                            @intersection="currentPart = 'bottomLayer'" v-model:active="bottomLayer.active">

                            <Input class="configurator__configurator-input" :value="bottomLayer.size" label="Размер (мм)"
                                disabled />

                            <div class="configurator__row">
                                <div class="configurator__radio-group">

                                    <div class="configurator__radio-group-title">
                                        Узор
                                    </div>

                                    <div class="configurator__radio-group-content">
                                        <Radio class="configurator__configurator-radio" value="Жалюзи" name="texture_bottom"
                                            label="Жалюзи" :checked="bottomLayer.texture === 'Жалюзи'"
                                            v-model:model="bottomLayer.texture" />

                                        <Radio class="configurator__configurator-radio" value="Филенка"
                                            name="texture_bottom" label="Филенка"
                                            :checked="bottomLayer.texture === 'Филенка'"
                                            v-model:model="bottomLayer.texture" />

                                    </div>
                                </div>

                                <Select class="configurator__configurator-select" label="Цвет ставень" :colors="true"
                                    id="color_2" :options="colors" v-model:value="bottomLayer.color" />

                            </div>

                            <div class="configurator__input-group">

                                <Input type="number" class="configurator__configurator-input"
                                    v-model:value="bottomLayer.windows" label="Введите количество окон" large
                                    notice="* В комплекте 2 ставни (правая+левая) на каждую сторону окна" />

                                <div class="configurator__notice">
                                    * В комплекте 2 части (правая+левая) на каждую сторону окна
                                </div>

                            </div>

                        </Block>

                        <Block class="configurator__configurator-block" togglable index="03" title="Серединные части"
                            @mouseover="currentPart = 'centralParts'" @mouseout="currentPart = undefined"
                            v-model:active="centralParts.active" @intersection="currentPart = 'centralParts'">

                            <Select class="configurator__configurator-input" v-model:value="centralParts.size"
                                label="Размер (мм)" :options="sizes"
                                helper="Выбор узора серединных частей доступен только для размера 500Х300. <br><br>
                                                                                                                                                                                                Узор “Филенка” доступен для всех размеров " />
                            <div class="configurator__row">
                                <div class="configurator__radio-group">

                                    <div class="configurator__radio-group-title">
                                        Узор
                                    </div>

                                    <div class="configurator__radio-group-content">

                                        <Radio class="configurator__configurator-radio" value="Ромб" name="texture_central"
                                            label="Ромб" :checked="centralParts.texture === 'Ромб'"
                                            :model="centralParts.texture"
                                            :disabled="centralParts.size.value !== '500х300'" />

                                        <Radio class="configurator__configurator-radio" value="Филенка"
                                            name="texture_central" label="Филенка"
                                            :checked="centralParts.texture === 'Филенка'" :model="centralParts.texture" />

                                    </div>
                                </div>

                                <Select class="configurator__configurator-select" label="Цвет ставень" :colors="true"
                                    :options="colors" v-model:value="centralParts.color" />

                            </div>

                            <div class="configurator__input-group">

                                <Input type="number" class="configurator__configurator-input"
                                    v-model:value="centralParts.windows" label="Введите количество окон" large
                                    notice="* В комплекте 2 ставни (правая+левая) на каждую сторону окна" />

                                <div class="configurator__notice">
                                    * В комплекте 2 части (правая+левая) на каждую сторону окна
                                </div>
                            </div>

                            <template v-if="secondaryCentralParts.active">
                                <Select class="configurator__configurator-select" label="Размер (мм)"
                                    v-model:value="secondaryCentralParts.size" :options="sizes"
                                    helper="Выбор узора серединных частей доступен только для размера 500Х300. <br><br> Узор “Филенка” доступен для всех размеров " />

                                <div class="configurator__row">
                                    <div class="configurator__radio-group">
                                        <div class="configurator__radio-group-title">
                                            Узор
                                        </div>

                                        <div class="configurator__radio-group-content">

                                            <Radio class="configurator__configurator-radio" value="Ромб" name="texture"
                                                label="Ромб" :checked="secondaryCentralParts.texture === 'Ромб'"
                                                :model="secondaryCentralParts.texture"
                                                :disabled="secondaryCentralParts.size.value !== '500х300'" />

                                            <Radio class="configurator__configurator-radio" value="Филенка" name="texture"
                                                label="Филенка" :checked="secondaryCentralParts.texture === 'Филенка'"
                                                :model="secondaryCentralParts.texture" />

                                        </div>
                                    </div>

                                    <Select class="configurator__configurator-select" label="Цвет ставень" :colors="true"
                                        :options="colors" v-model:value="secondaryCentralParts.color" />

                                </div>

                                <div class="configurator__input-group">
                                    <Input type="number" class="configurator__configurator-input"
                                        v-model:value="secondaryCentralParts.windows" label="Введите количество окон" large
                                        notice="* В комплекте 2 ставни (правая+левая) на каждую сторону окна" />

                                    <div class="configurator__notice">
                                        * В комплекте 2 части (правая+левая) на каждую сторону окна
                                    </div>

                                </div>

                            </template>

                            <button class="configurator__add-more"
                                @click="secondaryCentralParts.active = !secondaryCentralParts.active">
                                <svg width="16" height="17" viewBox="0 0 16 17" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 15.5L8 1.5" stroke="#999999" stroke-width="2" stroke-linecap="round"
                                        v-if="!secondaryCentralParts.active" />
                                    <path d="M15 8.5L1 8.5" stroke="#999999" stroke-width="2" stroke-linecap="round" />
                                </svg>
                                {{ secondaryCentralParts.active ? 'Удалить' : 'Добавить' }} серединные части
                            </button>

                        </Block>

                        <Block class="configurator__configurator-block" togglable index="04" title="Горизонтальная планка"
                            v-model:active="horizontalParts.active" @mouseover="currentPart = 'horizontalParts'"
                            @mouseout="currentPart = undefined" @intersection="currentPart = 'horizontalParts'">

                            <div class="configurator__notice">
                                * Горизонтальные планки крепятся в верхней части окна
                            </div>

                            <Select class="configurator__configurator-select" :options="complects" label="Комплектация"
                                v-model:value="horizontalParts.complect" />

                            <div class="configurator__row">

                                <Select class="configurator__configurator-select" v-model:value="horizontalParts.length"
                                    :options="lengths" label="Длина планки" />

                                <Select class="configurator__configurator-select" v-model:value="horizontalParts.windowSize"
                                    :options="windowSizes" label="Размер окна" />
                            </div>

                            <Select class="configurator__configurator-select" :options="colors" label="Цвет планки" colors
                                v-model:value="horizontalParts.color" />

                            <template v-if="horizontalParts.complect.value.toLowerCase().includes('замковый камень')">
                                <div class="configurator__block-subheading">
                                    Замковый камень
                                </div>

                                <div class="configurator__radio-group">
                                    <div class="configurator__radio-group-title">
                                        Форма камня
                                    </div>
                                    <div class="configurator__radio-group-content">

                                        <Radio class="configurator__configurator-radio" value="Ромб" name="texture_lock"
                                            label="Ромб" id="texture_1" :checked="lockPart.texture === 'Ромб'"
                                            v-model:model="lockPart.texture" />

                                        <Radio class="configurator__configurator-radio" value="Полусолнце"
                                            name="texture_lock" label="Полусолнце" id="texture_2"
                                            :checked="lockPart.texture === 'Полусолнце'" v-model:model="lockPart.texture" />

                                    </div>
                                </div>
                                <div class="configurator__row">
                                    <Select class="configurator__configurator-select" v-model:value="lockPart.color"
                                        :disabled="lockPart.sameColor" :options="colors" label="Цвет камня" colors />

                                    <Checkbox class="configurator__configurator-checkbox" label="В цвет ставень"
                                        value="same_color" v-model:model="lockPart.sameColor" />

                                </div>
                            </template>

                            <template v-if="horizontalParts.complect.value.toLowerCase().includes('торцевые заглушки')">
                                <div class="configurator__block-subheading">
                                    Торцевые заглушки
                                </div>
                                <div class="configurator__row">
                                    <Select class="configurator__configurator-select" v-model:value="plugPart.color"
                                        :disabled="plugPart.sameColor" :options="colors" label="Цвет торцевых заглушек"
                                        colors />

                                    <Checkbox class="configurator__configurator-checkbox" label="В цвет ставень"
                                        value="same_color" v-model:model="plugPart.sameColor" />

                                </div>
                            </template>

                        </Block>

                        <Block class="configurator__configurator-block" index="05" title="Крепеж" active>
                            <Select class="configurator__configurator-select" label="Цвет планки" :colors="true"
                                :options="colors" v-model:value="fastener.color" />
                        </Block>

                    </div>

                    <div class="configurator__actions" :class="loading && 'configurator__actions--loading'">
                        <button class="configurator__action" @click="handleOpenModal()">
                            Отправить заявку
                            <svg width="25" height="30" viewBox="0 0 25 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 15L0 30L8.25 15L0 0L15 15Z" fill="#CB9274" />
                                <path d="M24.6406 15L9.64063 30L17.8906 15L9.64062 0L24.6406 15Z" fill="#CB9274" />
                            </svg>
                            <img src="@/assets/img/letter.png" />
                        </button>

                        <button class="configurator__action" @click="getPDF()">
                            Сохранить в pdf
                            <svg width="25" height="30" viewBox="0 0 25 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 15L0 30L8.25 15L0 0L15 15Z" fill="#CB9274" />
                                <path d="M24.6406 15L9.64063 30L17.8906 15L9.64062 0L24.6406 15Z" fill="#CB9274" />
                            </svg>

                            <svg width="36" height="35" viewBox="0 0 36 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M36 30.2273V23.8636C36 23.4417 35.842 23.037 35.5607 22.7387C35.2794 22.4403 34.8978 22.2727 34.5 22.2727C34.1022 22.2727 33.7206 22.4403 33.4393 22.7387C33.158 23.037 33 23.4417 33 23.8636V30.2273C33 30.6492 32.842 31.0539 32.5607 31.3522C32.2794 31.6506 31.8978 31.8182 31.5 31.8182H4.5C4.10218 31.8182 3.72064 31.6506 3.43934 31.3522C3.15804 31.0539 3 30.6492 3 30.2273V23.8636C3 23.4417 2.84196 23.037 2.56066 22.7387C2.27936 22.4403 1.89782 22.2727 1.5 22.2727C1.10218 22.2727 0.720645 22.4403 0.43934 22.7387C0.158036 23.037 0 23.4417 0 23.8636V30.2273C0 31.4931 0.474106 32.707 1.31802 33.6021C2.16193 34.4972 3.30653 35 4.5 35H31.5C32.6935 35 33.8381 34.4972 34.682 33.6021C35.5259 32.707 36 31.4931 36 30.2273ZM26.43 21.9227L18.93 28.2864C18.6652 28.5083 18.3375 28.629 18 28.629C17.6625 28.629 17.3348 28.5083 17.07 28.2864L9.57 21.9227C9.29672 21.6491 9.13023 21.2767 9.10345 20.8792C9.07667 20.4816 9.19157 20.0879 9.4254 19.7759C9.65924 19.4639 9.99497 19.2563 10.3662 19.1943C10.7374 19.1323 11.117 19.2203 11.43 19.4409L16.5 23.7364V1.59091C16.5 1.16897 16.658 0.76432 16.9393 0.465967C17.2206 0.167613 17.6022 0 18 0C18.3978 0 18.7794 0.167613 19.0607 0.465967C19.342 0.76432 19.5 1.16897 19.5 1.59091V23.7364L24.57 19.4409C24.721 19.2897 24.9001 19.1734 25.0957 19.0994C25.2913 19.0254 25.4993 18.9953 25.7065 19.011C25.9137 19.0267 26.1156 19.0878 26.2993 19.1906C26.483 19.2933 26.6446 19.4354 26.7739 19.6079C26.9031 19.7803 26.9972 19.9794 27.0501 20.1924C27.103 20.4054 27.1137 20.6278 27.0814 20.8454C27.049 21.063 26.9744 21.2712 26.8623 21.4566C26.7502 21.642 26.603 21.8008 26.43 21.9227Z"
                                    fill="#CB9274" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, reactive, watch, ref } from 'vue';
import html2canvas from 'html2canvas';

import Block from './Block.vue';
import Checkbox from './Checkbox.vue';
import Input from './Input.vue';
import Preview from './Preview.vue';
import Radio from './Radio.vue';
import Select from './Select.vue';

interface ConfiguratorWindow extends Window {
    type?: 'горизонтальные' | 'жалюзи' | 'филенка'
}

const type = (window as ConfiguratorWindow).type

const colors = [
    { value: 'red', color: '#973630', label: 'Красный' },
    { value: 'white', color: '#EBEBEB', label: 'Белый' },
    { value: 'green', color: '#376841', label: 'Зеленый' },
    { value: 'brown', color: '#62453F', label: 'Коричневый' }
]

const sizes = [
    { value: '300х330', label: '300х330' },
    { value: '200х330', label: '200х330' },
    { value: '500х300', label: '500х300' },
]

const complects = [
    { value: 'Планка', label: 'Планка' },
    { value: 'Планка+торцевые заглушки', label: 'Планка+торцевые заглушки' },
    { value: 'Планка+замковый камень', label: 'Планка+замковый камень' },
    { value: 'Планка+торцевые заглушки+замковый камень', label: 'Планка+торцевые заглушки+замковый камень' },
]

const lengths = [
    { value: 'В размер окна', label: 'В размер окна' },
    { value: 'В размер окна+ставни', label: 'В размер окна+ставни' },
]

const windowSizes = [
    { value: '1450Х1300', label: '1450Х1300' },
]

const upperLayer = reactive({
    size: '500x300',
    texture: type == 'жалюзи' ? 'жалюзи' : 'филенка',
    color: colors[0],
    windows: 8
})

const bottomLayer = reactive({
    active: false,
    size: '500x300',
    texture: type == 'жалюзи' ? 'жалюзи' : 'филенка',
    color: colors[0],
    windows: 8
})

const centralParts = reactive({
    active: false,
    size: sizes[2],
    texture: 'Ромб',
    color: colors[0],
    windows: 8
})

const secondaryCentralParts = reactive({
    active: false,
    size: sizes[2],
    texture: 'Ромб',
    color: colors[0],
    windows: 8
})

const horizontalParts = reactive({
    active: type == 'горизонтальные',
    complect: complects[3],
    length: lengths[1],
    windowSize: windowSizes[0],
    color: colors[0],
})

const lockPart = reactive({
    texture: 'Ромб',
    color: colors[0],
    sameColor: false
})

const plugPart = reactive({
    color: colors[0],
    sameColor: false
})

const fastener = reactive({
    color: colors[0],
})

const currentPart = ref<string>()
const configuratorPreviewWrap = ref<HTMLElement>()
const configurator = ref<HTMLElement>()
const fixedPreview = ref<boolean>()
const loading = ref<boolean>(false)

const previewData = computed(() => {
    return {
        upperLayer: {
            color: upperLayer.color.value,
            texture: upperLayer.texture,
        },
        bottomLayer: {
            active: bottomLayer.active,
            color: bottomLayer.color.value,
            texture: bottomLayer.texture,
        },
        centralParts: {
            active: centralParts.active,
            color: centralParts.color.value,
            texture: centralParts.texture,
        },
        secondaryCentralParts: {
            active: secondaryCentralParts.active,
            color: secondaryCentralParts.color.value,
            texture: secondaryCentralParts.texture,
        },
        horizontalParts: {
            color: horizontalParts.color.value,
            active: horizontalParts.active
        },
        lockPart: {
            active: horizontalParts.complect.value.toLowerCase().includes('замковый камень'),
            texture: lockPart.texture,
            color: lockPart.sameColor ? upperLayer.color.value : lockPart.color.value,
        },
        plugPart: {
            active: horizontalParts.complect.value.toLowerCase().includes('торцевые заглушки'),
            color: plugPart.sameColor ? upperLayer.color.value : plugPart.color.value,
        },
        fastener: {
            color: fastener.color.value,
        }
    }
})

watch(() => centralParts.size, () => {
    if (centralParts.size.value !== '500x300') {
        centralParts.texture = 'Филенка'
    }
})

watch(() => secondaryCentralParts.size, () => {
    if (secondaryCentralParts.size.value !== '500x300') {
        secondaryCentralParts.texture = 'Филенка'
    }
})

watch(() => secondaryCentralParts.size, () => {
    if (secondaryCentralParts.size.value !== '500x300') {
        secondaryCentralParts.texture = 'Филенка'
    }
})

document.addEventListener('scroll', () => {
    if (window.matchMedia('(min-width: 991px)').matches) return

    if (!configuratorPreviewWrap.value || !configurator.value) return

    if (window.scrollY + 100 > configuratorPreviewWrap.value.offsetTop && window.scrollY < configurator.value.offsetTop + configurator.value.offsetHeight) {
        fixedPreview.value = true
        return
    }

    if (window.scrollY + (window.innerHeight) >= configurator.value.offsetTop + configurator.value.offsetHeight - 300) {
        fixedPreview.value = false
        return
    }

    fixedPreview.value = false
})

const collectData = () => {
    const configuratorData = {
        'Размер верхних': upperLayer.size,
        'Узор верхних': upperLayer.texture,
        'Цвет верхних': upperLayer.color.label,
        'Количество окон верхних': upperLayer.windows,
        'Цвет крепежа': fastener.color.label
    } as any

    if (bottomLayer.active) {
        configuratorData['Размер нижних'] = bottomLayer.size
        configuratorData['Узор нижних'] = bottomLayer.texture
        configuratorData['Цвет нижних'] = bottomLayer.color.label
        configuratorData['Количество окон нижних'] = bottomLayer.windows
    }

    if (centralParts.active) {
        configuratorData['Размер серединных'] = centralParts.size.label
        configuratorData['Узор серединных'] = centralParts.texture
        configuratorData['Цвет серединных'] = centralParts.color.label
        configuratorData['Количество окон серединных'] = centralParts.windows
    }

    if (secondaryCentralParts.active) {
        configuratorData['Размер серединных 2'] = secondaryCentralParts.size.label
        configuratorData['Узор серединных 2'] = secondaryCentralParts.texture
        configuratorData['Цвет серединных 2'] = secondaryCentralParts.color.label
        configuratorData['Количество окон серединных 2'] = secondaryCentralParts.windows
    }

    if (horizontalParts.active) {
        configuratorData['Комплект'] = horizontalParts.complect.label
        configuratorData['Длина'] = horizontalParts.length.label
        configuratorData['Размер окна'] = horizontalParts.windowSize.label
        configuratorData['Цвет окна'] = horizontalParts.color.label
    }

    if (horizontalParts.complect.value.toLowerCase().includes('замковый камень')) {
        configuratorData['Цвет замкового камня'] = lockPart.sameColor ? upperLayer.color.label : lockPart.color.label
        configuratorData['Форма замкового камня'] = lockPart.texture
    }

    if (horizontalParts.complect.value.toLowerCase().includes('торцевые заглушки')) {
        configuratorData['Цвет заглушки'] = plugPart.sameColor ? upperLayer.color.label : plugPart.color.label
    }

    return configuratorData
}

const handleOpenModal = () => {
    const contactModal = document.getElementById('contact-modal') as HTMLDialogElement | undefined

    if (!contactModal) return

    const dataInput = contactModal.querySelector('[data-configurator-input]') as HTMLInputElement | undefined

    if (!dataInput) return

    const data = collectData()

    dataInput.value = JSON.stringify(data)
    dataInput.disabled = false

    contactModal.showModal()
}

const getPDF = async () => {
    const data = new FormData()
    data.append('data', JSON.stringify(collectData()))
    data.append('action', 'get_pdf')

    loading.value = true

    if (configuratorPreviewWrap.value) {
        const preview = await html2canvas(configuratorPreviewWrap.value, {
            scale: 0.7
        })
        data.append('preview', preview.toDataURL("image/jpg"))
    }



    const req = await fetch('/wp-admin/admin-ajax.php', {
        method: 'POST',
        body: data,
    })

    const resp = await req.text()

    if (!resp) return

    loading.value = false

    window.open(resp, '_blank');

}

</script>

<style lang="scss" scoped>
@import '~bootstrap/scss/functions';
@import '~bootstrap/scss/variables';
@import '~bootstrap/scss/maps';
@import '~bootstrap/scss/mixins';
@import '~bootstrap/scss/reboot';
@import '~bootstrap/scss/containers';
@import '~sass-rem/rem';
@import '@/assets/scss/base/variables';

.configurator {
    background-color: #fff;

    &__wrap {
        display: grid;
        grid-template-columns: 1fr 1fr;
        max-width: 1225px;
        gap: rem(30px);
        padding: rem(200px 0);

        @include media-breakpoint-down(lg) {
            padding: 100px 0;
            grid-template-columns: 1fr;
            max-width: calc(100% - 60px);
            margin: auto;
        }
    }

    &__heading {
        font-weight: 600;
        font-size: rem(60px);
        text-transform: uppercase;
        line-height: 120%;
        font-family: Cormorant, sans-serif;
        max-width: 440px;
        margin-bottom: rem(84px);

        @include media-breakpoint-down(sm) {
            font-size: 48px;
        }
    }

    &__controls {
        display: grid;
        gap: rem(48px);

        @include media-breakpoint-down(sm) {
            gap: 55px;
        }
    }

    &__text {
        line-height: 175%;
        margin-bottom: rem(84px);

        @include media-breakpoint-down(sm) {
            margin-bottom: 52px;
            font-size: 14px;
        }
    }

    &__row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: rem(50px);
        align-items: center;

        @include media-breakpoint-down(md) {
            grid-template-columns: 1fr;
            gap: 24px;
        }

        .configurator__configurator-checkbox {
            transform: translateY(10px);
        }
    }

    &__radio-group {
        &-title {
            font-weight: 500;
            color: #AFAFAF;
            margin-bottom: rem(6px);
            display: block;
        }

        &-content {
            display: flex;
            gap: rem(10px);
        }
    }

    &__add-more {
        font-weight: 800;
        font-size: rem(20px);
        line-height: 80px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: #999999;
        text-align: left;
        border-bottom: 2px solid #DDDDDD;
        line-height: 1;
        padding-bottom: rem(16px);
        display: flex;
        align-items: center;
        gap: 14px;
    }


    &__notice {
        line-height: 18px;
        color: #CB9274;
        display: flex;
        align-items: center;
    }

    &__input-group {
        display: flex;
        align-items: center;
        gap: rem(20px);

        .configurator__notice {
            margin-top: rem(30px);
            max-width: 270px;
            font-style: italic;
            font-size: rem(14px);

            @include media-breakpoint-down(sm) {
                font-size: 12px;
                max-width: 150px;
            }
        }
    }

    &__block-subheading {
        font-weight: 600;
        font-size: rem(24px);
        color: $main;
    }

    &__configurator-preview-wrap {
        position: sticky;
        top: 100px;

        @include media-breakpoint-down(lg) {
            height: 32vh;
            position: static;
        }
    }

    &__configurator-preview {
        transition: 500ms;

        @include media-breakpoint-down(lg) {
            position: fixed;
            background: #fff;
            top: -32vh;
            left: 0;
            padding: rem(30px) 0;
            height: 32vh;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            z-index: 250;
            transition: 1000ms;
        }

        &--sm {
            display: none;

            @include media-breakpoint-down(lg) {
                display: flex;
            }
        }

        &--hidden {
            opacity: 0;
            transition: 1000ms;
        }

        &--static {
            transition: 1000ms;

            @include media-breakpoint-down(lg) {
                position: static;
            }
        }

        &--fixed {
            display: none;
            position: fixed;
            top: 60px;
            transition: 1000ms;

            @include media-breakpoint-down(lg) {
                display: flex;
                top: 80px;
            }

            @include media-breakpoint-down(md) {
                top: 60px;
            }

            &::after {
                content: '';
                background: linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0.77) 43.78%, rgba(255, 255, 255, 0) 100%);
                position: absolute;
                top: 100%;
                left: 0;
                height: 75px;
                width: 100%;
            }
        }
    }

    &__actions {
        margin-top: rem(120px);
        display: grid;
        gap: rem(32px);

        &--loading {
            opacity: 0.5;
            cursor: progress;

            .configurator__action {
                cursor: progress;
            }
        }
    }

    &__action {
        font-weight: 800;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: $main;
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        position: relative;
        text-decoration: none;
        padding-bottom: rem(14px);
        gap: rem(14px);
        margin-right: auto;
        transition: 350ms;
        width: 100%;

        img,
        svg:nth-of-type(2) {
            position: absolute;
            right: 0;
        }


        @include media-breakpoint-down(sm) {
            font-size: 16px;
        }

        &:hover {

            transition: 350ms;
            color: $main;

            &::before {
                width: 100%;
                transition: 350ms;
            }
        }

        &::before {
            content: '';
            width: 230px;
            transition: 350ms;
            height: 2px;
            background-color: $main;
            position: absolute;
            bottom: 0;
            left: 0;
        }
    }
}
</style>
