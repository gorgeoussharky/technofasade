<template>
    <div class="configurator-select">
        <label class="configurator-select__label" :for="id">{{ label }}</label>
        
        <div class="configurator-select__wrap configurator-select__wrap--sm">
            <select class="configurator-select__control" :id="id"
                @change="handleSelect(($event.target as HTMLSelectElement).value)" :value="value?.value"
                :disabled="disabled">
                <option v-for="option in options" :value="JSON.stringify(option)">{{ option.label }}</option>
            </select>
        </div>

        <div class="configurator-select__wrap configurator-select__wrap--xl">
            <div class="configurator-select__value" @click="showDropdown = !showDropdown">
                <span class="configurator-select__color" v-if="colors && value" :style="{ backgroundColor: value.value }"></span>
                {{ value?.label || label }}
            </div>

            <div class="configurator-select__dropdown" v-if="showDropdown">
                <ul class="configurator-select__list">
                    <li class="configurator-select__item" v-for="option in options">
                        <button class="configurator-select__button" :disabled="disabled"
                            @click.prevent="handleSelect(option)">
                            <span class="configurator-select__color" v-if="colors" :style="{ backgroundColor: option.value }"></span>
                            {{ option.label }}
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Option } from '~/src/types/configurator';

interface Props {
    label?: string;
    id: string;
    options: Option[];
    value?: Option
    disabled?: boolean
    colors?: boolean
}

interface Emits {
    (e: 'update:value', value: Option): void;
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const showDropdown = ref<boolean>(false)

const handleSelect = (option: string | Option) => {
    if (typeof option === 'string') {
        emit('update:value', JSON.parse(option) as Option)
        return
    }

    emit('update:value', option)

    showDropdown.value = false

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
.configurator-select {
    &__wrap {
        position: relative;

        &--sm {
            @media (hover: hover) {
                display: none;
            }
        }

        &--xl {
            display: none;

            @media (hover: hover) {
                display: block;
            }
        }
    }

    &__label {
        font-weight: 500;
        color: #AFAFAF;
        margin-bottom: rem(6px);
        display: block;
    }

    &__value {
        background: transparent;
        border: none;
        border-bottom: 2px solid $main;
        padding-bottom: rem(16px);
        font-size: rem(18px);
        font-weight: 600;
        color: #000;
        transition: 350ms;
        width: 100%;
        position: relative;
        display: flex;
        align-items: center;
        gap: 8px;

        &::after {
            content: '';
            background-image: url("data:image/svg+xml,%3Csvg width='30' height='16' viewBox='0 0 30 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath opacity='0.4' d='M15 16L6.99382e-07 -1.31134e-06L15 11.08L30 0L15 16Z' fill='%23CB9274'/%3E%3Cpath d='M15 8L5 1L15 5L25 1L15 8Z' fill='%23CB9274'/%3E%3C/svg%3E%0A");
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            width: 30px;
            height: 30px;
            background-position: center;
            background-repeat: no-repeat;
        }
    }

    &__color {
        width: 12px;
        height: 12px;
        transform: rotate(45deg);
        display: block;

        @include media-breakpoint-down(xxl) {
            width: 18px;
            height: 18px;
        }
    }

    &__dropdown {
        width: 100%;
        position: absolute;
        top: 100%;
        left: 0;
        background-color: $bodybg;
        z-index: 10;
        padding: rem(16px);
        box-shadow: 0 6px 30px rgba(194 173 162 / 10%);

    }

    &__list {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: 10px;
    }

    &__button {
        position: relative;
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: rem(18px);
        font-weight: 600;

    }

}
</style>