<template>
    <div class="configurator-select" :class="disabled && 'configurator-select--disabled'">
        <label class="configurator-select__label" :for="id">{{ label }}

            <Helper class="configurator-select__helper" v-if="helper" :text="helper" />
        </label>

        <div class="configurator-select__wrap configurator-select__wrap">

            <div class="configurator-select__value" @click="handleDropdownToggle">
                <span class="configurator-select__color" v-if="colors && value"
                    :style="{ backgroundColor: value.color }"></span>

                {{ value?.label || label }}
            </div>

            <div class="configurator-select__dropdown" v-if="showDropdown">
                <ul class="configurator-select__list" :data-title="label">
                    <li class="configurator-select__item" v-for="option in options">
                        <button class="configurator-select__button" :disabled="disabled"
                            @click.prevent="handleSelect(option)">
                            <span class="configurator-select__color" v-if="colors"
                                :style="{ backgroundColor: option.color }"></span>
                            {{ option.label }}
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { nanoid } from 'nanoid';
import { ref, watch } from 'vue';
import { Option } from '~/src/types/configurator';
import Helper from './Helper.vue';

interface Props {
    label?: string;
    options: Option[];
    value?: Option
    disabled?: boolean
    colors?: boolean
    helper?: string
}

interface Emits {
    (e: 'update:value', value: Option): void;
}

const id = nanoid()

const props = defineProps<Props>()
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

const handleDropdownToggle = () => {
    if (props.disabled) return
    showDropdown.value = !showDropdown.value
}

watch(() => props.disabled, () => {
    showDropdown.value = false
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

.configurator-select {
    &__wrap {
        position: relative;
        transition: 350ms;
    }

    &__label {
        font-weight: 500;
        color: #AFAFAF;
        margin-bottom: rem(6px);
        gap: 8px;
        display: flex;
        align-items: center;
    }

    &__helper {
        flex: 1 1 auto;
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
        cursor: pointer;

        @include media-breakpoint-down(sm) {
            font-size: 16px;
            padding-bottom: 16px;
        }

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
            background-size: contain;
            background-repeat: no-repeat;

            @include media-breakpoint-down(sm) {
                width: 20px;
                height: 20px;
            }
        }
    }

    &__color {
        width: 12px;
        height: 12px;
        transform: rotate(45deg);
        display: blockk
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

        @include media-breakpoint-down(md) {
            position: fixed;
            left: 0;
            top: 0;
            background: rgba(#322B28, 0.75);
            z-index: 300;
            top: 0;
            height: 100dvh;
            width: 100vw;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

    &__list {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: 10px;

        @include media-breakpoint-down(md) {
            background-color: #fff;
            box-shadow: 0px -5px 80px rgba(0, 0, 0, 0.1);
            border-radius: 15px;
            padding: 30px;
            width: 90%;
            position: relative;
            padding-top: 60px;

            &::before {
                content: attr(data-title);
                color: #AFAFAF;
                position: absolute;
                top: 20px;
                left: 30px;
            }
        }
    }

    &__button {
        position: relative;
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: rem(18px);
        font-weight: 600;
    }

    &--disabled {
        .configurator-select__wrap {
            cursor: not-allowed;
            opacity: 0.5;
            transition: 350ms;
            filter: grayscale(100);
        }
    }
}
</style>