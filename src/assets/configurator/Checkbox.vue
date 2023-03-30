<template>
    <div class="configurator-checkbox">
        <div class="configurator-checkbox__wrap">
            <input type="checkbox" class="configurator-checkbox__control" :id="id" @change="handleChange($event)"
                :value="value" :disabled="disabled" :checked="checked">
            <label class="configurator-checkbox__label" :for="id">{{ label }}</label>
        </div>
    </div>
</template>

<script setup lang="ts">
import { nanoid } from 'nanoid';

interface Props {
    label?: string;
    value: string
    model: boolean;
    disabled?: boolean
    checked?: boolean
}

interface Emits {
    (e: 'update:model', value: boolean): void;
}

const id = nanoid()

defineProps<Props>()
const emit = defineEmits<Emits>()

const handleChange = (e: Event) => {
    emit('update:model', (e.target as HTMLInputElement).checked)
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

.configurator-checkbox {
    &__wrap {
        position: relative;
    }

    &__control {
        opacity: 0;
        position: absolute;
        appearance: none;
        z-index: -999;

        &:checked {
            ~label {
                color: $main;
                transition: 350ms;

                &::after {
                    background: $main;
                    opacity: 1;
                    transition: 350ms;
                }

                &::before {
                    border-color: $main;
                    transition: 350ms;
                }
            }
        }
    }

    &__label {
        position: relative;
        padding-left: 42px;
        font-weight: 600;
        font-size: rem(18px);
        display: flex;
        align-items: center;
        color: rgba(#000, 0.4);
        transition: 350ms;
        cursor: pointer;
        min-height: 30px;

        &::before {
            content: '';
            position: absolute;
            width: 30px;
            height: 30px;
            border: 2px solid #ddd;
            border-radius: 6px;
            top: 0;
            left: 0;
            transition: 350ms;
        }

        &::after {
            content: '';
            position: absolute;
            width: 18px;
            height: 18px;
            background-color: #ddd;
            left: 6px;
            top: 6px;
            border-radius: 4px;
            opacity: 0;
            transition: 350ms;
        }
    }

}
</style>