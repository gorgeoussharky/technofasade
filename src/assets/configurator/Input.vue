<template>
    <div class="configurator-input" :class="[large && 'configurator-input--large']">
        <div class="configurator-input__wrap">
            <label class="configurator-input__label" :for="id">
                {{ label }}
            </label>
            <input :type="type || 'text'" class="configurator-input__control" :id="id" :placeholder="label || placeholder"
                @input="handleInput($event)" :value="value" :disabled="disabled">
        </div>
    </div>
</template>

<script setup lang="ts">
import { nanoid } from 'nanoid'

interface Props {
    label?: string;
    type?: string;
    placeholder?: string;
    value: string | number
    disabled?: boolean
    large?: boolean
}

const id = nanoid()

interface Emits {
    (e: 'update:value', value: string | number): void;
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const handleInput = (e: Event) => {
    emit('update:value', (e.target as HTMLInputElement).value)
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

.configurator-input {
    &__wrap {
        position: relative;
    }

    &__label {
        font-weight: 500;
        color: #AFAFAF;
        margin-bottom: rem(6px);
        display: block;
    }

    &__control {
        background: transparent;
        border: none;
        border-bottom: 2px solid $main;
        padding-bottom: rem(16px);
        font-size: rem(18px);
        font-weight: 600;
        color: $main;
        line-height: 0.8;
        transition: 350ms;
        width: 100%;

        &:disabled {
            color: #000;
        }

        &::placeholder {
            color: #8d8d8d;
        }

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }

        &[type=number] {
            -moz-appearance: textfield;
        }
    }

    &--large {
        .configurator-input {
            &__control {
                font-size: rem(40px);
                border: 2px solid $main;
                padding: rem(8px) rem(16px);
                height: 60px;
                max-width: 190px;

                @include media-breakpoint-down(sm) {
                    padding: 0 14px;
                    padding-top: 8px;
                    font-size: 40px;
                    max-width: 150px;
                }
            }
        }
    }
}
</style>