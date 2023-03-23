<template>
    <div class="configurator-input" :class="[large && 'configurator-input--large']">
        <div class="configurator-input__wrap">
            <label class="configurator-input__label" :for="id">{{ label }}</label>
            <input :type="type || 'text'" class="configurator-input__control" :id="id" :placeholder="label || placeholder"
                @input="handleInput($event)" :value="value" :disabled="disabled">

            <div class="configurator-input__notice" v-if="notice">
                {{ notice }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Props {
    label?: string;
    type?: string;
    id?: string;
    placeholder?: string;
    value: string | number
    disabled?: boolean
    large?: boolean
    notice?: string
}

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
    }

    &--large {
        .configurator-input {
            &__control {
                font-size: rem(40px);
                border: 2px solid $main;
                padding: rem(8px) rem(16px);
                height: 60px;
                max-width: 190px;
            }
        }
    }

    &__notice {
        font-size: rem(14px);
        line-height: 18px;
        color: #CB9274;
        position: absolute;
        left: 210px;
        bottom: 16px;
        max-width: 270px;
        display: flex;
        align-items: center;
    }
}
</style>