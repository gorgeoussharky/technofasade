<template>
    <div class="helper" @mouseover="showPopup = true" @mouseout="showPopup = false">
        <div class="helper__wrap">
            <div class="helper__icon">
                ?
            </div>
            <div class="helper__popup" v-show="showPopup" v-html="text">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Props {
    text: string
}

defineProps<Props>()

const showPopup = ref<boolean>(false)
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
.helper {
    &__wrap {
        position: relative;
    }

    &__icon {
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: $main;
        color: #fff;
        border-radius: 50%;
        font-weight: 600;
        font-size: rem(18px);
        cursor: pointer;
        z-index: 100;
        position: relative;
    }

    &__popup {
        padding: rem(20px) rem(24px);
        background: #FFFFFF;
        box-shadow: 0px 8px 60px rgba(0, 0, 0, 0.1);
        position: absolute;
        max-width: 290px;
        width: 100%;
        z-index: 10;
        top: 12px;
        left: 12px;
        line-height: 150%;
        font-weight: 500;
        color: #767676;

    }
}
</style>