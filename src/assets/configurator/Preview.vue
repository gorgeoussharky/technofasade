<template>
    <div class="configurator-preview">
        <div class="configurator-preview__content">
            <img :src="horizontalImg?.default" alt="" class="configurator-preview__horizontal"
                :style="acttivePartStyle('horizontalParts')" v-show="data.horizontalParts.active" >
            <img :src="upperImg?.default" alt="" class="configurator-preview__top" :style="acttivePartStyle('upperLayer')">
            <img :src="middleImg?.default" alt="" class="configurator-preview__middle" :style="acttivePartStyle('centralParts')"  v-show="data.centralParts.active" >
            <img :src="secondaryMiddleImg?.default" alt="" class="configurator-preview__middle" :style="acttivePartStyle('centralParts')"  v-show="data.secondaryCentralParts.active" >
            <img :src="bottomImg?.default" alt="" class="configurator-preview__bottom" :style="acttivePartStyle('bottomLayer')"  v-show="data.bottomLayer.active" >
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { PreviewData } from '~/src/types/configurator';

interface Props {
    data: PreviewData
    currentPart?: string
}

const props = defineProps<Props>()

const horizontalImg = ref<Promise<string>>()
const upperImg = ref<Promise<string>>()
const middleImg = ref<Promise<string>>()
const secondaryMiddleImg = ref<Promise<string>>()
const bottomImg = ref<Promise<string>>()

const acttivePartStyle = (part: string) => {
    // if (part === 'horizontalParts' && !props.data.horizontalParts.active) {
    //     return {
    //         opacity: 0
    //     }
    // }

    // if (part === 'centralParts' && !props.data.centralParts.active) {
    //     return {
    //         opacity: 0
    //     }
    // }

    // if (part === 'bottomLayer' && !props.data.bottomLayer.active) {
    //     return {
    //         opacity: 0
    //     }
    // }

    if (!props.currentPart) {
        return {
            opacity: 1
        }
    }

    if (props.currentPart === part) {
        return {
            opacity: 1
        }
    }

    return {
        opacity: 0.5
    }
}


const getHorizontalImg = async () => {
    let img = await import(`@/assets/configurator/imgParts/${props.data.horizontalParts.color}/horizontal_simple.jpg`)

    if (props.data.lockPart.active) {
        switch (props.data.lockPart.texture) {
            case 'Ромб':
                img = await import(`@/assets/configurator/imgParts/${props.data.horizontalParts.color}/horizontal_rhombus.jpg`)
                break
            case 'Полусолнце':
                img = await import(`@/assets/configurator/imgParts/${props.data.horizontalParts.color}/horizontal_sun.jpg`)
                break;
            default:
                img = await import(`@/assets/configurator/imgParts/${props.data.horizontalParts.color}/horizontal_simple.jpg`)
                break
        }
    }

    return img
}

const getUpperImg = async () => {
    let img

    switch (props.data.upperLayer.texture) {
        case 'Жалюзи':
            img = await import(`@/assets/configurator/imgParts/${props.data.upperLayer.color}/upper_blinds.jpg`)
            break
        case 'Филенка':
            img = await import(`@/assets/configurator/imgParts/${props.data.upperLayer.color}/upper_rhombus.jpg`)
            break;
        default:
            img = await import(`@/assets/configurator/imgParts/${props.data.upperLayer.color}/upper_blinds.jpg`)
    }

    return img
}

const getMiddleImg = async () => {
    let img = await import(`@/assets/configurator/imgParts/${props.data.centralParts.color}/middle.jpg`)

    return img
}

const getSecondaryMiddleImg = async () => {
    let img = await import(`@/assets/configurator/imgParts/${props.data.secondaryCentralParts.color}/middle.jpg`)

    return img
}


const getBottomImg = async () => {
    let img

    switch (props.data.bottomLayer.texture) {
        case 'Жалюзи':
            img = await import(`@/assets/configurator/imgParts/${props.data.bottomLayer.color}/bottom_blinds.jpg`)
            break
        case 'Филенка':
            img = await import(`@/assets/configurator/imgParts/${props.data.bottomLayer.color}/bottom_rhombus.jpg`)
            break;
        default:
            img = await import(`@/assets/configurator/imgParts/${props.data.bottomLayer.color}/bottom_blinds.jpg`)
    }

    return img
}

horizontalImg.value = await getHorizontalImg()
upperImg.value = await getUpperImg()
bottomImg.value = await getBottomImg()
middleImg.value = await getMiddleImg()
secondaryMiddleImg.value = await getSecondaryMiddleImg()

watch(() => [props.data.horizontalParts, props.data.lockPart], async () => {
    console.log(props.data)
    horizontalImg.value = await getHorizontalImg()
})

watch(() => props.data.upperLayer, async () => {
    upperImg.value = await getUpperImg()
})

watch(() => props.data.bottomLayer, async () => {
    bottomImg.value = await getBottomImg()
})

watch(() => props.data.centralParts, async () => {
    middleImg.value = await getMiddleImg()
})

watch(() => props.data.secondaryCentralParts, async () => {
    secondaryMiddleImg.value = await getSecondaryMiddleImg()
})
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

.configurator-preview {

    &__content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    img {
        max-width: 100%;
        transition: 350ms;
        
        @include media-breakpoint-down(lg) {
            max-width: 22vh;
        }
    }

    .hidden {
        opacity: 0;
    }
}
</style>